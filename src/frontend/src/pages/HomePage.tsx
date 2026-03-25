import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useGetBlogPosts, useGetServices } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { ChevronRight, MapPin, Scissors, Star } from "lucide-react";
import { motion } from "motion/react";

const SAMPLE_SERVICES = [
  {
    name: "Corte Básico",
    description: "Corte clásico con tijera y máquina",
    price: 5,
  },
  {
    name: "Corte + Barba",
    description: "Servicio completo de corte y arreglo de barba",
    price: 8,
  },
  {
    name: "Fade / Degradado",
    description: "Degradado moderno skin fade o drop fade",
    price: 7,
  },
  {
    name: "Arreglo de Barba",
    description: "Perfilado y arreglo de barba solamente",
    price: 4,
  },
  {
    name: "Corte a Domicilio",
    description: "Voy hasta donde estés en Caracas",
    price: 3,
  },
];

const GALLERY_PHOTOS = [
  {
    src: "/assets/generated/corte1.dim_400x400.jpg",
    label: "Fade Clásico",
  },
  {
    src: "/assets/generated/corte2.dim_400x400.jpg",
    label: "Corte + Barba",
  },
  {
    src: "/assets/generated/corte3.dim_400x400.jpg",
    label: "Degradado Moderno",
  },
  {
    src: "/assets/generated/corte4.dim_400x400.jpg",
    label: "Skin Fade",
  },
];

const SAMPLE_BLOG = [
  {
    title: "5 Estilos de Corte que están de moda en Caracas",
    content:
      "El fade, el drop fade, el buzz cut y el undercut son los cortes más pedidos en las barberías de Caracas este año. Descubre cuál es el ideal para ti según tu tipo de cara y estilo de vida.",
    publishedAt: BigInt(0),
  },
  {
    title: "Cómo mantener tu barba en casa",
    content:
      "Mantener una barba bien arreglada no requiere ir todos los días a la barbería. Con los productos correctos y algunos trucos básicos, puedes mantener tu barba perfecta entre visitas.",
    publishedAt: BigInt(0),
  },
];

