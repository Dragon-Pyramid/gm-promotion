"use client";

import {useLocale} from "next-intl";

import {Link, usePathname} from "@/i18n/navigation";

const localeOptions = [
  {locale: "es", label: "ES"},
  {locale: "en", label: "EN"}
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav className="gm-language-switcher" aria-label="Idioma / Language">
      {localeOptions.map((option, index) => {
        const isActive = locale === option.locale;

        return (
          <span className="gm-language-switcher__item" key={option.locale}>
            {index > 0 ? (
              <span
                className="gm-language-switcher__separator"
                aria-hidden="true"
              >
                /
              </span>
            ) : null}

            <Link
              className="gm-language-switcher__link"
              href={pathname}
              locale={option.locale}
              aria-current={isActive ? "page" : undefined}
              scroll={false}
            >
              {option.label}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
