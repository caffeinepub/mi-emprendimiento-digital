import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useGetBlogPosts } from "@/hooks/useQueries";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const SAMPLE_POSTS = [
  {
    title: "5 Estilos de Corte que están de moda en Caracas",
    content:
      "El fade, el drop fade, el buzz cut y el undercut son los cortes más pedidos en las barberías de Caracas este año. El fade sigue siendo el rey: un degradado bien ejecutado puede transformar completamente la apariencia de cualquier persona. El drop fade, que sigue la curva natural detrás de la oreja, da un look más moderno y definido. Para los que prefieren algo más clásico, el corte con raya al lado nunca pasa de moda. Y para los más atrevidos, el disconnected undercut con barba es la tendencia que más se ve en las calles caraqueñas.",
    publishedAt: BigInt(0),
  },
  {
    title: "Cómo mantener tu barba en casa",
    content:
      "Mantener una barba bien arreglada no requiere ir todos los días a la barbería. Con los productos correctos y algunos trucos básicos, puedes mantener tu barba perfecta entre visitas. Lo primero: lavar la barba al menos 3 veces por semana con un shampoo específico. Segundo, aplica aceite de barba después de lavar, esto mantiene el pelo suave y la piel hidratada. Tercero, peina la barba en la dirección del crecimiento. Para el perfilado en casa, usa una maquinilla con guía y mantén las líneas del cuello y las mejillas definidas. Visita a tu barbero al menos cada 2-3 semanas.",
    publishedAt: BigInt(0),
  },
  {
    title: "¿Cuál corte es el ideal para tu tipo de cara?",
    content:
      "No todos los cortes funcionan igual para todos los tipos de cara. Si tienes cara redonda, los cortes con volumen arriba y lados cortos te favorecen: el pompadour o el quiff son perfectos. Para cara ovalada, casi cualquier corte queda bien, eres el afortunado. Las caras cuadradas lucen espectacular con el buzz cut o el crew cut, ya que resaltan la mandíbula. Si tienes cara alargada, evita los cortes muy altos en los lados. La clave siempre es hablar con tu barbero sobre tu tipo de cara y estilo de vida antes de decidir.",
    publishedAt: BigInt(0),
  },
];

export default function BlogPage() {
  const { data: posts } = useGetBlogPosts();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const allPosts = posts && posts.length > 0 ? posts : SAMPLE_POSTS;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-16 px-4 border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-primary" />
            <span className="text-primary text-xs font-bold tracking-[0.3em]">
              CONSEJOS Y TENDENCIAS
            </span>
            <div className="h-px w-10 bg-primary" />
          </div>
          <h1 className="font-heading text-5xl font-black text-foreground uppercase">
            BLOG
          </h1>
          <p className="text-muted-foreground mt-4">
            Tips de barbería, tendencias y cuidado personal para caballeros
          </p>
        </div>
      </section>

      <main className="flex-1 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {allPosts.length === 0 ? (
            <div className="text-center py-20" data-ocid="blog.empty_state">
              <p className="text-muted-foreground">No hay artículos todavía.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {allPosts.map((post, i) => (
                <motion.article
                  key={post.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
                  data-ocid={`blog.item.${i + 1}`}
                >
                  <div className="p-6">
                    <h2 className="font-heading font-bold text-lg text-foreground uppercase mb-3">
                      {post.title}
                    </h2>
                    <p
                      className={`text-muted-foreground text-sm leading-relaxed ${
                        expandedIdx === i ? "" : "line-clamp-3"
                      }`}
                    >
                      {post.content}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedIdx(expandedIdx === i ? null : i)
                      }
                      className="inline-flex items-center gap-1 text-primary text-xs font-bold tracking-widest uppercase mt-4 hover:opacity-80 transition-opacity"
                      data-ocid="blog.link"
                    >
                      {expandedIdx === i ? "LEER MENOS" : "LEER MÁS"}
                      <ChevronRight
                        className={`w-3 h-3 transition-transform ${
                          expandedIdx === i ? "rotate-90" : ""
                        }`}
                      />
                    </button>
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
