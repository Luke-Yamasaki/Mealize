"use client";

import { useEffect, useId, useLayoutEffect, useState } from "react";

/** White mark — same path as navbar `MealizeNavLogo`, 200px-wide base for splash scaling. */
function SplashWhiteMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 45 38.412"
      className={className}
      width={200}
      height={171}
      aria-hidden
    >
      <path
        fill="#ffffff"
        d="M41.491,20.447,39.439,22.5,24.254,37.684a2.48,2.48,0,0,1-3.506,0l0,0L3.509,20.447a11.976,11.976,0,0,1,0-16.936l0,0A11.976,11.976,0,0,1,18.663,2.04a2.475,2.475,0,0,1,1.08,1.82l0,.024a2.483,2.483,0,0,1-.828,2.095L16.639,7.992a9.326,9.326,0,0,0-3.067,8.122L14.648,25.1a1.571,1.571,0,0,0,1.56,1.4h.162a1.643,1.643,0,0,0,1.615-1.671c0-.017,0-.034,0-.051L17.337,15.9a1.726,1.726,0,0,1,1.618-1.827c.034,0,.069,0,.1,0a1.689,1.689,0,0,1,1.182.491,1.8,1.8,0,0,1,.538,1.177l.109,9.2A1.608,1.608,0,0,0,22.5,26.5a1.645,1.645,0,0,0,1.613-1.561l.215-9.2a1.724,1.724,0,0,1,1.722-1.668,1.759,1.759,0,0,1,1.723,1.794c0,.012,0,.024,0,.036l-.647,8.874a1.612,1.612,0,0,0,1.5,1.718c.039,0,.077,0,.116,0a1.61,1.61,0,0,0,1.062-.4,1.451,1.451,0,0,0,.5-1l1.131-8.983a9.272,9.272,0,0,0-3.067-8.122L26.083,5.979a2.48,2.48,0,0,1-.828-2.092l0-.024a2.489,2.489,0,0,1,1.091-1.83A11.977,11.977,0,0,1,41.493,20.446l0,0"
      />
    </svg>
  );
}

/** Total splash length; keep in sync with `mealize-splash-v2-panel` duration in `globals.css`. */
const SPLASH_DURATION_S = 6.5;
const SPLASH_MS = Math.round(SPLASH_DURATION_S * 1000);
const SPLASH_EASE = "cubic-bezier(0.45, 0, 0.2, 1)";
/** Splash mark layout size (must match `SplashWhiteMark` 200×171). */
const SPLASH_MARK_W_PX = 200;
const SPLASH_MARK_H_PX = 171;

/** Optical nudge vs bounding-box center at end scale (vertical only unless needed). */
const SPLASH_CLUSTER_END_OY_NUDGE_PX = 1;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function measureNavbarLogoOffset(
  layoutInnerW: number,
  layoutInnerH: number,
): { ox: number; oy: number } | null {
  const el =
    document.getElementById("mealize-splash-logo-target") ??
    document.querySelector<HTMLElement>("[data-mealize-splash-logo-target]");
  if (!el) return null;
  const r = el.getBoundingClientRect();
  if (r.width < 4 || r.height < 4) return null;
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  return {
    ox: cx - layoutInnerW / 2,
    oy: cy - layoutInnerH / 2,
  };
}

/**
 * Fallback when measure is null — guest `/welcome`: `px-4` / `sm:px-6` / `lg:px-10`; session `/welcome`: `px-6`; else `px-[50px]`.
 */
function estimateNavbarLogoOffset(layoutInnerW: number, layoutInnerH: number): { ox: number; oy: number } {
  const welcome =
    typeof window !== "undefined" &&
    (window.location.pathname === "/welcome" || window.location.pathname.endsWith("/welcome"));
  let logoCenterX: number;
  if (welcome) {
    if (layoutInnerW >= 1024) logoCenterX = 40 + 22.5;
    else if (layoutInnerW >= 640) logoCenterX = 24 + 22.5;
    else {
      const guestActions = document.querySelector('a[href="/sign-up"]');
      logoCenterX = guestActions ? 16 + 22.5 : 24 + 22.5;
    }
  } else {
    logoCenterX = 50 + 22.5;
  }
  const logoCenterY = 25;
  return {
    ox: logoCenterX - layoutInnerW / 2,
    oy: logoCenterY - layoutInnerH / 2,
  };
}

