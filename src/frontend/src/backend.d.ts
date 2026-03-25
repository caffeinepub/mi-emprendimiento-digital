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
    title: string;
    content: string;
    publishedAt: Time;
}
export type Time = bigint;
export interface ServiceItem {
    name: string;
    description: string;
    price: number;
}
export interface GalleryItem {
    title: string;
    imageUrl: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addBlogPost(post: BlogPost): Promise<void>;
    addGalleryItem(item: GalleryItem): Promise<void>;
    addService(service: ServiceItem): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getBlogPosts(): Promise<Array<BlogPost>>;
    /**
     * / ****************** User Profiles *******************
     */
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getGallery(): Promise<Array<GalleryItem>>;
    getServices(): Promise<Array<ServiceItem>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateService(service: ServiceItem): Promise<void>;
}
