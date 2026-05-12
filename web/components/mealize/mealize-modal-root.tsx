"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import { useMealizeModalStore } from "@/stores/mealize-modal-store";

/** Portal target for legacy-style modals (replaces Redux `setModalMount`). */
export function MealizeModalRoot() {
  const [mounted, setMounted] = useState(false);
  const node = useMealizeModalStore((s) => s.node);
  const close = useMealizeModalStore((s) => s.close);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !node) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center bg-black/50 p-4"
      role="presentation"
      onClick={() => close()}
    >
      <div
        role="dialog"
        className="max-h-[90vh] max-w-lg overflow-auto rounded-xl bg-white p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {node}
      </div>
    </div>,
    document.body,
  );
}
