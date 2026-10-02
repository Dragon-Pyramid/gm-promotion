import {getTranslations, setRequestLocale} from "next-intl/server";

import {DemoRequestForm} from "@/components/demo/DemoRequestForm";
import {Link} from "@/i18n/navigation";

export default async function DemoPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Demo");

  const companyHref =
    locale === "es"
      ? "https://www.dragonpyramid.com.ar"
      : "https://www.dragonpyramid.com.ar/en/home-en/index.html";

  const formLabels = {
    title: t("form.title"),
    body: t("form.body"),
    name: t("form.name"),
    namePlaceholder: t("form.namePlaceholder"),
    gym: t("form.gym"),
    gymPlaceholder: t("form.gymPlaceholder"),
    email: t("form.email"),
    emailPlaceholder: t("form.emailPlaceholder"),
    phone: t("form.phone"),
    phonePlaceholder: t("form.phonePlaceholder"),
    city: t("form.city"),
    cityPlaceholder: t("form.cityPlaceholder"),
    country: t("form.country"),
    countryPlaceholder: t("form.countryPlaceholder"),
    message: t("form.message"),
    messagePlaceholder: t("form.messagePlaceholder"),
    submit: t("form.submit")
  };

  return (
    <main className="gm-demo">
      <div className="gm-demo__ambient" aria-hidden="true" />
      <div className="gm-shell gm-demo__shell">
        <header className="gm-demo__header">
          <Link className="gm-demo__back" href="/">
            <span aria-hidden="true">←</span>
            {t("back")}
          </Link>
          <div className="gm-demo__brand" aria-hidden="true">
            <span />
            <strong>GYM MASTER</strong>
          </div>
        </header>

        <section className="gm-demo__intro" aria-labelledby="demo-title">
          <p className="gm-kicker">{t("eyebrow")}</p>
          <h1 id="demo-title">{t("title")}</h1>
          <p>{t("body")}</p>
        </section>

        <section className="gm-demo__grid">
          <aside className="gm-demo__context">
            <p className="gm-kicker">{t("panelEyebrow")}</p>
            <h2>{t("panelTitle")}</h2>
            <p>{t("panelBody")}</p>
            <ul>
              <li>{t("points.operation")}</li>
              <li>{t("points.priorities")}</li>
              <li>{t("points.experience")}</li>
            </ul>

            <a
              className="gm-demo__company-link"
              href={companyHref}
              target="_blank"
              rel="noreferrer"
            >
              <span>{t("companyLink")}</span>
              <i aria-hidden="true">↗</i>
            </a>
          </aside>
          <DemoRequestForm labels={formLabels} />
        </section>
      </div>
    </main>
  );
}
