import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useGetPublishedPosts } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const SAMPLE_POSTS = [
  {
    id: "p1",
    title: "5 Razones por las que tu Negocio Necesita un Sitio Web",
    summary:
      "En el mundo digital de hoy, no tener presencia online es perder clientes. Descubre por qué un sitio web es la mejor inversión para tu negocio local.",
    coverImageURL: "/assets/generated/blog-negocios.dim_800x500.jpg",
    category: "negocios",
    published: true,
    createdAt: BigInt(1700000000000000000),
    content: "",
    updatedAt: BigInt(0),
  },
  {
    id: "p2",
    title: "Cómo Monetizar tu Contenido y Ganar Dinero desde Casa",
    summary:
      "Ser creador de contenido es más que publicar fotos bonitas. Aprende las estrategias que usan los mejores para convertir seguidores en ingresos reales.",
    coverImageURL: "/assets/generated/blog-creadores.dim_800x500.jpg",
    category: "creadores",
    published: true,
    createdAt: BigInt(1700000000000000000),
    content: "",
    updatedAt: BigInt(0),
  },
  {
    id: "p3",
    title: "Diseño Web Profesional: La Diferencia entre un Cliente y una Venta",
    summary:
      "Un buen diseño web no es solo estética. Es la diferencia entre que un visitante se vaya o compre. Te mostramos qué elementos son clave.",
    coverImageURL: "/assets/generated/blog-web.dim_800x500.jpg",
    category: "negocios",
    published: true,
    createdAt: BigInt(1700000000000000000),
    content: "",
    updatedAt: BigInt(0),
  },
  {
    id: "p4",
    title: "Instagram vs. Sitio Web: ¿Cuál Necesitas Primero?",
    summary:
      "Muchos creen que solo necesitan Instagram para vender. Te explicamos por qué un sitio web siempre es necesario y cómo usarlos juntos para maximizar resultados.",
    coverImageURL: "/assets/generated/blog-creadores.dim_800x500.jpg",
    category: "creadores",
    published: true,
    createdAt: BigInt(1700000000000000000),
    content: "",
    updatedAt: BigInt(0),
  },
  {
    id: "p5",
    title: "Cómo Aparecer en Google sin Pagar Publicidad",
    summary:
      "El SEO local puede transformar tu negocio. Aprende los pasos básicos para que tus clientes te encuentren en Google de forma gratuita.",
    coverImageURL: "/assets/generated/blog-negocios.dim_800x500.jpg",
    category: "negocios",
    published: true,
    createdAt: BigInt(1700000000000000000),
    content: "",
    updatedAt: BigInt(0),
  },
  {
    id: "p6",
    title: "Herramientas Gratis para Emprendedores Digitales en 2025",
    summary:
      "No necesitas gran presupuesto para empezar. Estas herramientas gratuitas te ayudan a diseñar, gestionar y vender desde el primer día.",
    coverImageURL: "/assets/generated/blog-web.dim_800x500.jpg",
    category: "negocios",
    published: true,
    createdAt: BigInt(1700000000000000000),
    content: "",
    updatedAt: BigInt(0),
  },
];

const CATEGORIES = [
  { value: "all", label: "Todos" },
  { value: "negocios", label: "Negocios" },
  { value: "creadores", label: "Creadores" },
];

export default function BlogPage() {
  const { data: posts } = useGetPublishedPosts();
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const allPosts = posts && posts.length > 0 ? posts : SAMPLE_POSTS;

  const filtered = allPosts.filter((p) => {
    const matchesCat = category === "all" || p.category === category;
    const matchesSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.summary.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const formatDate = (t: bigint) => {
    const ms = Number(t) / 1_000_000;
    if (!ms || ms < 1000) return "";
    return new Date(ms).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-navy pt-24 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl font-extrabold mb-4"
          >
            Blog
          </motion.h1>
          <p className="text-white/60 max-w-xl mx-auto mb-8">
            Recursos, tips y estrategias para emprendedores digitales
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-full pl-10 pr-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-teal"
              data-ocid="blog.search_input"
            />
          </div>
        </div>
      </section>

      <main className="flex-1 py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 mb-10 justify-center flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategory(cat.value)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  category === cat.value
                    ? "bg-teal text-white"
                    : "bg-white border border-border text-muted-foreground hover:border-teal hover:text-teal"
                }`}
                data-ocid="blog.tab"
              >
                {cat.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20" data-ocid="blog.empty_state">
              <p className="text-muted-foreground text-lg">
                No se encontraron artículos.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-lg transition-shadow"
                  data-ocid={`blog.item.${i + 1}`}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.coverImageURL}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block bg-teal/10 text-teal text-xs font-semibold px-3 py-1 rounded-full mb-3 capitalize">
                      {post.category}
                    </span>
                    <h2 className="font-heading font-bold text-base text-foreground mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.summary}
                    </p>
                    {formatDate(post.createdAt) && (
                      <p className="text-xs text-muted-foreground/60 mb-3">
                        {formatDate(post.createdAt)}
                      </p>
                    )}
                    <Link
                      to="/blog/$id"
                      params={{ id: post.id }}
                      className="text-teal font-semibold text-sm hover:text-orange transition-colors flex items-center gap-1"
                      data-ocid="blog.link"
                    >
                      Leer más <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
