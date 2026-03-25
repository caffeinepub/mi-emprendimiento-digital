import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Migration "migration";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";

(
  with
  migration = Migration.run;
)
actor {
  type ServiceItem = {
    name : Text;
    description : Text;
    price : Float;
  };

  type BlogPost = {
    title : Text;
    content : Text;
    publishedAt : Time.Time;
  };

  type GalleryItem = {
    title : Text;
    imageUrl : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  // State
  let services = Map.empty<Text, ServiceItem>();
  let blogPosts = Map.empty<Text, BlogPost>();
  let gallery = Map.empty<Text, GalleryItem>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Mixins
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  module ServiceItem {
    public func compareByPrice(a : ServiceItem, b : ServiceItem) : Order.Order {
      Float.compare(a.price, b.price);
    };
  };

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

  // Services CRUD
  public shared ({ caller }) func addService(service : ServiceItem) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can add services");
    };
    if (services.containsKey(service.name)) { Runtime.trap("Service already exists") };
    services.add(service.name, service);
  };

  public shared ({ caller }) func updateService(service : ServiceItem) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can update services");
    };
    if (not services.containsKey(service.name)) { Runtime.trap("Service not found") };
    services.add(service.name, service);
  };

  public query func getServices() : async [ServiceItem] {
    services.values().toArray().sort(ServiceItem.compareByPrice);
  };

  // Blog CRUD
  public shared ({ caller }) func addBlogPost(post : BlogPost) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can add blog posts");
    };
    if (blogPosts.containsKey(post.title)) { Runtime.trap("Blog post already exists") };
    blogPosts.add(post.title, post);
  };

  public query func getBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray();
  };

  // Gallery CRUD
  public shared ({ caller }) func addGalleryItem(item : GalleryItem) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can add gallery items");
    };
    if (gallery.containsKey(item.title)) { Runtime.trap("Gallery item already exists") };
    gallery.add(item.title, item);
  };

  public query func getGallery() : async [GalleryItem] {
    gallery.values().toArray();
  };
};
