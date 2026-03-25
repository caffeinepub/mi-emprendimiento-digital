import { Link } from "@tanstack/react-router";
import { Instagram, Scissors } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/barberia-logo-transparent.dim_300x300.png"
                alt="Logo"
                className="h-10 w-10 object-contain"
              />
              <span className="font-heading font-bold text-primary text-base">
                BARBERÍA PROFESIONAL
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Cortes de calidad en Caracas, Venezuela. A domicilio y en casa.
              Especialistas en fade, degradado y barba.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-heading font-bold text-sm tracking-widest text-primary mb-4">
              NAVEGACIÓN
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  data-ocid="footer.link"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  data-ocid="footer.link"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  data-ocid="footer.link"
                >
                  Administración
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-sm tracking-widest text-primary mb-4">
              CONTACTO
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Scissors className="w-4 h-4 text-primary" />
                Caracas, Venezuela
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary font-bold">📱</span>
                <a
                  href="https://wa.me/5804125828010"
                  className="hover:text-primary transition-colors"
                >
                  +58 0412-5828010
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-primary" />
                <span>@barberiacaracas</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {year}. Todos los derechos reservados.</p>
          <p>
            Construido con ❤️ usando{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
