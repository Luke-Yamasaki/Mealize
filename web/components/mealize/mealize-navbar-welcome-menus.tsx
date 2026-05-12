"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

import { MEALIZE_WIKI_BASE_PATH, WIKI_PAGE_META, WIKI_SLUGS } from "@/lib/mealize-wiki";

const WIKI = "https://github.com/Luke-Yamasaki/Mealize/wiki";
const REPO = "https://github.com/Luke-Yamasaki/Mealize";

const PANEL_W_CLASS = "w-[min(92vw,24rem)]";

const STACK_DOCS: { label: string; href: string }[] = [
  { label: "Next.js", href: "https://nextjs.org/docs" },
  { label: "React", href: "https://react.dev" },
  { label: "tRPC", href: "https://trpc.io/docs" },
  { label: "Prisma", href: "https://www.prisma.io/docs" },
  { label: "PostgreSQL", href: "https://www.postgresql.org/docs/current/" },
  { label: "AWS S3", href: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html" },
];

type TabId = "about" | "docs" | "stack" | "blog" | "resources";

const TABS: { id: TabId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "docs", label: "Docs" },
  { id: "stack", label: "Stack" },
  { id: "blog", label: "Blog" },
  { id: "resources", label: "Resources" },
];

type MenuItem =
  | { type: "link"; label: string; href: string; external?: boolean; description?: string }
  | { type: "divider" };

function MegaLink({
  item,
  onNavigate,
}: {
  item: Extract<MenuItem, { type: "link" }>;
  onNavigate: () => void;
}) {
  const { label, href, external, description } = item;
  const className =
    "group rounded-lg px-2 py-1.5 text-left transition hover:bg-zinc-100 focus-visible:bg-zinc-100 focus-visible:outline-none dark:hover:bg-zinc-800/90 dark:focus-visible:bg-zinc-800/90";
  const titleCls = "text-sm font-semibold text-zinc-900 dark:text-zinc-100";
  const descCls = "mt-0.5 block text-xs font-medium leading-snug text-zinc-500 dark:text-zinc-400";

  const inner = (
    <>
      <span className={titleCls}>{label}</span>
      {description ? <span className={descCls}>{description}</span> : null}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onNavigate}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} prefetch={false} className={className} onClick={onNavigate}>
      {inner}
    </Link>
  );
}

function LinkColumn({ items, onNavigate }: { items: MenuItem[]; onNavigate: () => void }) {
  return (
    <nav className="flex min-w-0 flex-col gap-0.5" aria-label="Section links">
      {items.map((item, i) => {
        if (item.type === "divider") {
          return <div key={`d-${i}`} className="my-1.5 border-t border-zinc-200 dark:border-zinc-600" />;
        }
        return <MegaLink key={`${item.label}-${i}`} item={item} onNavigate={onNavigate} />;
      })}
    </nav>
  );
}

function MegaMenuSlide({
  items,
  leftTitle,
  onNavigate,
}: {
  items: MenuItem[];
  leftTitle: string;
  onNavigate: () => void;
}) {
  return (
    <div className="w-full shrink-0 px-3 py-3 sm:px-4 sm:py-3" data-mealize-welcome-slide>
      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
        {leftTitle}
      </p>
      <LinkColumn items={items} onNavigate={onNavigate} />
    </div>
  );
}

function SheetLinkRow({
  item,
  onNavigate,
}: {
  item: Extract<MenuItem, { type: "link" }>;
  onNavigate: () => void;
}) {
  const row =
    "flex w-full flex-col gap-0.5 py-2.5 text-left active:bg-zinc-100/80 dark:active:bg-zinc-800/80";
  const title = "text-[15px] font-semibold text-zinc-900 dark:text-zinc-100";
  const desc = "text-xs font-medium text-zinc-500 dark:text-zinc-400";

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={row} onClick={onNavigate}>
        <span className={title}>{item.label}</span>
        {item.description ? <span className={desc}>{item.description}</span> : null}
      </a>
    );
  }
  return (
    <Link href={item.href} prefetch={false} className={row} onClick={onNavigate}>
      <span className={title}>{item.label}</span>
      {item.description ? <span className={desc}>{item.description}</span> : null}
    </Link>
  );
}

function AccordionLinks({
  items,
  onNavigate,
  panelId,
}: {
  items: MenuItem[];
  onNavigate: () => void;
  panelId: string;
}) {
  return (
    <div
      id={panelId}
      className="border-t border-zinc-100 bg-zinc-50/50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800/40"
    >
      {items.map((item, i) => {
        if (item.type === "divider") {
          return <hr key={`d-${i}`} className="my-2 border-0 border-t border-zinc-200 dark:border-zinc-600" />;
        }
        return (
          <div
            key={`${item.label}-${i}`}
            className="border-b border-zinc-100/80 last:border-b-0 dark:border-zinc-700/80"
          >
            <SheetLinkRow item={item} onNavigate={onNavigate} />
          </div>
        );
      })}
    </div>
  );
}

