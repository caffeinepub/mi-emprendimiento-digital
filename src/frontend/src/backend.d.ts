import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: string;
    coverImageURL: string;
    title: string;
    content: string;
    published: boolean;
    createdAt: Time;
    summary: string;
    updatedAt: Time;
    category: string;
}
export interface ContactMessage {
    id: string;
    subject: string;
    name: string;
    email: string;
    receivedAt: Time;
    message: string;
}
export type Time = bigint;
export interface ContactMessageInput {
    subject: string;
    name: string;
    email: string;
    message: string;
}
export interface Subscriber {
    signupDate: Time;
    email: string;
}
export interface UserProfile {
    name: string;
}
export interface Testimonial {
    id: string;
    roleOrBusiness: string;
    createdAt: Time;
    authorName: string;
    message: string;
    rating: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    /**
     * / ****************** Newsletter Subscribers *******************
     */
    addSubscriber(email: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    /**
     * / ****************** Blog Posts *******************
     */
    createOrUpdateBlogPost(post: BlogPost): Promise<void>;
    /**
     * / ****************** Testimonials *******************
     */
    createOrUpdateTestimonial(testimonial: Testimonial): Promise<void>;
    deleteBlogPost(id: string): Promise<void>;
    deleteTestimonial(id: string): Promise<void>;
    getBlogPost(id: string): Promise<BlogPost>;
    getBlogPosts(publishedOnly: boolean): Promise<Array<BlogPost>>;
    /**
     * / ****************** User Profiles *******************
     */
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactMessages(): Promise<Array<ContactMessage>>;
    getSubscribers(): Promise<Array<Subscriber>>;
    getTestimonials(): Promise<Array<Testimonial>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    /**
     * / ****************** Contact Messages *******************
     */
    submitContactMessage(input: ContactMessageInput): Promise<void>;
}
