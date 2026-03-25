import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "INICIO", href: "/" },
  { label: "SERVICIOS", href: "/#servicios" },
  { label: "GALERÍA", href: "/#galeria" },
  { label: "SOBRE MÍ", href: "/#sobre-mi" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACTO", href: "/#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" data-ocid="nav.link">
            <img
              src="/assets/generated/barberia-logo-transparent.dim_300x300.png"
              alt="Barbería Profesional Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="font-heading font-bold text-lg text-primary hidden sm:block">
              BARBERÍA PROFESIONAL
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) =>
              link.href.startsWith("/#") ? (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="text-xs font-semibold tracking-widest text-muted-foreground hover:text-primary transition-colors"
                  data-ocid="nav.link"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-xs font-semibold tracking-widest text-muted-foreground hover:text-primary transition-colors"
                  data-ocid="nav.link"
                >
                  {link.label}
                </Link>
              ),
            )}
            <a
              href="https://wa.me/5804125828010?text=Hola!%20Vi%20tu%20página%20y%20me%20interesa%20un%20corte%20💈"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-4 py-2 rounded text-xs font-bold tracking-widest hover:opacity-90 transition-opacity"
              data-ocid="nav.primary_button"
            >
              RESERVAR
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden text-foreground p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
            data-ocid="nav.toggle"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-background/98 border-t border-border px-4 py-6 space-y-4">
          {NAV_LINKS.map((link) =>
            link.href.startsWith("/#") ? (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left text-sm font-semibold tracking-widest text-muted-foreground hover:text-primary transition-colors py-2"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setOpen(false)}
                className="block text-sm font-semibold tracking-widest text-muted-foreground hover:text-primary transition-colors py-2"
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ),
          )}
          <a
            href="https://wa.me/5804125828010?text=Hola!%20Vi%20tu%20página%20y%20me%20interesa%20un%20corte%20💈"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-primary text-primary-foreground px-4 py-3 rounded text-center text-sm font-bold tracking-widest"
            data-ocid="nav.primary_button"
          >
            RESERVAR AHORA
          </a>
        </div>
      )}
    </header>
  );
}
