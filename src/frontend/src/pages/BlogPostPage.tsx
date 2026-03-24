import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useGetBlogPost } from "@/hooks/useQueries";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { motion } from "motion/react";

const SAMPLE_POST = {
  id: "p1",
  title: "5 Razones por las que tu Negocio Necesita un Sitio Web",
  summary:
    "En el mundo digital de hoy, no tener presencia online es perder clientes.",
  coverImageURL: "/assets/generated/blog-negocios.dim_800x500.jpg",
  category: "negocios",
  published: true,
  createdAt: BigInt(1700000000000000000),
  updatedAt: BigInt(0),
  content: `## Por qué tu negocio necesita un sitio web en 2025

En la era digital, no tener un sitio web es como no tener una dirección. Tus clientes potenciales te buscan en Google antes de ir a cualquier lugar.

### 1. Credibilidad y Confianza

Un sitio web profesional transmite confianza. Los clientes modernos buscan información antes de comprar. Si no te encuentran online, simplemente van con tu competencia.

### 2. Disponible las 24 Horas

A diferencia de una tienda física, tu sitio web trabaja para ti todo el tiempo. Un cliente puede conocerte a las 2am y contactarte a la mañana siguiente.

### 3. Alcance Geográfico Ilimitado

Con un sitio web, puedes llegar a clientes en toda tu ciudad, país o incluso internacionalmente. Tu negocio local puede convertirse en un negocio sin fronteras.

### 4. Marketing Económico

Comparado con publicidad tradicional, un sitio web es una de las inversiones de marketing más económicas y efectivas. Con SEO básico, puedes aparecer en Google sin pagar por anuncios.

### 5. Ventaja Competitiva

Muchos negocios locales todavía no tienen presencia digital. Ser de los primeros en tu sector en tener un sitio web profesional te da una enorme ventaja.

## ¿Cómo Empezar?

No necesitas un presupuesto enorme. Empieza con un sitio web simple pero profesional que tenga:
- Tu información de contacto
- Tus servicios o productos
- Fotos de calidad
- Un formulario de contacto

¡Contáctanos y te ayudamos a lanzar tu presencia digital hoy mismo!`,
};

function renderContent(content: string) {
  return content.split("\n").map((line, i) => {
    const key = `line-${i}`;
    if (line.startsWith("## ")) {
      return (
        <h2
          key={key}
          className="font-heading text-2xl font-bold text-foreground mt-8 mb-4"
        >
          {line.slice(3)}
        </h2>
      );
    }
    if (line.startsWith("### ")) {
      return (
        <h3
          key={key}
          className="font-heading text-xl font-bold text-foreground mt-6 mb-3"
        >
          {line.slice(4)}
        </h3>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <li key={key} className="text-muted-foreground ml-4 mb-1">
          {line.slice(2)}
        </li>
      );
    }
    if (line === "") {
      return <br key={key} />;
    }
    return (
      <p key={key} className="text-muted-foreground leading-relaxed mb-4">
        {line}
      </p>
    );
  });
}

export default function BlogPostPage() {
  const { id } = useParams({ from: "/blog/$id" });
  const { data: post, isLoading } = useGetBlogPost(id);

  const displayPost = post || SAMPLE_POST;

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

      <main className="flex-1 pt-24">
        {isLoading ? (
          <div
            className="flex items-center justify-center py-40"
            data-ocid="post.loading_state"
          >
            <div className="w-8 h-8 border-4 border-teal border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="relative h-64 md:h-96 overflow-hidden">
              <img
                src={displayPost.coverImageURL}
                alt={displayPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-navy/60" />
              <div className="absolute inset-0 flex items-end">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <span className="inline-block bg-teal/80 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 capitalize">
                      <Tag className="w-3 h-3 inline mr-1" />
                      {displayPost.category}
                    </span>
                    <h1 className="font-heading text-2xl md:text-4xl font-extrabold text-white">
                      {displayPost.title}
                    </h1>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
                <Link
                  to="/blog"
                  className="flex items-center gap-1 text-teal hover:text-navy transition-colors"
                  data-ocid="post.link"
                >
                  <ArrowLeft className="w-4 h-4" /> Volver al Blog
                </Link>
                {formatDate(displayPost.createdAt) && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(displayPost.createdAt)}
                  </span>
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="prose prose-lg max-w-none"
              >
                {displayPost.content ? (
                  renderContent(displayPost.content)
                ) : (
                  <p className="text-muted-foreground">{displayPost.summary}</p>
                )}
              </motion.div>

              <div className="mt-12 p-8 bg-navy rounded-2xl text-center">
                <h3 className="font-heading font-bold text-white text-2xl mb-3">
                  ¿Listo para crear tu presencia digital?
                </h3>
                <p className="text-white/60 mb-6">
                  Contáctanos y recibe una consulta gratuita sin compromiso.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-orange text-white font-semibold px-8 py-3 rounded-full hover:bg-orange/90 transition-colors"
                  data-ocid="post.primary_button"
                >
                  Contactar Ahora <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
