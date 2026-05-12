import type { MealizeTheme } from "@/stores/mealize-ui-store";

import { mealizeAuthBrand as B, MEALIZE_AUTH_SIGN_IN, MEALIZE_AUTH_SIGN_UP } from "./mealize-auth-brand-colors";

export type MealizeAuthFlow = "sign-in" | "sign-up";

const lightSignUpElements = {
  rootBox: "w-full max-w-[420px] mx-auto",
  cardBox: "shadow-none bg-white",
  card: `rounded-xl border border-[${B.signUp.fillLight}]/20 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)_inset,0_16px_48px_-12px_rgba(15,23,42,0.1)]`,
  header: "bg-white",
  scrollBox: "bg-white",
  headerTitle: "text-xl font-semibold tracking-tight text-zinc-900",
  headerSubtitle: "text-[#4a756c]",
  socialButtonsBlockButton: `border border-[${B.signUp.fillLight}]/25 bg-white text-zinc-800 transition-colors hover:border-[${B.signUp.fillLight}]/45 hover:bg-[${B.signUp.fillLight}]/[0.06]`,
  socialButtonsBlockButtonText: "font-medium text-zinc-900",
  dividerLine: `bg-[${B.signUp.fillLight}]/20`,
  dividerText: `text-xs uppercase tracking-wider text-[${B.signUp.inkOnLight}]/80`,
  formFieldLabel: "text-sm font-medium text-[#3d665c]",
  formFieldInput: `border-[${B.signUp.fillLight}]/25 bg-white text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-[${B.signUp.fillLight}]/30`,
  formFieldInputShowPasswordButton: `text-[#4a756c] hover:text-[${B.signUp.fillLight}]`,
  formButtonPrimary: `bg-[${B.signUp.fillLight}] font-bold text-white shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_8px_28px_-8px_rgba(180,83,9,0.45)] hover:bg-[${B.signUp.fillLightHover}]`,
  formButtonReset: `text-[#4a756c] hover:text-[${B.signUp.fillLight}]`,
  footer: `rounded-b-xl border-x border-b border-[${B.signUp.fillLight}]/20 border-t border-t-[${B.signUp.fillLight}]/12 bg-white !bg-white text-zinc-600 shadow-none`,
  footerAction: "text-zinc-700",
  footerActionText: "text-zinc-700",
  footerActionLink: `font-medium text-[${B.signIn.inkOnLight}] underline-offset-4 hover:text-[${B.signIn.inkOnLightHover}] hover:underline`,
  identityPreviewText: "text-zinc-800",
  identityPreviewEditButton: `text-[#4a756c] hover:text-[${B.signUp.fillLight}]`,
  formFieldSuccessText: `text-[${B.signUp.mutedOnLight}]`,
  formFieldErrorText: "text-red-600",
  alertText: "text-zinc-700",
  otpCodeFieldInput: `border-[${B.signUp.fillLight}]/25 bg-white text-zinc-900 focus:ring-[${B.signUp.fillLight}]/30`,
};

const lightSignInElements = {
  rootBox: "w-full max-w-[420px] mx-auto",
  cardBox: "shadow-none bg-white",
  card: `rounded-xl border border-[${B.signIn.fillLight}]/20 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)_inset,0_16px_48px_-12px_rgba(15,23,42,0.1)]`,
  header: "bg-white",
  scrollBox: "bg-white",
  headerTitle: "text-xl font-semibold tracking-tight text-zinc-900",
  headerSubtitle: "text-[#4a756c]",
  socialButtonsBlockButton: `border border-[${B.signIn.fillLight}]/25 bg-white text-zinc-800 transition-colors hover:border-[${B.signIn.fillLight}]/45 hover:bg-[${B.signIn.fillLight}]/[0.06]`,
  socialButtonsBlockButtonText: "font-medium text-zinc-900",
  dividerLine: `bg-[${B.signIn.fillLight}]/20`,
  dividerText: `text-xs uppercase tracking-wider text-[${B.signIn.inkOnLight}]/80`,
  formFieldLabel: "text-sm font-medium text-[#3d665c]",
  formFieldInput: `border-[${B.signIn.fillLight}]/25 bg-white text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-[${B.signIn.fillLight}]/30`,
  formFieldInputShowPasswordButton: `text-[#4a756c] hover:text-[${B.signIn.fillLight}]`,
  formButtonPrimary: `bg-[${B.signIn.fillLight}] font-bold text-white shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_8px_28px_-8px_rgba(10,77,66,0.45)] hover:bg-[${B.signIn.fillLightHover}]`,
  formButtonReset: `text-[#4a756c] hover:text-[${B.signIn.fillLight}]`,
  footer: `rounded-b-xl border-x border-b border-[${B.signIn.fillLight}]/20 border-t border-t-[${B.signIn.fillLight}]/12 bg-white !bg-white text-zinc-600 shadow-none`,
  footerAction: "text-zinc-700",
  footerActionText: "text-zinc-700",
  footerActionLink: `font-medium text-[${B.signUp.inkOnLight}] underline-offset-4 hover:text-[${B.signUp.inkOnLightHover}] hover:underline`,
  identityPreviewText: "text-zinc-800",
  identityPreviewEditButton: `text-[#4a756c] hover:text-[${B.signIn.fillLight}]`,
  formFieldSuccessText: `text-[${B.signIn.mutedOnLight}]`,
  formFieldErrorText: "text-red-600",
  alertText: "text-zinc-700",
  otpCodeFieldInput: `border-[${B.signIn.fillLight}]/25 bg-white text-zinc-900 focus:ring-[${B.signIn.fillLight}]/30`,
};

