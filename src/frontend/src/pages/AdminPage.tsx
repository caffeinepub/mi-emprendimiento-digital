import Navbar from "@/components/Navbar";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { usePackages } from "@/hooks/usePackages";
import type { ServicePackage } from "@/hooks/usePackages";
import {
  useCreateOrUpdatePost,
  useDeletePost,
  useDeleteTestimonial,
  useGetAllPosts,
  useGetContactMessages,
  useGetSubscribers,
  useGetTestimonials,
} from "@/hooks/useQueries";
import {
  BookOpen,
  Check,
  DollarSign,
  Eye,
  EyeOff,
  LogOut,
  MessageSquare,
  Package,
  Pencil,
  Plus,
  Star,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { BlogPost } from "../backend.d";

type Tab = "posts" | "messages" | "testimonials" | "subscribers" | "packages";

const EMPTY_POST: BlogPost = {
  id: "",
  title: "",
  summary: "",
  content: "",
  category: "negocios",
  coverImageURL: "",
  published: false,
  createdAt: BigInt(0),
  updatedAt: BigInt(0),
};

const EMPTY_PACKAGE: ServicePackage = {
  id: "",
  name: "",
  description: "",
  price: 0,
  maintenancePrice: 0,
  features: [],
  isPopular: false,
  active: true,
  updatedAt: Date.now(),
};

export default function AdminPage() {
  const { login, clear, loginStatus, identity, isInitializing, isLoginError } =
    useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const [activeTab, setActiveTab] = useState<Tab>("posts");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const { data: posts = [] } = useGetAllPosts();
  const { data: testimonials = [] } = useGetTestimonials();
  const { data: messages = [] } = useGetContactMessages();
  const { data: subscribers = [] } = useGetSubscribers();

  const { mutateAsync: savePost, isPending: isSaving } =
    useCreateOrUpdatePost();
  const { mutateAsync: deletePost } = useDeletePost();
  const { mutateAsync: deleteTestimonial } = useDeleteTestimonial();

  // Package management
  const { packages, upsertPackage, deletePackage, toggleActive } =
    usePackages();
  const [editingPackage, setEditingPackage] = useState<ServicePackage | null>(
    null,
  );
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [pkgDeleteConfirmId, setPkgDeleteConfirmId] = useState<string | null>(
    null,
  );

  const handleSavePost = async (post: BlogPost) => {
    try {
      const id = post.id || crypto.randomUUID();
      const now = BigInt(Date.now() * 1_000_000);
      await savePost({
        ...post,
        id,
        updatedAt: now,
        createdAt: post.createdAt || now,
      });
      toast.success("Artículo guardado correctamente");
      setShowPostForm(false);
      setEditingPost(null);
    } catch {
      toast.error("Error al guardar el artículo");
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      await deletePost(id);
      toast.success("Artículo eliminado");
      setDeleteConfirmId(null);
    } catch {
      toast.error("Error al eliminar el artículo");
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    try {
      await deleteTestimonial(id);
      toast.success("Testimonio eliminado");
    } catch {
      toast.error("Error al eliminar el testimonio");
    }
  };

  const handleSavePackage = (pkg: ServicePackage) => {
    const id = pkg.id || crypto.randomUUID();
    upsertPackage({ ...pkg, id, updatedAt: Date.now() });
    toast.success(pkg.id ? "Paquete actualizado" : "Paquete creado");
    setShowPackageForm(false);
    setEditingPackage(null);
  };

  const handleDeletePackage = (id: string) => {
    deletePackage(id);
    toast.success("Paquete eliminado");
    setPkgDeleteConfirmId(null);
  };

  const formatDate = (t: bigint) => {
    const ms = Number(t) / 1_000_000;
    if (!ms || ms < 1000) return "";
    return new Date(ms).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isInitializing) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <div className="w-8 h-8 border-4 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center bg-muted/20 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-10 shadow-card border border-border max-w-md w-full mx-4 text-center"
            data-ocid="admin.panel"
          >
            <div className="w-16 h-16 rounded-full bg-navy/10 flex items-center justify-center mx-auto mb-6">
              <span className="font-heading font-bold text-navy text-xl">
                CC
              </span>
            </div>
            <h1 className="font-heading font-bold text-2xl text-foreground mb-2">
              Panel de Administración
            </h1>
            <p className="text-muted-foreground text-sm mb-8">
              Inicia sesión para gestionar tu sitio web
            </p>
            <button
              type="button"
              onClick={() => login()}
              disabled={loginStatus === "logging-in"}
              className="w-full bg-navy text-white font-heading font-semibold py-3 rounded-full hover:bg-navy/90 transition-colors"
              data-ocid="admin.primary_button"
            >
              {loginStatus === "logging-in"
                ? "Iniciando sesión..."
                : "Iniciar Sesión"}
            </button>
            {isLoginError && (
              <p
                className="text-destructive text-sm mt-4"
                data-ocid="admin.error_state"
              >
                Error al iniciar sesión. Intente de nuevo.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />

      <div className="pt-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading font-bold text-2xl text-foreground">
                Panel de Administración
              </h1>
              <p className="text-muted-foreground text-sm">
                Principal: {identity.getPrincipal().toString().slice(0, 16)}...
              </p>
            </div>
            <button
              type="button"
              onClick={() => clear()}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
              data-ocid="admin.secondary_button"
            >
              <LogOut className="w-4 h-4" /> Cerrar Sesión
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {[
              {
                icon: <BookOpen className="w-5 h-5" />,
                label: "Artículos",
                value: posts.length,
                color: "text-navy",
              },
              {
                icon: <MessageSquare className="w-5 h-5" />,
                label: "Mensajes",
                value: messages.length,
                color: "text-orange",
              },
              {
                icon: <Star className="w-5 h-5" />,
                label: "Testimonios",
                value: testimonials.length,
                color: "text-teal",
              },
              {
                icon: <Users className="w-5 h-5" />,
                label: "Suscriptores",
                value: subscribers.length,
                color: "text-foreground",
              },
              {
                icon: <Package className="w-5 h-5" />,
                label: "Paquetes",
                value: packages.length,
                color: "text-orange",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-4 shadow-xs border border-border"
              >
                <div className={stat.color}>{stat.icon}</div>
                <p className="font-heading font-bold text-2xl text-foreground mt-2">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mb-6 flex-wrap">
            {(
              [
                "posts",
                "packages",
                "messages",
                "testimonials",
                "subscribers",
              ] as Tab[]
            ).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-navy text-white"
                    : "bg-white border border-border text-muted-foreground hover:border-navy"
                }`}
                data-ocid="admin.tab"
              >
                {tab === "posts" && "Artículos"}
                {tab === "packages" && "Paquetes"}
                {tab === "messages" && "Mensajes"}
                {tab === "testimonials" && "Testimonios"}
                {tab === "subscribers" && "Suscriptores"}
              </button>
            ))}
          </div>

          {activeTab === "posts" && (
            <div data-ocid="admin.panel">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-heading font-semibold text-lg text-foreground">
                  Artículos del Blog
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setEditingPost({ ...EMPTY_POST });
                    setShowPostForm(true);
                  }}
                  className="flex items-center gap-2 bg-orange text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-orange/90"
                  data-ocid="admin.primary_button"
                >
                  <Plus className="w-4 h-4" /> Nuevo Artículo
                </button>
              </div>

              {showPostForm && editingPost && (
                <PostForm
                  post={editingPost}
                  isSaving={isSaving}
                  onSave={handleSavePost}
                  onCancel={() => {
                    setShowPostForm(false);
                    setEditingPost(null);
                  }}
                />
              )}

              {posts.length === 0 && !showPostForm ? (
                <div
                  className="text-center py-16 bg-white rounded-xl border border-border"
                  data-ocid="admin.empty_state"
                >
                  <p className="text-muted-foreground">
                    No hay artículos todavía.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {posts.map((post, i) => (
                    <div
                      key={post.id}
                      className="bg-white rounded-xl p-4 border border-border flex items-center justify-between gap-4"
                      data-ocid={`admin.item.${i + 1}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {post.coverImageURL && (
                          <img
                            src={post.coverImageURL}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-foreground truncate">
                            {post.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-teal bg-teal/10 px-2 py-0.5 rounded-full capitalize">
                              {post.category}
                            </span>
                            <span
                              className={`text-xs flex items-center gap-1 ${
                                post.published
                                  ? "text-teal"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {post.published ? (
                                <Eye className="w-3 h-3" />
                              ) : (
                                <EyeOff className="w-3 h-3" />
                              )}
                              {post.published ? "Publicado" : "Borrador"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingPost(post);
                            setShowPostForm(true);
                          }}
                          className="p-2 text-muted-foreground hover:text-navy transition-colors"
                          data-ocid="admin.edit_button"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        {deleteConfirmId === post.id ? (
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleDeletePost(post.id)}
                              className="text-xs bg-destructive text-white px-3 py-1 rounded-full"
                              data-ocid="admin.confirm_button"
                            >
                              Confirmar
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(null)}
                              className="text-xs border border-border px-3 py-1 rounded-full"
                              data-ocid="admin.cancel_button"
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(post.id)}
                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                            data-ocid="admin.delete_button"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Packages Tab */}
          {activeTab === "packages" && (
            <div data-ocid="admin.panel">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h2 className="font-heading font-semibold text-lg text-foreground">
                    Paquetes y Precios
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Actualiza los precios aquí cuando cambie la tasa del dólar
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingPackage({ ...EMPTY_PACKAGE });
                    setShowPackageForm(true);
                  }}
                  className="flex items-center gap-2 bg-orange text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-orange/90"
                  data-ocid="packages.primary_button"
                >
                  <Plus className="w-4 h-4" /> Nuevo Paquete
                </button>
              </div>

              <div className="bg-orange/10 border border-orange/20 rounded-xl p-4 mb-6 flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                <p className="text-sm text-orange-900">
                  <strong>Recuerda:</strong> En Venezuela los precios cambian
                  constantemente. Entra aquí mensualmente para actualizar los
                  precios de creación y mantenimiento de cada paquete según la
                  tasa actual del dólar.
                </p>
              </div>

              {showPackageForm && editingPackage && (
                <PackageForm
                  pkg={editingPackage}
                  onSave={handleSavePackage}
                  onCancel={() => {
                    setShowPackageForm(false);
                    setEditingPackage(null);
                  }}
                />
              )}

              {packages.length === 0 && !showPackageForm ? (
                <div
                  className="text-center py-16 bg-white rounded-xl border border-border"
                  data-ocid="packages.empty_state"
                >
                  <p className="text-muted-foreground">
                    No hay paquetes todavía.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {packages.map((pkg, i) => (
                    <div
                      key={pkg.id}
                      className={`bg-white rounded-xl p-5 border-2 flex items-center justify-between gap-4 ${
                        pkg.active
                          ? "border-border"
                          : "border-border opacity-60"
                      }`}
                      data-ocid={`packages.item.${i + 1}`}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center flex-shrink-0">
                          <Package className="w-5 h-5 text-navy" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-heading font-bold text-sm text-foreground">
                              {pkg.name}
                            </p>
                            {pkg.isPopular && (
                              <span className="text-xs bg-orange/10 text-orange px-2 py-0.5 rounded-full font-semibold">
                                Popular
                              </span>
                            )}
                            {!pkg.active && (
                              <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                                Inactivo
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm font-bold text-navy">
                              Creación:{" "}
                              <span className="text-orange">${pkg.price}</span>
                            </span>
                            <span className="text-sm font-bold text-navy">
                              Mantenimiento:{" "}
                              <span className="text-teal">
                                ${pkg.maintenancePrice}/mes
                              </span>
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 truncate max-w-xs">
                            {pkg.features.slice(0, 3).join(" · ")}
                            {pkg.features.length > 3 ? " ···" : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleActive(pkg.id)}
                          className={`p-2 rounded-lg transition-colors text-xs font-semibold ${
                            pkg.active
                              ? "text-teal hover:bg-teal/10"
                              : "text-muted-foreground hover:bg-muted"
                          }`}
                          title={pkg.active ? "Desactivar" : "Activar"}
                          data-ocid="packages.toggle"
                        >
                          {pkg.active ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingPackage(pkg);
                            setShowPackageForm(true);
                          }}
                          className="p-2 text-muted-foreground hover:text-navy transition-colors"
                          data-ocid="packages.edit_button"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        {pkgDeleteConfirmId === pkg.id ? (
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleDeletePackage(pkg.id)}
                              className="text-xs bg-destructive text-white px-3 py-1 rounded-full"
                              data-ocid="packages.confirm_button"
                            >
                              Confirmar
                            </button>
                            <button
                              type="button"
                              onClick={() => setPkgDeleteConfirmId(null)}
                              className="text-xs border border-border px-3 py-1 rounded-full"
                              data-ocid="packages.cancel_button"
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setPkgDeleteConfirmId(pkg.id)}
                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                            data-ocid="packages.delete_button"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "messages" && (
            <div data-ocid="admin.panel">
              <h2 className="font-heading font-semibold text-lg text-foreground mb-4">
                Mensajes de Contacto
              </h2>
              {messages.length === 0 ? (
                <div
                  className="text-center py-16 bg-white rounded-xl border border-border"
                  data-ocid="admin.empty_state"
                >
                  <p className="text-muted-foreground">
                    No hay mensajes todavía.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg, i) => (
                    <div
                      key={msg.id}
                      className="bg-white rounded-xl p-5 border border-border"
                      data-ocid={`admin.item.${i + 1}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-sm text-foreground">
                            {msg.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {msg.email} · {formatDate(msg.receivedAt)}
                          </p>
                        </div>
                        <span className="text-xs text-teal bg-teal/10 px-2 py-1 rounded-full flex-shrink-0">
                          {msg.subject}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "testimonials" && (
            <div data-ocid="admin.panel">
              <h2 className="font-heading font-semibold text-lg text-foreground mb-4">
                Testimonios
              </h2>
              {testimonials.length === 0 ? (
                <div
                  className="text-center py-16 bg-white rounded-xl border border-border"
                  data-ocid="admin.empty_state"
                >
                  <p className="text-muted-foreground">
                    No hay testimonios todavía.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {testimonials.map((t, i) => (
                    <div
                      key={t.id}
                      className="bg-white rounded-xl p-5 border border-border"
                      data-ocid={`admin.item.${i + 1}`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-sm text-foreground">
                            {t.authorName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t.roleOrBusiness}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteTestimonial(t.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                          data-ocid="admin.delete_button"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
                        {t.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "subscribers" && (
            <div data-ocid="admin.panel">
              <h2 className="font-heading font-semibold text-lg text-foreground mb-4">
                Suscriptores del Newsletter ({subscribers.length})
              </h2>
              {subscribers.length === 0 ? (
                <div
                  className="text-center py-16 bg-white rounded-xl border border-border"
                  data-ocid="admin.empty_state"
                >
                  <p className="text-muted-foreground">
                    No hay suscriptores todavía.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-border overflow-hidden">
                  <table className="w-full text-sm" data-ocid="admin.table">
                    <thead className="bg-muted/30">
                      <tr>
                        <th className="text-left px-4 py-3 font-semibold text-foreground">
                          #
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground">
                          Email
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground">
                          Fecha
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((sub, i) => (
                        <tr
                          key={sub.email}
                          className="border-t border-border"
                          data-ocid="admin.row"
                        >
                          <td className="px-4 py-3 text-muted-foreground">
                            {i + 1}
                          </td>
                          <td className="px-4 py-3 text-foreground">
                            {sub.email}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {formatDate(sub.signupDate)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PostForm({
  post,
  isSaving,
  onSave,
  onCancel,
}: {
  post: BlogPost;
  isSaving: boolean;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<BlogPost>(post);

  return (
    <div
      className="bg-white rounded-xl border border-border p-6 mb-6"
      data-ocid="admin.modal"
    >
      <h3 className="font-heading font-semibold text-base text-foreground mb-4">
        {form.id ? "Editar Artículo" : "Nuevo Artículo"}
      </h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="post-title"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Título
          </label>
          <input
            id="post-title"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50"
            placeholder="Título del artículo"
            data-ocid="admin.input"
          />
        </div>
        <div>
          <label
            htmlFor="post-category"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Categoría
          </label>
          <select
            id="post-category"
            value={form.category}
            onChange={(e) =>
              setForm((p) => ({ ...p, category: e.target.value }))
            }
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50 bg-white"
            data-ocid="admin.select"
          >
            <option value="negocios">Negocios</option>
            <option value="creadores">Creadores</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="post-summary"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Resumen
        </label>
        <input
          id="post-summary"
          value={form.summary}
          onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))}
          className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50"
          placeholder="Descripción breve del artículo"
          data-ocid="admin.input"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="post-image"
          className="block text-sm font-medium text-foreground mb-1"
        >
          URL de Imagen de Portada
        </label>
        <input
          id="post-image"
          value={form.coverImageURL}
          onChange={(e) =>
            setForm((p) => ({ ...p, coverImageURL: e.target.value }))
          }
          className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50"
          placeholder="https://..."
          data-ocid="admin.input"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="post-content"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Contenido
        </label>
        <textarea
          id="post-content"
          rows={8}
          value={form.content}
          onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
          className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50 resize-y"
          placeholder="Escribe el contenido del artículo (soporta ## para títulos)"
          data-ocid="admin.textarea"
        />
      </div>
      <div className="flex items-center gap-3 mb-6">
        <input
          type="checkbox"
          id="post-published"
          checked={form.published}
          onChange={(e) =>
            setForm((p) => ({ ...p, published: e.target.checked }))
          }
          className="rounded"
          data-ocid="admin.checkbox"
        />
        <label htmlFor="post-published" className="text-sm text-foreground">
          Publicar inmediatamente
        </label>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onSave(form)}
          disabled={isSaving || !form.title}
          className="bg-orange text-white font-semibold px-6 py-2 rounded-full hover:bg-orange/90 transition-colors text-sm disabled:opacity-50"
          data-ocid="admin.save_button"
        >
          {isSaving ? "Guardando..." : "Guardar"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-border text-muted-foreground font-semibold px-6 py-2 rounded-full hover:border-navy text-sm"
          data-ocid="admin.cancel_button"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

function PackageForm({
  pkg,
  onSave,
  onCancel,
}: {
  pkg: ServicePackage;
  onSave: (pkg: ServicePackage) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<ServicePackage>(pkg);
  const [featureInput, setFeatureInput] = useState("");

  const addFeature = () => {
    const trimmed = featureInput.trim();
    if (trimmed && !form.features.includes(trimmed)) {
      setForm((p) => ({ ...p, features: [...p.features, trimmed] }));
      setFeatureInput("");
    }
  };

  const removeFeature = (feat: string) => {
    setForm((p) => ({ ...p, features: p.features.filter((f) => f !== feat) }));
  };

  return (
    <div
      className="bg-white rounded-xl border-2 border-orange/20 p-6 mb-6"
      data-ocid="packages.modal"
    >
      <h3 className="font-heading font-semibold text-base text-foreground mb-6">
        {form.id ? "Editar Paquete" : "Nuevo Paquete"}
      </h3>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="pkg-name"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Nombre del Paquete
          </label>
          <input
            id="pkg-name"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50"
            placeholder="Ej: Básico, Estándar, Premium"
            data-ocid="packages.input"
          />
        </div>
        <div>
          <label
            htmlFor="pkg-desc"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Descripción
          </label>
          <input
            id="pkg-desc"
            value={form.description}
            onChange={(e) =>
              setForm((p) => ({ ...p, description: e.target.value }))
            }
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50"
            placeholder="Describe brevemente este paquete"
            data-ocid="packages.input"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="pkg-price"
            className="block text-sm font-medium text-foreground mb-1"
          >
            💵 Precio de Creación (USD)
          </label>
          <input
            id="pkg-price"
            type="number"
            min="0"
            step="1"
            value={form.price}
            onChange={(e) =>
              setForm((p) => ({ ...p, price: Number(e.target.value) }))
            }
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50"
            placeholder="35"
            data-ocid="packages.input"
          />
        </div>
        <div>
          <label
            htmlFor="pkg-maint"
            className="block text-sm font-medium text-foreground mb-1"
          >
            🔄 Mantenimiento Mensual (USD)
          </label>
          <input
            id="pkg-maint"
            type="number"
            min="0"
            step="1"
            value={form.maintenancePrice}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                maintenancePrice: Number(e.target.value),
              }))
            }
            className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50"
            placeholder="10"
            data-ocid="packages.input"
          />
        </div>
      </div>

      {/* Features */}
      <div className="mb-4">
        <label
          htmlFor="pkg-feature"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Características incluidas
        </label>
        <div className="flex gap-2 mb-3">
          <input
            id="pkg-feature"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              (() => {
                e.preventDefault();
                addFeature();
              })()
            }
            className="flex-1 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/50"
            placeholder="Ej: Página de inicio"
            data-ocid="packages.input"
          />
          <button
            type="button"
            onClick={addFeature}
            className="bg-teal text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal/90"
            data-ocid="packages.secondary_button"
          >
            Agregar
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.features.map((feat) => (
            <span
              key={feat}
              className="flex items-center gap-1.5 bg-muted/50 text-foreground text-xs px-3 py-1.5 rounded-full border border-border"
            >
              <Check className="w-3 h-3 text-teal" />
              {feat}
              <button
                type="button"
                onClick={() => removeFeature(feat)}
                className="ml-1 text-muted-foreground hover:text-destructive transition-colors"
                data-ocid="packages.delete_button"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {form.features.length === 0 && (
            <p className="text-xs text-muted-foreground">
              Agrega características al paquete
            </p>
          )}
        </div>
      </div>

      {/* Toggles */}
      <div className="flex items-center gap-6 mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isPopular}
            onChange={(e) =>
              setForm((p) => ({ ...p, isPopular: e.target.checked }))
            }
            className="rounded"
            data-ocid="packages.checkbox"
          />
          <span className="text-sm text-foreground">
            ⭐ Marcar como Popular
          </span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) =>
              setForm((p) => ({ ...p, active: e.target.checked }))
            }
            className="rounded"
            data-ocid="packages.checkbox"
          />
          <span className="text-sm text-foreground">
            Activo (visible al público)
          </span>
        </label>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onSave(form)}
          disabled={!form.name || form.price <= 0}
          className="bg-orange text-white font-semibold px-6 py-2 rounded-full hover:bg-orange/90 transition-colors text-sm disabled:opacity-50"
          data-ocid="packages.save_button"
        >
          Guardar Paquete
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-border text-muted-foreground font-semibold px-6 py-2 rounded-full hover:border-navy text-sm"
          data-ocid="packages.cancel_button"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
