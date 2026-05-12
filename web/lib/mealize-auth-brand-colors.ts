/**
 * Sign-up (amber) and sign-in (teal) colors tuned for contrast (WCAG AA targets).
 * Light UI: white copy on darker fills; dark UI: black copy on lighter fills.
 * Links on white use darker inks; accents on zinc use brighter hues.
 */
export const mealizeAuthBrand = {
  signUp: {
    fillLight: "#b45309",
    fillLightHover: "#92400e",
    fillDark: "#f0c94a",
    fillDarkHover: "#e0b838",
    inkOnLight: "#92400e",
    inkOnLightHover: "#783a0b",
    mutedOnLight: "#74460f",
  },
  signIn: {
    fillLight: "#0a4d42",
    fillLightHover: "#062f29",
    fillDark: "#3db89f",
    fillDarkHover: "#2d8a7a",
    inkOnLight: "#0a4d42",
    inkOnLightHover: "#052722",
    mutedOnLight: "#0d5c4f",
  },
  dark: {
    signUpLink: "#fcd34d",
    signUpLinkHover: "#fde68a",
    signInLink: "#5eead4",
    signInLinkHover: "#99faf0",
  },
} as const;

/** Primary fill (light UI) — same as `mealizeAuthBrand.signUp.fillLight`. */
export const MEALIZE_AUTH_SIGN_UP = mealizeAuthBrand.signUp.fillLight;
/** Primary fill (light UI) — same as `mealizeAuthBrand.signIn.fillLight`. */
export const MEALIZE_AUTH_SIGN_IN = mealizeAuthBrand.signIn.fillLight;
