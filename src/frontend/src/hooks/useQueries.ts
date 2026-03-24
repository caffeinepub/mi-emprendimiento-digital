import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BlogPost, ContactMessageInput, Testimonial } from "../backend.d";
import { useActor } from "./useActor";

export function useGetPublishedPosts() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["posts", "published"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBlogPosts(true);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllPosts() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["posts", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBlogPosts(false);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBlogPost(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBlogPost(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useGetTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetContactMessages() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["contactMessages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getContactMessages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetSubscribers() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSubscribers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (input: ContactMessageInput) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.submitContactMessage(input);
    },
  });
}

export function useAddSubscriber() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.addSubscriber(email);
    },
  });
}

export function useCreateOrUpdatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (post: BlogPost) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.createOrUpdateBlogPost(post);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useDeletePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.deleteBlogPost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useCreateOrUpdateTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (testimonial: Testimonial) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.createOrUpdateTestimonial(testimonial);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}

export function useDeleteTestimonial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.deleteTestimonial(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
}