/** Pixel translate only — mark is pre-positioned so box center = layout viewport center at translate (0,0). */
function buildClusterKeyframesCss(name: string, endOx: number, endOy: number, bleedScale: number): string {
  const tr = (dx: number, dy: number) => `translate3d(${dx}px, ${dy}px, 0)`;
  return `
@keyframes ${name} {
  0% { transform: ${tr(0, 0)} scale3d(${bleedScale}, ${bleedScale}, 1); opacity: 1; }
  25% { transform: ${tr(0, 0)} scale3d(1, 1, 1); opacity: 1; }
  62% { transform: ${tr(endOx, endOy)} scale3d(0.225, 0.225, 1); opacity: 1; }
  76% { transform: ${tr(endOx, endOy)} scale3d(0.225, 0.225, 1); opacity: 0; }
  100% { transform: ${tr(endOx, endOy)} scale3d(0.225, 0.225, 1); opacity: 0; }
}
`.trim();
}

/**
 * Phases (~6.5s): bleed→center (0–25%, ~1.6s), fly + strip (25–62%, ~2.4s), fade (62–76%).
 * Arms in `useLayoutEffect` using measure or an immediate estimate — no `queueMicrotask` / multi-frame
 * RAF wait, so motion starts in the first painted frame after mount.
 */
export function MealizeWelcomeSplash() {
  const uid = useId().replace(/:/g, "");
  const kfName = `mealizeSplashCluster_${uid}`;

  const [phase, setPhase] = useState<"play" | "off">("play");
  const [arms, setArms] = useState<{
    ox: number;
    oy: number;
    bleed: number;
    layoutInnerW: number;
    layoutInnerH: number;
  } | null>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      queueMicrotask(() => setPhase("off"));
      return;
    }
    const layoutInnerW = window.innerWidth;
    const layoutInnerH = window.innerHeight;
    const bleed = layoutInnerW <= 640 ? 14 : 16;
    const m = measureNavbarLogoOffset(layoutInnerW, layoutInnerH);
    const base = m ?? estimateNavbarLogoOffset(layoutInnerW, layoutInnerH);
    // Arm splash in layout pass (before paint); DOM measure is synchronous here.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional sync arm
    setArms({
      ox: base.ox,
      oy: base.oy + SPLASH_CLUSTER_END_OY_NUDGE_PX,
      bleed,
      layoutInnerW,
      layoutInnerH,
    });
  }, []);

  useEffect(() => {
    if (phase !== "play" || !arms) return;
    const id = window.setTimeout(() => {
      setPhase("off");
    }, SPLASH_MS);
    return () => window.clearTimeout(id);
  }, [phase, arms]);

  if (phase === "off") return null;

  const clusterAnim = arms ? `${kfName} ${SPLASH_DURATION_S}s ${SPLASH_EASE} forwards` : "none";

  return (
    <div
      className={`mealize-splash-root${arms ? " mealize-splash-root--armed" : ""}`}
      role="presentation"
      aria-hidden
    >
      {arms ? (
        <style
          dangerouslySetInnerHTML={{
            __html: buildClusterKeyframesCss(kfName, arms.ox, arms.oy, arms.bleed),
          }}
        />
      ) : null}
      <div className="mealize-splash-root__panel" />
      {arms ? (
        <div
          className="mealize-splash-root__markWrap"
          style={{
            left: `${arms.layoutInnerW / 2 - SPLASH_MARK_W_PX / 2}px`,
            top: `${arms.layoutInnerH / 2 - SPLASH_MARK_H_PX / 2}px`,
            width: SPLASH_MARK_W_PX,
            height: SPLASH_MARK_H_PX,
            animation: clusterAnim,
            opacity: 1,
          }}
        >
          <SplashWhiteMark className="block size-full" />
        </div>
      ) : null}
    </div>
  );
}
