import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePackages } from "@/hooks/usePackages";
import {
  useGetPublishedPosts,
  useGetTestimonials,
  useSubmitContact,
} from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Globe,
  MessageCircle,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const SAMPLE_TESTIMONIALS = [
  {
    id: "t1",
    authorName: "María González",
    roleOrBusiness: "Dueña de Panadería La Dulce",
    message:
      "Gracias a Crear y Crecer, mi panadería ahora tiene clientes de todo el vecindario que nos encuentran en Google. ¡Mis ventas aumentaron un 40%!",
    rating: BigInt(5),
    createdAt: BigInt(0),
  },
  {
    id: "t2",
    authorName: "Carlos Ramírez",
    roleOrBusiness: "Creador de Contenido de Cocina",
    message:
      "Tenía seguidores en Instagram pero no sabía cómo monetizar. Ahora tengo mi propia página y vendo mis recetas digitales desde casa. ¡Increíble!",
    rating: BigInt(5),
    createdAt: BigInt(0),
  },
  {
    id: "t3",
    authorName: "Sofía Martínez",
    roleOrBusiness: "Estilista & Influencer",
    message:
      "Profesionalismo total. En menos de una semana tenía mi portafolio online y ya recibo consultas de todo el país. ¡Definitivamente lo recomiendo!",
    rating: BigInt(5),
    createdAt: BigInt(0),
  },
];

const SAMPLE_POSTS = [
  {
    id: "p1",
    title: "5 Razones por las que tu Negocio Necesita un Sitio Web",
    summary:
      "En el mundo digital de hoy, no tener presencia online es perder clientes. Descubre por qué un sitio web es la mejor inversión para tu negocio local.",
    coverImageURL: "/assets/generated/blog-negocios.dim_800x500.jpg",
    category: "negocios",
    published: true,
    createdAt: BigInt(Date.now() * 1_000_000),
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
    createdAt: BigInt(Date.now() * 1_000_000),
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
    createdAt: BigInt(Date.now() * 1_000_000),
    content: "",
    updatedAt: BigInt(0),
  },
];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const WA_NUMBER = "5804125828010";