export default function HomePage() {
  const { data: services } = useGetServices();
  const { data: posts } = useGetBlogPosts();

  const displayServices =
    services && services.length > 0 ? services : SAMPLE_SERVICES;
  const displayPosts = posts && posts.length > 0 ? posts : SAMPLE_BLOG;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('/assets/generated/barberia-hero.dim_1200x600.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-background/80" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 49px,rgba(201,161,90,0.8) 49px,rgba(201,161,90,0.8) 50px),repeating-linear-gradient(90deg,transparent,transparent 49px,rgba(201,161,90,0.8) 49px,rgba(201,161,90,0.8) 50px)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-primary" />
              <span className="text-primary text-xs font-bold tracking-[0.3em]">
                CARACAS, VENEZUELA
              </span>
              <div className="h-px w-12 bg-primary" />
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black text-foreground uppercase leading-tight mb-4">
              BARBERÍA
              <br />
              <span className="text-primary">PROFESIONAL</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-xl mx-auto">
              Cortes de calidad en Caracas · A domicilio y en casa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("servicios")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-primary text-primary-foreground px-8 py-4 rounded font-bold tracking-widest text-sm uppercase hover:opacity-90 transition-opacity"
                data-ocid="hero.primary_button"
              >
                VER SERVICIOS
              </button>
              <a
                href="https://wa.me/5804125828010?text=Hola!%20Vi%20tu%20página%20y%20me%20interesa%20un%20corte%20💈"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-primary text-primary px-8 py-4 rounded font-bold tracking-widest text-sm uppercase hover:bg-primary hover:text-primary-foreground transition-all"
                data-ocid="hero.secondary_button"
              >
                CONTÁCTAME
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-6 border-t border-border/50 pt-8"
          >
            {[
              { value: "100+", label: "Clientes Satisfechos" },
              { value: "2+", label: "Años de Experiencia" },
              { value: "5★", label: "Calificación" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-2xl font-black text-primary">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-xs mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-primary" />
              <span className="text-primary text-xs font-bold tracking-[0.3em]">
                LO QUE OFREZCO
              </span>
              <div className="h-px w-10 bg-primary" />
            </div>
            <h2 className="font-heading text-4xl font-black text-foreground uppercase">
              SERVICIOS
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                data-ocid={`services.item.${i + 1}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <Scissors className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-heading font-black text-xl text-primary">
                    ${service.price}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-foreground text-base mb-2">
                  {service.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground text-sm">
              <MapPin className="inline w-4 h-4 text-primary mr-1" />
              Servicio a domicilio disponible en toda Caracas · Precios en USD
            </p>
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section id="galeria" className="py-20 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-primary" />
              <span className="text-primary text-xs font-bold tracking-[0.3em]">
                MI TRABAJO
              </span>
              <div className="h-px w-10 bg-primary" />
            </div>
            <h2 className="font-heading text-4xl font-black text-foreground uppercase">
              GALERÍA
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY_PHOTOS.map((photo, i) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-lg aspect-square"
                data-ocid={`gallery.item.${i + 1}`}
              >
                <img
                  src={photo.src}
                  alt={photo.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-all duration-300 flex items-end">
                  <p className="w-full text-center text-primary font-bold text-sm py-3 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                    {photo.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE MÍ + BLOG */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Sobre Mí */}
          <div id="sobre-mi">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-primary" />
                <span className="text-primary text-xs font-bold tracking-[0.3em]">
                  QUIÉN SOY
                </span>
              </div>
              <h2 className="font-heading text-4xl font-black text-foreground uppercase mb-6">
                SOBRE MÍ
              </h2>
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-20 h-20 bg-card border-2 border-primary rounded-full flex items-center justify-center">
                  <Scissors className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-primary text-xl mb-2">
                    Miguel
                  </h3>
                  <p className="text-xs text-muted-foreground/60 tracking-widest mb-3">
                    BARBERO PROFESIONAL · CARACAS
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    Empecé cortando entre amigos y familiares, perfeccionando mi
                    técnica con cada cliente. Hoy ofrezco un servicio
                    profesional desde casa y a domicilio por toda Caracas.
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Especializado en fades, degradados y arreglo de barba. Llevo
                    la barbería hasta donde tú estés, con los mejores productos
                    y atención personalizada.
                  </p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-4 h-4 fill-primary text-primary"
                      />
                    ))}
                    <span className="text-muted-foreground text-xs ml-2">
                      +100 clientes satisfechos
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Blog preview */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-primary" />
                <span className="text-primary text-xs font-bold tracking-[0.3em]">
                  ARTÍCULOS
                </span>
              </div>
              <h2 className="font-heading text-4xl font-black text-foreground uppercase mb-6">
                BLOG
              </h2>
              <div className="space-y-4">
                {displayPosts.slice(0, 2).map((post) => (
                  <div
                    key={post.title}
                    className="bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-colors"
                  >
                    <h3 className="font-heading font-bold text-foreground text-sm mb-2 uppercase">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
                      {post.content}
                    </p>
                    <Link
                      to="/blog"
                      className="inline-flex items-center gap-1 text-primary text-xs font-semibold mt-3 hover:opacity-80 transition-opacity"
                      data-ocid="blog.link"
                    >
                      Leer más <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link
                  to="/blog"
                  className="text-primary text-sm font-bold tracking-widest uppercase hover:opacity-80 flex items-center gap-2"
                  data-ocid="blog.link"
                >
                  VER TODOS LOS ARTÍCULOS <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA CONTACTO */}
      <section
        id="contacto"
        className="py-20 px-4 bg-card/50 border-t border-border"
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl font-black text-foreground uppercase mb-4">
              ¿LISTO PARA TU <span className="text-primary">CORTE?</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Escríbeme por WhatsApp y agenda tu cita. A domicilio en toda
              Caracas o desde mi casa.
            </p>
            <a
              href="https://wa.me/5804125828010?text=Hola!%20Vi%20tu%20página%20y%20me%20interesa%20un%20corte%20💈"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded font-bold tracking-widest text-sm uppercase hover:opacity-90 transition-opacity"
              data-ocid="contact.primary_button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-white"
                role="img"
                aria-hidden="true"
              >
                <title>WhatsApp</title>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              AGENDAR POR WHATSAPP
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
