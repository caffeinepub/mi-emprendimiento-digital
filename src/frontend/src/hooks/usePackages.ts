// Package management using localStorage (frontend-only persistence)
import { useCallback, useEffect, useState } from "react";

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  maintenancePrice: number;
  features: string[];
  isPopular: boolean;
  active: boolean;
  updatedAt: number;
}

const STORAGE_KEY = "crear_y_crecer_packages";

const DEFAULT_PACKAGES: ServicePackage[] = [
  {
    id: "basico",
    name: "Básico",
    description:
      "Ideal para emprendedores que quieren iniciar su presencia digital con lo esencial.",
    price: 35,
    maintenancePrice: 10,
    features: [
      "Página de inicio",
      "Sección de contacto",
      "Botón WhatsApp",
      "Diseño profesional",
      "Enlace compartible",
    ],
    isPopular: false,
    active: true,
    updatedAt: Date.now(),
  },
  {
    id: "estandar",
    name: "Estándar",
    description:
      "El más elegido. Perfecto para negocios que quieren destacar y crecer en línea.",
    price: 75,
    maintenancePrice: 20,
    features: [
      "Todo lo del Básico",
      "Blog con categorías",
      "Catálogo de productos",
      "Panel de administración",
      "Hasta 10 artículos/productos",
    ],
    isPopular: true,
    active: true,
    updatedAt: Date.now(),
  },
  {
    id: "premium",
    name: "Premium",
    description:
      "Para negocios que quieren la solución más completa y personalizada.",
    price: 150,
    maintenancePrice: 30,
    features: [
      "Todo lo del Estándar",
      "Secciones ilimitadas",
      "Testimonios",
      "Formulario de contacto",
      "Soporte prioritario",
      "Personalización avanzada",
    ],
    isPopular: false,
    active: true,
    updatedAt: Date.now(),
  },
];

function loadPackages(): ServicePackage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as ServicePackage[];
  } catch {
    // ignore
  }
  return DEFAULT_PACKAGES;
}

function savePackages(packages: ServicePackage[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(packages));
}

export function usePackages() {
  const [packages, setPackages] = useState<ServicePackage[]>(loadPackages);

  const activePackages = packages.filter((p) => p.active);

  const upsertPackage = useCallback((pkg: ServicePackage) => {
    setPackages((prev) => {
      const exists = prev.findIndex((p) => p.id === pkg.id);
      const updated =
        exists >= 0
          ? prev.map((p) => (p.id === pkg.id ? pkg : p))
          : [...prev, pkg];
      savePackages(updated);
      return updated;
    });
  }, []);

  const deletePackage = useCallback((id: string) => {
    setPackages((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      savePackages(updated);
      return updated;
    });
  }, []);

  const toggleActive = useCallback((id: string) => {
    setPackages((prev) => {
      const updated = prev.map((p) =>
        p.id === id ? { ...p, active: !p.active, updatedAt: Date.now() } : p,
      );
      savePackages(updated);
      return updated;
    });
  }, []);

  // Sync from localStorage on mount (in case another tab updated)
  useEffect(() => {
    setPackages(loadPackages());
  }, []);

  return {
    packages,
    activePackages,
    upsertPackage,
    deletePackage,
    toggleActive,
  };
}
