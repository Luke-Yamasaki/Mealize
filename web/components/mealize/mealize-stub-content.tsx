import Link from "next/link";

export function MealizeStubContent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="w-full px-6 py-10">
      <Link
        href="/"
        className="text-sm font-semibold text-[#0f766e] underline decoration-2 underline-offset-2 hover:text-[#115e59]"
      >
        ← Back to feed
      </Link>
      <h1 className="mt-6 text-2xl font-black tracking-tight text-zinc-900">{title}</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-600">{description}</p>
    </div>
  );
}
