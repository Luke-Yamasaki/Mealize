/** Light auth UI — Mealize green (#28a690, #76d97e) on white / soft mint surfaces. */
export const mealizeClerkAuthAppearance = {
  variables: {
    colorPrimary: "#28a690",
    colorTextOnPrimaryBackground: "#ffffff",
    colorBackground: "#ffffff",
    colorInputBackground: "#ffffff",
    colorInputText: "#171717",
    colorText: "#171717",
    colorTextSecondary: "#4a756c",
    colorNeutral: "#c8e8e0",
    colorShimmer: "#e0f2ed",
    colorDanger: "#dc2626",
    borderRadius: "0.625rem",
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
    fontFamilyButtons: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
  },
  elements: {
    rootBox: "w-full max-w-[420px] mx-auto",
    cardBox: "shadow-none bg-white",
    card:
      "rounded-xl border border-[#28a690]/20 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)_inset,0_16px_48px_-12px_rgba(15,23,42,0.1)]",
    header: "bg-white",
    scrollBox: "bg-white",
    headerTitle: "text-xl font-semibold tracking-tight text-zinc-900",
    headerSubtitle: "text-[#4a756c]",
    socialButtonsBlockButton:
      "border border-[#28a690]/25 bg-white text-zinc-800 transition-colors hover:border-[#28a690]/45 hover:bg-[#28a690]/[0.06]",
    socialButtonsBlockButtonText: "font-medium text-zinc-900",
    dividerLine: "bg-[#28a690]/20",
    dividerText: "text-xs uppercase tracking-wider text-[#28a690]/75",
    formFieldLabel: "text-sm font-medium text-[#3d665c]",
    formFieldInput:
      "border-[#28a690]/25 bg-white text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-[#28a690]/30",
    formFieldInputShowPasswordButton: "text-[#4a756c] hover:text-[#28a690]",
    formButtonPrimary:
      "bg-[#28a690] font-bold text-white shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_8px_28px_-8px_rgba(40,166,144,0.45)] hover:bg-[#22967f]",
    formButtonReset: "text-[#4a756c] hover:text-[#28a690]",
    footer:
      "rounded-b-xl border-x border-b border-[#28a690]/20 border-t border-t-[#28a690]/12 bg-white !bg-white text-zinc-600 shadow-none",
    footerAction: "text-zinc-700",
    footerActionText: "text-zinc-700",
    footerActionLink:
      "font-medium text-[#28a690] underline-offset-4 hover:text-[#22967f] hover:underline",
    identityPreviewText: "text-zinc-800",
    identityPreviewEditButton: "text-[#4a756c] hover:text-[#28a690]",
    formFieldSuccessText: "text-[#1a6b5c]",
    formFieldErrorText: "text-red-600",
    alertText: "text-zinc-700",
    otpCodeFieldInput:
      "border-[#28a690]/25 bg-white text-zinc-900 focus:ring-[#28a690]/30",
  },
};
