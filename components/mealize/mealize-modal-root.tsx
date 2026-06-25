"use client";

import { createPortal } from "react-dom";
import { useSyncExternalStore } from "react";

import { useMealizeModalStore } from "@/stores/mealize-modal-store";

function subscribe() {
  return () => {};
}

/** Portal target for legacy-style modals (replaces Redux `setModalMount`). */
export function MealizeModalRoot() {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const node = useMealizeModalStore((s) => s.node);
  const close = useMealizeModalStore((s) => s.close);

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
