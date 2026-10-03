import type {Metadata} from "next";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getMessages, getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import type {ReactNode} from "react";

import {LanguageSwitcher} from "@/components/navigation/LanguageSwitcher";
import {routing} from "@/i18n/routing";
import {
  getAlternateOpenGraphLocale,
  getOpenGraphLocale,
  LOCALE_PATHS,
  SITE_NAME,
  SITE_URL
} from "@/lib/seo";

import "../globals.css";

type Props = {
  children: ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({locale, namespace: "Meta"});

  const title = t("title");
  const description = t("description");
  const canonical = LOCALE_PATHS[locale as keyof typeof LOCALE_PATHS];

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
      languages: {
        es: LOCALE_PATHS.es,
        en: LOCALE_PATHS.en,
        "x-default": LOCALE_PATHS.es
      }
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      locale: getOpenGraphLocale(locale),
      alternateLocale: getAlternateOpenGraphLocale(locale)
    },
    twitter: {
      card: "summary",
      title,
      description
    }
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <NextIntlClientProvider messages={messages}>
          <LanguageSwitcher />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
