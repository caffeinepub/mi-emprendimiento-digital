import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";

actor {
  type BlogPost = {
    id : Text;
    title : Text;
    summary : Text;
    content : Text;
    category : Text;
    coverImageURL : Text;
    published : Bool;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  module BlogPost {
    public func compare(post1 : BlogPost, post2 : BlogPost) : Order.Order {
      Int.compare(post2.createdAt, post1.createdAt);
    };
  };

  type Testimonial = {
    id : Text;
    authorName : Text;
    roleOrBusiness : Text;
    message : Text;
    rating : Nat;
    createdAt : Time.Time;
  };

  module Testimonial {
    public func compare(t1 : Testimonial, t2 : Testimonial) : Order.Order {
      Text.compare(t1.authorName, t2.authorName);
    };
  };

  type Subscriber = {
    email : Text;
    signupDate : Time.Time;
  };

  module Subscriber {
    public func compare(s1 : Subscriber, s2 : Subscriber) : Order.Order {
      Text.compare(s1.email, s2.email);
    };
  };

  type ContactMessage = {
    id : Text;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    receivedAt : Time.Time;
  };

  type ContactMessageInput = {
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
  };

  module ContactMessage {
    public func compare(m1 : ContactMessage, m2 : ContactMessage) : Order.Order {
      Int.compare(m2.receivedAt, m1.receivedAt);
    };
  };

  type ServicePackage = {
    id : Text;
    name : Text;
    description : Text;
    price : Float;
    maintenancePrice : Float;
    features : [Text];
    isPopular : Bool;
    active : Bool;
    updatedAt : Time.Time;
  };

  module ServicePackage {
    public func compare(p1 : ServicePackage, p2 : ServicePackage) : Order.Order {
      Float.compare(p1.price, p2.price);
    };
  };

  public type UserProfile = {
    name : Text;
  };

  // State
  let blogPosts = Map.empty<Text, BlogPost>();
  let testimonials = Map.empty<Text, Testimonial>();
  let subscribers = Map.empty<Text, Subscriber>();
  let contactMessages = Map.empty<Text, ContactMessage>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let servicePackages = Map.empty<Text, ServicePackage>();

  // Mixins
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  /******************** User Profiles ********************/
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  /******************** Blog Posts ********************/
  public shared ({ caller }) func createOrUpdateBlogPost(post : BlogPost) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admin can create or update blog posts");
    };
    let now = Time.now();
    let updatedPost : BlogPost = {
      post with
      updatedAt = now;
      createdAt = post.createdAt;
    };
    blogPosts.add(post.id, updatedPost);
  };

  public query ({ caller }) func getBlogPosts(publishedOnly : Bool) : async [BlogPost] {
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    if (not isAdmin and not publishedOnly) {
      Runtime.trap("Unauthorized: Only admin can view unpublished posts");
    };

    if (publishedOnly or not isAdmin) {
      blogPosts.values().toArray().filter(func(post) { post.published }).sort();
    } else {
      blogPosts.values().toArray().sort();
    };
  };

  public query ({ caller }) func getBlogPost(id : Text) : async BlogPost {
    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Blog post not found") };
      case (?post) {
        if (not post.published and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only admin can view unpublished posts");
        };
        post;
      };
    };
  };

  public shared ({ caller }) func deleteBlogPost(id : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admin can delete blog posts");
    };
    blogPosts.remove(id);
  };

  /******************** Testimonials ********************/
  public shared ({ caller }) func createOrUpdateTestimonial(testimonial : Testimonial) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admin can create or update testimonials");
    };
    testimonials.add(testimonial.id, testimonial);
  };

  public query ({ caller }) func getTestimonials() : async [Testimonial] {
    testimonials.values().toArray().sort();
  };

  public shared ({ caller }) func deleteTestimonial(id : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admin can delete testimonials");
    };
    testimonials.remove(id);
  };

  /******************** Newsletter Subscribers ********************/
  public shared ({ caller }) func addSubscriber(email : Text) : async () {
    if (not isValidEmail(email)) { Runtime.trap("Invalid email address") };
    if (subscribers.containsKey(email)) { Runtime.trap("Email already subscribed") };
    let subscriber : Subscriber = {
      email;
      signupDate = Time.now();
    };
    subscribers.add(email, subscriber);
  };

  public query ({ caller }) func getSubscribers() : async [Subscriber] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admin can view subscribers");
    };
    subscribers.values().toArray().sort();
  };

  /******************** Contact Messages ********************/
  public shared ({ caller }) func submitContactMessage(input : ContactMessageInput) : async () {
    if (input.name.size() == 0 or not isValidEmail(input.email) or input.message.size() == 0 or input.subject.size() == 0) {
      Runtime.trap("Invalid input data");
    };
    if (input.message.size() > 1000) {
      Runtime.trap("Message must be less than 1000 characters");
    };

    let id = getNextId();
    let contactMessage : ContactMessage = {
      id;
      name = input.name;
      email = input.email;
      subject = input.subject;
      message = input.message;
      receivedAt = Time.now();
    };
    contactMessages.add(id, contactMessage);
  };

  public query ({ caller }) func getContactMessages() : async [ContactMessage] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admin can view contact messages");
    };
    contactMessages.values().toArray().sort();
  };

  /******************** Service Packages ********************/
  public shared ({ caller }) func upsertServicePackage(pkg : ServicePackage) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admin can manage service packages");
    };
    let updated : ServicePackage = { pkg with updatedAt = Time.now() };
    servicePackages.add(pkg.id, updated);
  };

  public query func getServicePackages() : async [ServicePackage] {
    servicePackages.values().toArray().filter(func(p) { p.active }).sort();
  };

  public query ({ caller }) func getAllServicePackages() : async [ServicePackage] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admin can view all packages");
    };
    servicePackages.values().toArray().sort();
  };

  public shared ({ caller }) func deleteServicePackage(id : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admin can delete service packages");
    };
    servicePackages.remove(id);
  };

  /******************** Utils ********************/
  func getNextId() : Text {
    Time.now().toText();
  };

  func isValidEmail(email : Text) : Bool {
    let parts = email.split(#char '@');
    let partsArray = parts.toArray();
    if (partsArray.size() != 2) { return false };
    let domainParts = partsArray[1].split(#char '.').toArray();
    if (domainParts.size() < 2) { return false };
    true;
  };
};