const darkSignUpElements = {
  rootBox: "w-full max-w-[420px] mx-auto",
  cardBox: "shadow-none bg-zinc-900",
  card:
    "rounded-xl border border-white/10 bg-zinc-900 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_16px_48px_-12px_rgba(0,0,0,0.45)]",
  header: "bg-zinc-900",
  scrollBox: "bg-zinc-900",
  headerTitle: "text-xl font-semibold tracking-tight text-zinc-50",
  headerSubtitle: "text-zinc-400",
  socialButtonsBlockButton: `border border-white/15 bg-zinc-800/90 text-zinc-100 transition-colors hover:border-[${B.signUp.fillDark}]/50 hover:bg-zinc-800`,
  socialButtonsBlockButtonText: "font-medium text-zinc-100",
  dividerLine: `bg-[${B.signUp.fillDark}]/35`,
  dividerText: `text-xs uppercase tracking-wider text-[${B.dark.signUpLink}]/90`,
  formFieldLabel: "text-sm font-medium text-zinc-300",
  formFieldInput: `border-white/15 bg-zinc-950 text-zinc-50 placeholder:text-zinc-500 focus:ring-2 focus:ring-[${B.signUp.fillDark}]/40`,
  formFieldInputShowPasswordButton: `text-zinc-400 hover:text-[${B.dark.signUpLink}]`,
  formButtonPrimary: `bg-[${B.signUp.fillDark}] font-bold text-black shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_8px_28px_-8px_rgba(240,201,74,0.45)] hover:bg-[${B.signUp.fillDarkHover}]`,
  formButtonReset: `text-zinc-400 hover:text-[${B.dark.signUpLink}]`,
  footer:
    "rounded-b-xl border-x border-b border-white/10 border-t border-white/5 bg-zinc-900 !bg-zinc-900 text-zinc-400 shadow-none",
  footerAction: "text-zinc-300",
  footerActionText: "text-zinc-300",
  footerActionLink: `font-medium text-[${B.dark.signInLink}] underline-offset-4 hover:text-[${B.dark.signInLinkHover}] hover:underline`,
  identityPreviewText: "text-zinc-200",
  identityPreviewEditButton: `text-zinc-400 hover:text-[${B.dark.signUpLink}]`,
  formFieldSuccessText: `text-[${B.dark.signUpLink}]`,
  formFieldErrorText: "text-red-400",
  alertText: "text-zinc-300",
  otpCodeFieldInput: `border-white/15 bg-zinc-950 text-zinc-50 focus:ring-[${B.signUp.fillDark}]/40`,
};

