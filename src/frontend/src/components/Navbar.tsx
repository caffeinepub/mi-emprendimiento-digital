import { Link, useRouter } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/#servicios", subtitle: "Negocios & Creadores" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre Mí", href: "/#sobre-mi" },
  { label: "Contacto", href: "/#contacto" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (currentPath === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.navigate({ to: "/" }).then(() => {
          setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
          }, 200);
        });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy shadow-lg" : "bg-navy"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" data-ocid="nav.link">
            <div className="w-9 h-9 rounded-full bg-orange flex items-center justify-center">
              <span className="text-white font-heading font-bold text-sm">
                CC
              </span>
            </div>
            <span className="font-heading font-bold text-white text-lg tracking-wide">
              Crear y Crecer
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.href.startsWith("/#") ? (
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className="flex flex-col items-center text-white/90 hover:text-orange transition-colors"
                    data-ocid="nav.link"
                  >
                    <span className="text-sm font-medium flex items-center gap-1">
                      {link.label}
                      {link.subtitle && <ChevronDown className="w-3 h-3" />}
                    </span>
                    {link.subtitle && (
                      <span className="text-xs text-white/50">
                        {link.subtitle}
                      </span>
                    )}
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className="text-sm font-medium text-white/90 hover:text-orange transition-colors"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => handleNavClick("/#contacto")}
                className="bg-orange text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-orange/90 transition-colors"
                data-ocid="nav.primary_button"
              >
                Consulta Gratis
              </button>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy border-t border-white/10"
          >
            <ul className="flex flex-col px-4 py-4 gap-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/#") ? (
                    <button
                      type="button"
                      onClick={() => handleNavClick(link.href)}
                      className="text-white/90 text-sm font-medium hover:text-orange transition-colors w-full text-left"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-white/90 text-sm font-medium hover:text-orange transition-colors block"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick("/#contacto")}
                  className="bg-orange text-white text-sm font-semibold px-5 py-2 rounded-full w-full"
                >
                  Consulta Gratis
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
