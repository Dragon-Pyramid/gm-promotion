export const SITE_URL = "https://gymmaster.com.ar";
export const SITE_NAME = "Gym Master";
export const SOCIAL_PREVIEW_IMAGE =
  "/images/social/gym-master-social-preview.png";

export function getSocialPreviewAlt(locale: string) {
  return locale === "es"
    ? "Gym Master - Nace una nueva era para los gimnasios"
    : "Gym Master - A new era for gyms begins";
}

export const LOCALE_PATHS = {
  es: "/es",
  en: "/en"
} as const;

export const DEMO_PATHS = {
  es: "/es/demo",
  en: "/en/demo"
} as const;

export function getOpenGraphLocale(locale: string) {
  return locale === "es" ? "es_AR" : "en_US";
}

export function getAlternateOpenGraphLocale(locale: string) {
  return locale === "es" ? ["en_US"] : ["es_AR"];
}
