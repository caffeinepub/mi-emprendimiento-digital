import Map "mo:core/Map";
import Time "mo:core/Time";

module {
  type OldBlogPost = {
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

  type OldTestimonial = {
    id : Text;
    authorName : Text;
    roleOrBusiness : Text;
    message : Text;
    rating : Nat;
    createdAt : Time.Time;
  };

  type OldSubscriber = {
    email : Text;
    signupDate : Time.Time;
  };

  type OldContactMessage = {
    id : Text;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    receivedAt : Time.Time;
  };

  type OldContactMessageInput = {
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
  };

  type OldServicePackage = {
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

  type OldUserProfile = {
    name : Text;
  };

  type OldActor = {
    blogPosts : Map.Map<Text, OldBlogPost>;
    testimonials : Map.Map<Text, OldTestimonial>;
    subscribers : Map.Map<Text, OldSubscriber>;
    contactMessages : Map.Map<Text, OldContactMessage>;
    userProfiles : Map.Map<Principal, OldUserProfile>;
    servicePackages : Map.Map<Text, OldServicePackage>;
  };

  type NewServiceItem = {
    name : Text;
    description : Text;
    price : Float;
  };

  type NewBlogPost = {
    title : Text;
    content : Text;
    publishedAt : Time.Time;
  };

  type NewGalleryItem = {
    title : Text;
    imageUrl : Text;
  };

  type NewUserProfile = {
    name : Text;
  };

  type NewActor = {
    services : Map.Map<Text, NewServiceItem>;
    blogPosts : Map.Map<Text, NewBlogPost>;
    gallery : Map.Map<Text, NewGalleryItem>;
    userProfiles : Map.Map<Principal, NewUserProfile>;
  };

  public func run(old : OldActor) : NewActor {
    let services = Map.empty<Text, NewServiceItem>();

    let blogPosts = old.blogPosts.map<Text, OldBlogPost, NewBlogPost>(
      func(_, oldPost) {
        {
          title = oldPost.title;
          content = oldPost.content;
          publishedAt = oldPost.createdAt;
        };
      }
    );

    let gallery = Map.empty<Text, NewGalleryItem>();
    let userProfiles = old.userProfiles;

    {
      services;
      blogPosts;
      gallery;
      userProfiles;
    };
  };
};
