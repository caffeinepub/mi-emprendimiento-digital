import WhatsAppButton from "@/components/WhatsAppButton";
import { Toaster } from "@/components/ui/sonner";
import AdminPage from "@/pages/AdminPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import HomePage from "@/pages/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Outlet, createRootRoute, createRoute } from "@tanstack/react-router";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <WhatsAppButton />
    </>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: BlogPage,
});

const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$id",
  component: BlogPostPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  blogRoute,
  blogPostRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}
