// Link bookmarks management using localStorage (frontend-only persistence)
import { useCallback, useEffect, useState } from "react";

export interface SavedLink {
  id: string;
  title: string;
  url: string;
  clientName: string; // "Mis enlaces" or a client name
  notes: string;
  createdAt: number; // Date.now()
}

const STORAGE_KEY = "crear_y_crecer_links";

function loadLinks(): SavedLink[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as SavedLink[];
  } catch {
    // ignore
  }
  return [];
}

function saveLinks(links: SavedLink[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
}

export function useLinks() {
  const [links, setLinks] = useState<SavedLink[]>(loadLinks);

  const addOrUpdateLink = useCallback((link: SavedLink) => {
    setLinks((prev) => {
      const exists = prev.findIndex((l) => l.id === link.id);
      const updated =
        exists >= 0
          ? prev.map((l) => (l.id === link.id ? link : l))
          : [...prev, link];
      saveLinks(updated);
      return updated;
    });
  }, []);

  const deleteLink = useCallback((id: string) => {
    setLinks((prev) => {
      const updated = prev.filter((l) => l.id !== id);
      saveLinks(updated);
      return updated;
    });
  }, []);

  // Sync from localStorage on mount
  useEffect(() => {
    setLinks(loadLinks());
  }, []);

  return { links, addOrUpdateLink, deleteLink };
}
