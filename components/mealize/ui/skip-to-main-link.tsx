export function SkipToMainLink({ targetId = "main-content" }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[1000] focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-background focus:shadow-lg focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
    >
      Skip to main content
    </a>
  );
}