const darkSignInElements = {
  rootBox: "w-full max-w-[420px] mx-auto",
  cardBox: "shadow-none bg-zinc-900",
  card:
    "rounded-xl border border-white/10 bg-zinc-900 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_16px_48px_-12px_rgba(0,0,0,0.45)]",
  header: "bg-zinc-900",
  scrollBox: "bg-zinc-900",
  headerTitle: "text-xl font-semibold tracking-tight text-zinc-50",
  headerSubtitle: "text-zinc-400",
  socialButtonsBlockButton: `border border-white/15 bg-zinc-800/90 text-zinc-100 transition-colors hover:border-[${B.signIn.fillDark}]/50 hover:bg-zinc-800`,
  socialButtonsBlockButtonText: "font-medium text-zinc-100",
  dividerLine: `bg-[${B.signIn.fillDark}]/35`,
  dividerText: `text-xs uppercase tracking-wider text-[${B.dark.signInLink}]/90`,
  formFieldLabel: "text-sm font-medium text-zinc-300",
  formFieldInput: `border-white/15 bg-zinc-950 text-zinc-50 placeholder:text-zinc-500 focus:ring-2 focus:ring-[${B.signIn.fillDark}]/40`,
  formFieldInputShowPasswordButton: `text-zinc-400 hover:text-[${B.dark.signInLink}]`,
  formButtonPrimary: `bg-[${B.signIn.fillDark}] font-bold text-black shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_8px_28px_-8px_rgba(61,184,159,0.45)] hover:bg-[${B.signIn.fillDarkHover}]`,
  formButtonReset: `text-zinc-400 hover:text-[${B.dark.signInLink}]`,
  footer:
    "rounded-b-xl border-x border-b border-white/10 border-t border-white/5 bg-zinc-900 !bg-zinc-900 text-zinc-400 shadow-none",
  footerAction: "text-zinc-300",
  footerActionText: "text-zinc-300",
  footerActionLink: `font-medium text-[${B.dark.signUpLink}] underline-offset-4 hover:text-[${B.dark.signUpLinkHover}] hover:underline`,
  identityPreviewText: "text-zinc-200",
  identityPreviewEditButton: `text-zinc-400 hover:text-[${B.dark.signInLink}]`,
  formFieldSuccessText: `text-[${B.dark.signInLink}]`,
  formFieldErrorText: "text-red-400",
  alertText: "text-zinc-300",
  otpCodeFieldInput: `border-white/15 bg-zinc-950 text-zinc-50 focus:ring-[${B.signIn.fillDark}]/40`,
};

const lightSignUpVariables = {
  colorPrimary: MEALIZE_AUTH_SIGN_UP,
  colorTextOnPrimaryBackground: "#ffffff",
  colorBackground: "#ffffff",
  colorInputBackground: "#ffffff",
  colorInputText: "#171717",
  colorText: "#171717",
  colorTextSecondary: "#4a756c",
  colorNeutral: "#f5ecd6",
  colorShimmer: "#fef6e7",
  colorDanger: "#dc2626",
  borderRadius: "0.625rem",
  fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
  fontFamilyButtons: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
};

const lightSignInVariables = {
  colorPrimary: MEALIZE_AUTH_SIGN_IN,
  colorTextOnPrimaryBackground: "#ffffff",
  colorBackground: "#ffffff",
  colorInputBackground: "#ffffff",
  colorInputText: "#171717",
  colorText: "#171717",
  colorTextSecondary: "#4a756c",
  colorNeutral: "#d1ebe6",
  colorShimmer: "#e8f5f2",
  colorDanger: "#dc2626",
  borderRadius: "0.625rem",
  fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
  fontFamilyButtons: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
};

const darkSignUpVariables = {
  colorPrimary: B.signUp.fillDark,
  colorTextOnPrimaryBackground: "#000000",
  colorBackground: "#09090b",
  colorInputBackground: "#18181b",
  colorInputText: "#fafafa",
  colorText: "#fafafa",
  colorTextSecondary: "#a1a1aa",
  colorNeutral: "#3f3f46",
  colorShimmer: "#27272a",
  colorDanger: "#f87171",
  borderRadius: "0.625rem",
  fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
  fontFamilyButtons: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
};

const darkSignInVariables = {
  colorPrimary: B.signIn.fillDark,
  colorTextOnPrimaryBackground: "#000000",
  colorBackground: "#09090b",
  colorInputBackground: "#18181b",
  colorInputText: "#fafafa",
  colorText: "#fafafa",
  colorTextSecondary: "#a1a1aa",
  colorNeutral: "#3f3f46",
  colorShimmer: "#27272a",
  colorDanger: "#f87171",
  borderRadius: "0.625rem",
  fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
  fontFamilyButtons: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
};

export function getMealizeClerkAuthAppearance(theme: MealizeTheme, flow: MealizeAuthFlow) {
  if (theme === "dark") {
    return {
      variables: flow === "sign-up" ? darkSignUpVariables : darkSignInVariables,
      elements: flow === "sign-up" ? darkSignUpElements : darkSignInElements,
    };
  }
  return {
    variables: flow === "sign-up" ? lightSignUpVariables : lightSignInVariables,
    elements: flow === "sign-up" ? lightSignUpElements : lightSignInElements,
  };
}

/** @deprecated Prefer `getMealizeClerkAuthAppearance(theme, flow)`. */
export const mealizeClerkAuthAppearanceLight = {
  variables: lightSignUpVariables,
  elements: lightSignUpElements,
};

export const mealizeClerkAuthAppearance = mealizeClerkAuthAppearanceLight;
