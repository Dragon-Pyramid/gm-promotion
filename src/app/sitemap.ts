import type {MetadataRoute} from "next";

import {DEMO_PATHS, LOCALE_PATHS, SITE_URL} from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}${LOCALE_PATHS.es}`,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {languages: {es: `${SITE_URL}${LOCALE_PATHS.es}`, en: `${SITE_URL}${LOCALE_PATHS.en}`, "x-default": `${SITE_URL}${LOCALE_PATHS.es}`}}
    },
    {
      url: `${SITE_URL}${LOCALE_PATHS.en}`,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {languages: {es: `${SITE_URL}${LOCALE_PATHS.es}`, en: `${SITE_URL}${LOCALE_PATHS.en}`, "x-default": `${SITE_URL}${LOCALE_PATHS.es}`}}
    },
    {
      url: `${SITE_URL}${DEMO_PATHS.es}`,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {languages: {es: `${SITE_URL}${DEMO_PATHS.es}`, en: `${SITE_URL}${DEMO_PATHS.en}`, "x-default": `${SITE_URL}${DEMO_PATHS.es}`}}
    },
    {
      url: `${SITE_URL}${DEMO_PATHS.en}`,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {languages: {es: `${SITE_URL}${DEMO_PATHS.es}`, en: `${SITE_URL}${DEMO_PATHS.en}`, "x-default": `${SITE_URL}${DEMO_PATHS.es}`}}
    }
  ];
}
