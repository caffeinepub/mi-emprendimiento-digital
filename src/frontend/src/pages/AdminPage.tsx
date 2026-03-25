import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useAddBlogPost,
  useAddService,
  useGetBlogPosts,
  useGetServices,
  useIsAdmin,
  useUpdateService,
} from "@/hooks/useQueries";
import {
  BookOpen,
  LogOut,
  Pencil,
  Plus,
  Save,
  Scissors,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { BlogPost, ServiceItem } from "../backend.d";

type Tab = "services" | "posts";

export default function AdminPage() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: isAdmin } = useIsAdmin();
  const [activeTab, setActiveTab] = useState<Tab>("services");

  const isLoggedIn = !!identity;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-lg p-10 max-w-sm w-full text-center"
            data-ocid="admin.dialog"
          >
            <Scissors className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="font-heading font-black text-2xl text-foreground uppercase mb-2">
              PANEL ADMIN
            </h1>
            <p className="text-muted-foreground text-sm mb-6">
              Inicia sesión para gestionar tus servicios y artículos del blog.
            </p>
            <Button
              onClick={() => login()}
              disabled={loginStatus === "logging-in"}
              className="w-full bg-primary text-primary-foreground hover:opacity-90 font-bold tracking-widest uppercase"
              data-ocid="admin.primary_button"
            >
              {loginStatus === "logging-in" ? "INICIANDO..." : "INICIAR SESIÓN"}
            </Button>
          </motion.div>
        </main>
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <div
            className="bg-card border border-border rounded-lg p-10 max-w-sm w-full text-center"
            data-ocid="admin.error_state"
          >
            <X className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="font-heading font-bold text-xl text-foreground mb-2">
              Acceso Denegado
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              No tienes permisos de administrador.
            </p>
            <Button
              variant="outline"
              onClick={() => clear()}
              className="w-full border-border text-foreground"
              data-ocid="admin.cancel_button"
            >
              <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading font-black text-3xl text-foreground uppercase">
                Panel Admin
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Gestiona tu barbería
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => clear()}
              className="border-border text-foreground hover:border-primary"
              data-ocid="admin.secondary_button"
            >
              <LogOut className="w-4 h-4 mr-2" /> Salir
            </Button>
          </div>

          <div className="flex gap-2 mb-8 border-b border-border">
            <button
              type="button"
              onClick={() => setActiveTab("services")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-bold tracking-widest uppercase transition-colors ${
                activeTab === "services"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid="admin.tab"
            >
              <Scissors className="w-4 h-4" /> SERVICIOS
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("posts")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-bold tracking-widest uppercase transition-colors ${
                activeTab === "posts"
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid="admin.tab"
            >
              <BookOpen className="w-4 h-4" /> BLOG
            </button>
          </div>

          {activeTab === "services" && <ServicesTab />}
          {activeTab === "posts" && <PostsTab />}
        </div>
      </main>
    </div>
  );
}

function ServicesTab() {
  const { data: services } = useGetServices();
  const addService = useAddService();
  const updateService = useUpdateService();
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: 0,
  });
  const [showAdd, setShowAdd] = useState(false);

  const handleAdd = async () => {
    if (!newService.name || !newService.price) {
      toast.error("Nombre y precio son requeridos");
      return;
    }
    try {
      await addService.mutateAsync(newService);
      toast.success("Servicio agregado");
      setNewService({ name: "", description: "", price: 0 });
      setShowAdd(false);
    } catch {
      toast.error("Error al agregar servicio");
    }
  };

  const handleUpdate = async () => {
    if (!editing) return;
    try {
      await updateService.mutateAsync(editing);
      toast.success("Servicio actualizado");
      setEditing(null);
    } catch {
      toast.error("Error al actualizar");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-xl text-foreground">
          Servicios
        </h2>
        <Button
          onClick={() => setShowAdd(!showAdd)}
          className="bg-primary text-primary-foreground hover:opacity-90 font-bold text-xs tracking-widest uppercase"
          data-ocid="services.open_modal_button"
        >
          <Plus className="w-4 h-4 mr-1" /> AGREGAR
        </Button>
      </div>

      {showAdd && (
        <div
          className="bg-card border border-primary/50 rounded-lg p-6 mb-6"
          data-ocid="services.panel"
        >
          <h3 className="font-heading font-bold text-primary text-sm uppercase mb-4">
            Nuevo Servicio
          </h3>
          <div className="space-y-4 mb-4">
            <div>
              <label
                htmlFor="svc-name"
                className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-1"
              >
                Nombre
              </label>
              <Input
                id="svc-name"
                value={newService.name}
                onChange={(e) =>
                  setNewService((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Ej: Corte Fade"
                className="bg-background border-border text-foreground"
                data-ocid="services.input"
              />
            </div>
            <div>
              <label
                htmlFor="svc-desc"
                className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-1"
              >
                Descripción
              </label>
              <Input
                id="svc-desc"
                value={newService.description}
                onChange={(e) =>
                  setNewService((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Descripción del servicio"
                className="bg-background border-border text-foreground"
                data-ocid="services.input"
              />
            </div>
            <div>
              <label
                htmlFor="svc-price"
                className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-1"
              >
                Precio (USD)
              </label>
              <Input
                id="svc-price"
                type="number"
                value={newService.price || ""}
                onChange={(e) =>
                  setNewService((p) => ({
                    ...p,
                    price: Number(e.target.value),
                  }))
                }
                placeholder="5"
                className="bg-background border-border text-foreground"
                data-ocid="services.input"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleAdd}
              disabled={addService.isPending}
              className="bg-primary text-primary-foreground hover:opacity-90 text-xs font-bold uppercase"
              data-ocid="services.submit_button"
            >
              <Save className="w-4 h-4 mr-1" />
              {addService.isPending ? "GUARDANDO..." : "GUARDAR"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowAdd(false)}
              className="border-border text-foreground text-xs"
              data-ocid="services.cancel_button"
            >
              CANCELAR
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {services && services.length > 0 ? (
          services.map((service, i) => (
            <div
              key={service.name}
              className="bg-card border border-border rounded-lg p-5"
              data-ocid={`services.item.${i + 1}`}
            >
              {editing?.name === service.name ? (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Input
                      value={editing.name}
                      onChange={(e) =>
                        setEditing((p) => p && { ...p, name: e.target.value })
                      }
                      className="bg-background border-border text-foreground"
                      data-ocid="services.input"
                    />
                    <Input
                      value={editing.description}
                      onChange={(e) =>
                        setEditing(
                          (p) => p && { ...p, description: e.target.value },
                        )
                      }
                      className="bg-background border-border text-foreground"
                      data-ocid="services.input"
                    />
                    <Input
                      type="number"
                      value={editing.price}
                      onChange={(e) =>
                        setEditing(
                          (p) => p && { ...p, price: Number(e.target.value) },
                        )
                      }
                      className="bg-background border-border text-foreground w-32"
                      data-ocid="services.input"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleUpdate}
                      disabled={updateService.isPending}
                      className="bg-primary text-primary-foreground text-xs font-bold uppercase"
                      data-ocid="services.save_button"
                    >
                      <Save className="w-3 h-3 mr-1" /> GUARDAR
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditing(null)}
                      className="border-border text-foreground text-xs"
                      data-ocid="services.cancel_button"
                    >
                      CANCELAR
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-heading font-bold text-foreground">
                        {service.name}
                      </h3>
                      <span className="text-primary font-black text-lg">
                        ${service.price}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {service.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditing(service)}
                    className="text-muted-foreground hover:text-primary"
                    data-ocid="services.edit_button"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div
            className="text-center py-10 text-muted-foreground"
            data-ocid="services.empty_state"
          >
            No hay servicios. Agrega el primero.
          </div>
        )}
      </div>
    </div>
  );
}

function PostsTab() {
  const { data: posts } = useGetBlogPosts();
  const addPost = useAddBlogPost();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });

  const handleAdd = async () => {
    if (!form.title || !form.content) {
      toast.error("Título y contenido son requeridos");
      return;
    }
    try {
      const post: BlogPost = {
        title: form.title,
        content: form.content,
        publishedAt: BigInt(Date.now()) * BigInt(1_000_000),
      };
      await addPost.mutateAsync(post);
      toast.success("Artículo publicado");
      setForm({ title: "", content: "" });
      setShowForm(false);
    } catch {
      toast.error("Error al publicar");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-xl text-foreground">
          Artículos del Blog
        </h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-primary-foreground hover:opacity-90 font-bold text-xs tracking-widest uppercase"
          data-ocid="blog.open_modal_button"
        >
          <Plus className="w-4 h-4 mr-1" /> NUEVO ARTÍCULO
        </Button>
      </div>

      {showForm && (
        <div
          className="bg-card border border-primary/50 rounded-lg p-6 mb-6"
          data-ocid="blog.panel"
        >
          <h3 className="font-heading font-bold text-primary text-sm uppercase mb-4">
            Nuevo Artículo
          </h3>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="post-title"
                className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-1"
              >
                Título
              </label>
              <Input
                id="post-title"
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Ej: Tendencias de cortes 2025"
                className="bg-background border-border text-foreground"
                data-ocid="blog.input"
              />
            </div>
            <div>
              <label
                htmlFor="post-content"
                className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-1"
              >
                Contenido
              </label>
              <Textarea
                id="post-content"
                value={form.content}
                onChange={(e) =>
                  setForm((p) => ({ ...p, content: e.target.value }))
                }
                placeholder="Escribe tu artículo aquí..."
                rows={6}
                className="bg-background border-border text-foreground resize-none"
                data-ocid="blog.textarea"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              onClick={handleAdd}
              disabled={addPost.isPending}
              className="bg-primary text-primary-foreground hover:opacity-90 text-xs font-bold uppercase"
              data-ocid="blog.submit_button"
            >
              {addPost.isPending ? "PUBLICANDO..." : "PUBLICAR"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowForm(false)}
              className="border-border text-foreground text-xs"
              data-ocid="blog.cancel_button"
            >
              CANCELAR
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {posts && posts.length > 0 ? (
          posts.map((post, i) => (
            <div
              key={post.title}
              className="bg-card border border-border rounded-lg p-5"
              data-ocid={`blog.item.${i + 1}`}
            >
              <h3 className="font-heading font-bold text-foreground mb-2">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {post.content}
              </p>
            </div>
          ))
        ) : (
          <div
            className="text-center py-10 text-muted-foreground"
            data-ocid="blog.empty_state"
          >
            No hay artículos. Crea el primero.
          </div>
        )}
      </div>
    </div>
  );
}