function WelcomeNavDrawer({
  open,
  onClose,
  sheetId,
  sections,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  sheetId: string;
  sections: { id: TabId; heading: string; items: MenuItem[] }[];
  footer?: ReactNode;
}) {
  const [expanded, setExpanded] = useState<TabId | null>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) setExpanded(null);
  }, [open]);

  const toggle = useCallback((id: TabId) => {
    setExpanded((cur) => (cur === id ? null : id));
  }, []);

  return (
    <div
      className={`fixed inset-0 z-520 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={`absolute inset-0 top-[50px] bg-black/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        aria-label="Close menu"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
      />
      <div
        id={sheetId}
        role="dialog"
        aria-modal="true"
        aria-label="Welcome navigation"
        className={`absolute top-[50px] right-0 bottom-0 flex w-[min(22rem,calc(100vw-12px))] max-w-[100vw] flex-col rounded-l-2xl border-l border-t border-zinc-200 bg-white shadow-[0_0_48px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] dark:border-zinc-600 dark:bg-zinc-900 dark:shadow-[0_0_48px_-12px_rgba(0,0,0,0.5)] dark:ring-white/10 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-zinc-200 px-4 py-3 pr-2 dark:border-zinc-600">
          <h2 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Menu</h2>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            aria-label="Close"
            onClick={onClose}
          >
            <X className="size-5" strokeWidth={2} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pt-1 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          {sections.map((section) => {
            const isOpen = expanded === section.id;
            const panelId = `${sheetId}-acc-panel-${section.id}`;
            return (
              <div
                key={section.id}
                className="mb-1 rounded-xl border border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-900/80"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-2 px-3 py-3 text-left transition hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  id={`${sheetId}-acc-trigger-${section.id}`}
                  onClick={() => toggle(section.id)}
                >
                  <span className="text-[13px] font-bold uppercase tracking-[0.12em] text-zinc-800 dark:text-zinc-200">
                    {section.heading}
                  </span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-zinc-500 transition-transform duration-200 dark:text-zinc-400 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                {isOpen ? <AccordionLinks items={section.items} onNavigate={onClose} panelId={panelId} /> : null}
              </div>
            );
          })}
        </div>

        {footer ? (
          <div className="shrink-0 border-t border-zinc-200 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] dark:border-zinc-600">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** Center strip for `/welcome` — desktop mega-panel (carousel); mobile / tablet: hamburger + right drawer. */
export function MealizeNavbarWelcomeMenus({ mobileDrawerFooter }: { mobileDrawerFooter?: ReactNode }) {
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [megaOpen, setMegaOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [active, setActive] = useState<TabId>("about");
  const baseId = useId().replace(/:/g, "");
  const sheetId = `${baseId}-welcome-sheet`;

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  }, [cancelClose]);

  const showTab = useCallback(
    (tab: TabId) => {
      cancelClose();
      setActive(tab);
      setMegaOpen(true);
    },
    [cancelClose],
  );

  const onMegaNavigate = useCallback(() => {
    setMegaOpen(false);
  }, []);

  useEffect(() => {
    if (!megaOpen && !sheetOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setSheetOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [megaOpen, sheetOpen]);

  useEffect(() => {
    if (!megaOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (desktopNavRef.current && !desktopNavRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [megaOpen]);

  const activeIndex = TABS.findIndex((t) => t.id === active);

  const aboutItems: MenuItem[] = [
    { type: "link", label: "Mission snapshot", href: "/#about", description: "Why Mealize exists" },
    { type: "link", label: "The challenge", href: "/#challenge", description: "Hunger, waste, context" },
    { type: "link", label: "Approach & diagram", href: "/#approach", description: "Shared workspace" },
    { type: "link", label: "Product wiki (in app)", href: MEALIZE_WIKI_BASE_PATH, description: "Overview & extended docs" },
    { type: "link", label: "GitHub wiki", href: WIKI, external: true, description: "Repository notes" },
  ];

  const docsItems: MenuItem[] = [
    { type: "link", label: "Overview", href: MEALIZE_WIKI_BASE_PATH, description: WIKI_PAGE_META.index.description },
    ...WIKI_SLUGS.map((slug) => ({
      type: "link" as const,
      label: WIKI_PAGE_META[slug].title,
      href: `${MEALIZE_WIKI_BASE_PATH}/${slug}`,
      description: WIKI_PAGE_META[slug].description,
    })),
  ];

  const stackItems: MenuItem[] = STACK_DOCS.map((row) => ({
    type: "link" as const,
    label: row.label,
    href: row.href,
    external: true,
  }));

  const blogItems: MenuItem[] = [
    { type: "link", label: "Field notes", href: "/#blog", description: "Build diary (stub)" },
    { type: "link", label: "Repository activity", href: REPO, external: true, description: "GitHub history" },
    { type: "link", label: "Ideas backlog", href: WIKI, external: true, description: "Wiki specs" },
  ];

  const resourcesCore: MenuItem[] = [
    { type: "link", label: "Product pillars", href: "/#product", description: "Hero + capabilities" },
    { type: "link", label: "Product tour", href: "/#tour", description: "Screens & flow" },
    { type: "link", label: "Get started", href: "/#get-started", description: "Sign up & demos" },
  ];

  const sheetSections = [
    { id: "about" as const, heading: "About", items: aboutItems },
    { id: "docs" as const, heading: "Docs", items: docsItems },
    { id: "stack" as const, heading: "Stack", items: stackItems },
    { id: "blog" as const, heading: "Blog", items: blogItems },
    { id: "resources" as const, heading: "Resources", items: resourcesCore },
  ];

  return (
    <>
      <div className="flex w-full min-w-0 items-center justify-end lg:justify-center">
        <button
          type="button"
          className="flex size-10 shrink-0 items-center justify-center rounded-md bg-white/15 text-white shadow-sm hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden dark:bg-black/10 dark:text-black dark:shadow-none dark:hover:bg-black/15 dark:focus-visible:outline-black"
          aria-expanded={sheetOpen}
          aria-controls={sheetId}
          onClick={() => {
            setSheetOpen((o) => !o);
            setMegaOpen(false);
          }}
        >
          {sheetOpen ? (
            <X className="size-5" strokeWidth={2.25} aria-hidden />
          ) : (
            <Menu className="size-5" strokeWidth={2.25} aria-hidden />
          )}
          <span className="sr-only">{sheetOpen ? "Close menu" : "Open menu"}</span>
        </button>

        <div
          ref={desktopNavRef}
          className="relative hidden min-w-0 lg:block"
          role="navigation"
          aria-label="Welcome page sections"
          onMouseLeave={scheduleClose}
        >
          <div
            className="flex min-w-0 items-center justify-center gap-0.5 overflow-x-auto scrollbar-none sm:gap-1"
            onMouseEnter={cancelClose}
          >
            {TABS.map((tab) => {
              const isActive = megaOpen && active === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`flex shrink-0 items-center gap-0.5 rounded-md px-2 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-sm transition sm:px-2.5 sm:text-xs dark:bg-black/10 dark:text-black dark:shadow-none ${
                    isActive ? "bg-white/25 dark:bg-black/15" : "bg-white/15 hover:bg-white/25 dark:hover:bg-black/15"
                  } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white dark:focus-visible:outline-black`}
                  aria-expanded={isActive}
                  aria-controls={`${baseId}-mega-panel`}
                  id={`${baseId}-tab-${tab.id}`}
                  onMouseEnter={() => showTab(tab.id)}
                  onFocus={() => showTab(tab.id)}
                  onClick={() => showTab(tab.id)}
                >
                  <span className="truncate">{tab.label}</span>
                  <ChevronDown
                    className={`size-3.5 shrink-0 opacity-90 transition duration-200 sm:size-4 ${isActive ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
              );
            })}
          </div>

          {megaOpen ? (
            <div className="absolute left-0 right-0 top-full z-399 h-2" aria-hidden onMouseEnter={cancelClose} />
          ) : null}

          {megaOpen ? (
            <div
              id={`${baseId}-mega-panel`}
              role="region"
              aria-label="Welcome navigation panel"
              className="absolute left-1/2 top-[calc(100%+4px)] z-400 -translate-x-1/2 pt-0"
              onMouseEnter={cancelClose}
            >
              <div
                className={`${PANEL_W_CLASS} overflow-hidden rounded-2xl border border-zinc-200/95 bg-white shadow-[0_24px_64px_-12px_rgba(0,0,0,0.2)] ring-1 ring-black/4 dark:border-zinc-600/90 dark:bg-zinc-900 dark:shadow-[0_24px_64px_-12px_rgba(0,0,0,0.55)] dark:ring-white/10`}
              >
                <div
                  className="flex w-[500%] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform"
                  style={{ transform: `translateX(-${activeIndex * 20}%)` }}
                >
                  <div className="w-1/5 min-w-0 shrink-0">
                    <MegaMenuSlide items={aboutItems} leftTitle="About Mealize" onNavigate={onMegaNavigate} />
                  </div>
                  <div className="w-1/5 min-w-0 shrink-0">
                    <MegaMenuSlide items={docsItems} leftTitle="Mealize wiki" onNavigate={onMegaNavigate} />
                  </div>
                  <div className="w-1/5 min-w-0 shrink-0">
                    <MegaMenuSlide items={stackItems} leftTitle="Tech stack" onNavigate={onMegaNavigate} />
                  </div>
                  <div className="w-1/5 min-w-0 shrink-0">
                    <MegaMenuSlide items={blogItems} leftTitle="Writing" onNavigate={onMegaNavigate} />
                  </div>
                  <div className="w-1/5 min-w-0 shrink-0">
                    <MegaMenuSlide items={resourcesCore} leftTitle="On this site" onNavigate={onMegaNavigate} />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <WelcomeNavDrawer
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        sheetId={sheetId}
        sections={sheetSections}
        footer={mobileDrawerFooter}
      />
    </>
  );
}