export default function HomePage() {
  const { data: posts } = useGetPublishedPosts();
  const { data: testimonials } = useGetTestimonials();
  const { mutateAsync: submitContact, isPending: isSubmitting } =
    useSubmitContact();
  const { activePackages } = usePackages();

  const displayPosts = (posts && posts.length > 0 ? posts : SAMPLE_POSTS).slice(
    0,
    3,
  );
  const displayTestimonials =
    testimonials && testimonials.length > 0
      ? testimonials
      : SAMPLE_TESTIMONIALS;

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact(form);
      toast.success("¡Mensaje enviado! Te contactaremos pronto.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Error al enviar. Por favor intente de nuevo.");
    }
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

  const getWhatsAppLink = (packageName: string) => {
    const msg = encodeURIComponent(
      `Hola Luz! Me interesa el paquete ${packageName}. ¿Puedes darme más información?`,
    );
    return `https://wa.me/${WA_NUMBER}?text=${msg}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-bg.dim_1920x1080.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-navy/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block bg-orange/20 text-orange text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
                Diseño Web Profesional
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                Diseño Web
                <span className="text-orange block">Profesional</span>
                para tu Negocio
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
                Ayudamos a negocios locales y creadores de contenido a
                establecer su presencia digital. Sin complicaciones. Con
                resultados reales. Gana clientes y genera ingresos desde casa.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => scrollTo("precios")}
                  className="bg-orange text-white font-heading font-bold px-8 py-4 rounded-full hover:bg-orange/90 transition-all flex items-center gap-2 text-sm"
                  data-ocid="hero.primary_button"
                >
                  Ver Paquetes y Precios <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/blog"
                  className="border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:border-teal hover:text-teal transition-all text-sm"
                  data-ocid="hero.secondary_button"
                >
                  Ver Blog
                </Link>
              </div>
              <div className="flex gap-8 mt-10">
                <div className="text-center">
                  <p className="font-heading font-extrabold text-3xl text-orange">
                    50+
                  </p>
                  <p className="text-white/50 text-xs">Clientes Felices</p>
                </div>
                <div className="text-center">
                  <p className="font-heading font-extrabold text-3xl text-orange">
                    100%
                  </p>
                  <p className="text-white/50 text-xs">Online & Desde Casa</p>
                </div>
                <div className="text-center">
                  <p className="font-heading font-extrabold text-3xl text-orange">
                    5★
                  </p>
                  <p className="text-white/50 text-xs">Calificación</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        icon: <Globe className="w-5 h-5" />,
                        label: "Sitio Web",
                        desc: "Presencia profesional",
                      },
                      {
                        icon: <Star className="w-5 h-5" />,
                        label: "Blog",
                        desc: "Contenido de valor",
                      },
                      {
                        icon: <Users className="w-5 h-5" />,
                        label: "Clientes",
                        desc: "Más conversiones",
                      },
                      {
                        icon: <Zap className="w-5 h-5" />,
                        label: "Rápido",
                        desc: "Entrega en días",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="bg-white/10 rounded-2xl p-4 border border-white/10"
                      >
                        <div className="text-teal mb-2">{item.icon}</div>
                        <p className="text-white font-semibold text-sm">
                          {item.label}
                        </p>
                        <p className="text-white/50 text-xs">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-teal/10 text-teal text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Servicios
            </span>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground">
              ¿Qué puedo crear para ti?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="w-7 h-7" />,
                title: "Sitio Web Profesional",
                desc: "Tu negocio con presencia digital elegante, rápida y accesible desde cualquier dispositivo.",
              },
              {
                icon: <Star className="w-7 h-7" />,
                title: "Blog de Contenido",
                desc: "Comparte tu conocimiento, atrae audiencia y posiciona tu marca con artículos de valor.",
              },
              {
                icon: <Users className="w-7 h-7" />,
                title: "Catálogo de Productos",
                desc: "Muestra lo que vendes con fotos, descripciones y un botón de contacto directo por WhatsApp.",
              },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-border shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="w-14 h-14 rounded-2xl bg-navy/5 flex items-center justify-center text-navy mb-6">
                  {service.icon}
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <span className="inline-block bg-orange/10 text-orange text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
                Blog
              </span>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground">
                Aprende y Crece
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-navy hover:text-orange transition-colors"
              data-ocid="blog.link"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {displayPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to="/blog/$id"
                  params={{ id: post.id }}
                  className="group block bg-white rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-card-hover transition-all"
                  data-ocid={`blog.item.${i + 1}`}
                >
                  {post.coverImageURL && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.coverImageURL}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="text-xs font-semibold text-teal bg-teal/10 px-3 py-1 rounded-full capitalize">
                      {post.category}
                    </span>
                    <h3 className="font-heading font-bold text-base text-foreground mt-3 mb-2 group-hover:text-navy transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.summary}
                    </p>
                    {formatDate(post.createdAt) && (
                      <p className="text-xs text-muted-foreground mt-3">
                        {formatDate(post.createdAt)}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonios" className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-white/10 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Testimonios
            </span>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white">
              Lo que dicen mis clientes
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {displayTestimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: Number(t.rating) }, (_, si) => si).map(
                    (si) => (
                      <Star
                        // biome-ignore lint/suspicious/noArrayIndexKey: star icons are all identical
                        key={si}
                        className="w-4 h-4 fill-orange text-orange"
                      />
                    ),
                  )}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  "{t.message}"
                </p>
                <p className="font-heading font-bold text-white text-sm">
                  {t.authorName}
                </p>
                <p className="text-xs text-white/50">{t.roleOrBusiness}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precios" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-orange/10 text-orange text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Paquetes y Precios
            </span>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground">
              Elige el plan perfecto
              <span className="text-orange block">para tu negocio</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm">
              Precios accesibles para emprendedores venezolanos. Incluye
              creación del sitio y mantenimiento mensual para mantenerlo siempre
              actualizado.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {activePackages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col rounded-3xl border-2 overflow-hidden transition-all ${
                  pkg.isPopular
                    ? "border-orange shadow-2xl bg-white scale-[1.02]"
                    : "border-border bg-white shadow-card hover:shadow-card-hover"
                }`}
                data-ocid={`pricing.item.${i + 1}`}
              >
                {pkg.isPopular && (
                  <div className="absolute top-0 left-0 right-0 bg-orange text-white text-center text-xs font-bold py-2 tracking-wider uppercase">
                    ⭐ Más Popular
                  </div>
                )}

                <div className={`p-8 ${pkg.isPopular ? "pt-12" : ""}`}>
                  <h3 className="font-heading font-extrabold text-2xl text-foreground mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Pricing */}
                  <div className="bg-muted/40 rounded-2xl p-5 mb-6 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wide">
                          Creación
                        </p>
                        <p className="font-heading font-extrabold text-3xl text-navy">
                          ${pkg.price}
                          <span className="text-sm font-normal text-muted-foreground ml-1">
                            USD
                          </span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wide">
                          Mantenimiento
                        </p>
                        <p className="font-heading font-bold text-xl text-teal">
                          ${pkg.maintenancePrice}
                          <span className="text-xs font-normal text-muted-foreground ml-1">
                            /mes
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-sm">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-teal/10 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-teal" />
                        </span>
                        <span className="text-foreground">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="mt-auto p-8 pt-0">
                  <a
                    href={getWhatsAppLink(pkg.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-4 rounded-full font-heading font-bold text-sm transition-all ${
                      pkg.isPopular
                        ? "bg-orange text-white hover:bg-orange/90 shadow-lg"
                        : "bg-navy text-white hover:bg-navy/90"
                    }`}
                    data-ocid={`pricing.primary_button.${i + 1}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Quiero este paquete
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs text-muted-foreground mt-8 max-w-xl mx-auto leading-relaxed"
          >
            * Los precios están expresados en dólares ($) y pueden variar según
            la tasa del mercado. Se actualizan mensualmente para mantenerse
            alineados con el mercado venezolano.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-teal/10 text-teal text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
                Contacto
              </span>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground mb-6">
                Hablemos de tu
                <span className="text-orange block">proyecto digital</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                ¿Listo para dar el salto digital? Escríbeme y cuéntame sobre tu
                negocio. Te respondo rápido y sin compromiso.
              </p>
              <div className="space-y-4">
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola Luz! Me interesa saber más sobre tus servicios de creación de sitios web y blogs. ¿Puedes ayudarme?")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  data-ocid="contact.link"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  WhatsApp: +58 0412-5828010
                </a>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-muted/30 rounded-3xl p-8 border border-border"
              data-ocid="contact.modal"
            >
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Nombre
                  </label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    required
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal/50"
                    placeholder="Tu nombre"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    required
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal/50"
                    placeholder="tu@email.com"
                    data-ocid="contact.input"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Asunto
                </label>
                <input
                  id="subject"
                  value={form.subject}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, subject: e.target.value }))
                  }
                  required
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal/50"
                  placeholder="¿En qué puedo ayudarte?"
                  data-ocid="contact.input"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  required
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal/50 resize-none"
                  placeholder="Cuéntame sobre tu negocio y qué necesitas..."
                  data-ocid="contact.textarea"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange text-white font-heading font-bold py-4 rounded-full hover:bg-orange/90 transition-colors disabled:opacity-50"
                data-ocid="contact.submit_button"
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
