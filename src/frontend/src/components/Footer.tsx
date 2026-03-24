import { useAddSubscriber } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, Phone, Send, Youtube } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { mutateAsync: addSubscriber, isPending } = useAddSubscriber();
  const currentYear = new Date().getFullYear();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await addSubscriber(email);
      toast.success("¡Suscrito exitosamente!");
      setEmail("");
    } catch {
      toast.error("Error al suscribirse. Intente de nuevo.");
    }
  };

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-orange flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">
                  CC
                </span>
              </div>
              <span className="font-heading font-bold text-white text-lg">
                Crear y Crecer
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Ayudamos a negocios locales y creadores de contenido a establecer
              su presencia digital profesional.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">
              Servicios
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a
                  href="/#servicios"
                  className="hover:text-orange transition-colors"
                >
                  Sitios Web para Negocios
                </a>
              </li>
              <li>
                <a
                  href="/#servicios"
                  className="hover:text-orange transition-colors"
                >
                  Páginas para Creadores
                </a>
              </li>
              <li>
                <a
                  href="/#servicios"
                  className="hover:text-orange transition-colors"
                >
                  Tiendas Online
                </a>
              </li>
              <li>
                <a
                  href="/#servicios"
                  className="hover:text-orange transition-colors"
                >
                  SEO y Marketing Digital
                </a>
              </li>
              <li>
                <a
                  href="/#servicios"
                  className="hover:text-orange transition-colors"
                >
                  Consultoría de Marca
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">
              Links Rápidos
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link to="/" className="hover:text-orange transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-orange transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="/#sobre-mi"
                  className="hover:text-orange transition-colors"
                >
                  Sobre Mí
                </a>
              </li>
              <li>
                <a
                  href="/#contacto"
                  className="hover:text-orange transition-colors"
                >
                  Contacto
                </a>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="hover:text-orange transition-colors"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">
              Newsletter
            </h4>
            <p className="text-white/60 text-sm mb-4">
              Suscríbete para recibir tips de emprendimiento digital.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                id="footer-newsletter-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-teal"
                data-ocid="footer.input"
              />
              <button
                type="submit"
                disabled={isPending}
                className="w-10 h-10 rounded-full bg-orange flex items-center justify-center hover:bg-orange/90 transition-colors flex-shrink-0"
                data-ocid="footer.submit_button"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>

            <div className="mt-4 flex items-center gap-2 text-white/60 text-xs">
              <Mail className="w-3 h-3" />
              <span>hola@crearyCrecer.com</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-xs mt-1">
              <Phone className="w-3 h-3" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/40 text-xs">
          © {currentYear}. Construido con <span className="text-orange">♥</span>{" "}
          usando{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange transition-colors"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
