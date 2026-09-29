import Image from "next/image";
import {getTranslations, setRequestLocale} from "next-intl/server";

import {Scene02Poc} from "@/components/story/Scene02Poc";
import {Scene03AdminOverview} from "@/components/story/Scene03AdminOverview";
import {Scene04AdminBusiness} from "@/components/story/Scene04AdminBusiness";
import {Scene05TeamOperation} from "@/components/story/Scene05TeamOperation";
import {GM_BRAND_ASSETS} from "@/lib/brand/assets";

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Home");

  const scene02Labels = {
    kicker: t("transformKicker"),
    title: t("transformTitle"),
    body: t("transformBody"),
    connected: t("connected"),
    chips: {
      members: t("chips.members"),
      payments: t("chips.payments"),
      attendance: t("chips.attendance"),
      sales: t("chips.sales"),
      training: t("chips.training")
    }
  };

  const scene03Labels = {
    kicker: t("adminOverviewKicker"),
    title: t("adminOverviewTitle"),
    body: t("adminOverviewBody"),
    demo: t("adminOverviewDemo"),
    controlCenter: t("adminControlCenter"),
    live: t("adminLive"),
    metrics: {
      members: t("adminMetrics.members"),
      collection: t("adminMetrics.collection"),
      attendance: t("adminMetrics.attendance"),
      alerts: t("adminMetrics.alerts")
    },
    metricsMeta: {
      members: t("adminMetricsMeta.members"),
      collection: t("adminMetricsMeta.collection"),
      attendance: t("adminMetricsMeta.attendance"),
      alerts: t("adminMetricsMeta.alerts")
    },
    activityTitle: t("adminActivityTitle"),
    activityItems: {
      checkIn: t("adminActivity.checkIn"),
      payment: t("adminActivity.payment"),
      sale: t("adminActivity.sale")
    },
    insightEyebrow: t("adminInsightEyebrow"),
    insightTitle: t("adminInsightTitle"),
    insightBody: t("adminInsightBody")
  };

  const scene04Labels = {
    kicker: t("businessKicker"),
    title: t("businessTitle"),
    body: t("businessBody"),
    demo: t("businessDemo"),
    pulseLabel: t("businessPulseLabel"),
    resultLabel: t("businessResultLabel"),
    resultMeta: t("businessResultMeta"),
    trendMeta: t("businessTrendMeta"),
    flowTitle: t("businessFlowTitle"),
    flowIncome: t("businessFlowIncome"),
    flowExpenses: t("businessFlowExpenses"),
    sources: {
      fees: t("businessSources.fees"),
      sales: t("businessSources.sales"),
      services: t("businessSources.services"),
      expenses: t("businessSources.expenses")
    },
    decisionEyebrow: t("businessDecisionEyebrow"),
    decisionTitle: t("businessDecisionTitle"),
    decisionBody: t("businessDecisionBody")
  };

  const scene05Labels = {
    kicker: t("teamKicker"),
    title: t("teamTitle"),
    body: t("teamBody"),
    demo: t("teamDemo"),
    stationLabel: t("teamStationLabel"),
    live: t("teamLive"),
    flowTitle: t("teamFlowTitle"),
    flowMeta: t("teamFlowMeta"),
    steps: {
      arrival: t("teamSteps.arrival"),
      checkIn: t("teamSteps.checkIn"),
      payment: t("teamSteps.payment"),
      sale: t("teamSteps.sale"),
      stock: t("teamSteps.stock"),
      record: t("teamSteps.record")
    },
    stepMeta: {
      arrival: t("teamStepMeta.arrival"),
      checkIn: t("teamStepMeta.checkIn"),
      payment: t("teamStepMeta.payment"),
      sale: t("teamStepMeta.sale"),
      stock: t("teamStepMeta.stock"),
      record: t("teamStepMeta.record")
    },
    syncLabel: t("teamSyncLabel"),
    syncMeta: t("teamSyncMeta"),
    insightEyebrow: t("teamInsightEyebrow"),
    insightTitle: t("teamInsightTitle"),
    insightBody: t("teamInsightBody")
  };

  const problemSystems = [
    {label: "Excel", tone: "blue"},
    {label: "WhatsApp", tone: "green"},
    {label: "QR", tone: "cyan"},
    {label: t("chips.payments"), tone: "violet"},
    {label: t("chips.sales"), tone: "amber"},
    {label: t("chips.training"), tone: "rose"}
  ];

  return (
    <main className="gm-page">
      <section className="gm-hero" aria-labelledby="hero-title">
        <div className="gm-hero__noise" aria-hidden="true" />
        <div className="gm-hero__grid" aria-hidden="true" />
        <div className="gm-hero__orb gm-hero__orb--one" aria-hidden="true" />
        <div className="gm-hero__orb gm-hero__orb--two" aria-hidden="true" />

        <div className="gm-shell gm-hero__layout">
          <div className="gm-hero__brand">
            <div className="gm-hero__presented">
              <span aria-hidden="true" />
              <p className="gm-kicker">{t("eyebrow")}</p>
              <span aria-hidden="true" />
            </div>

            <div className="gm-hero__logo-stage">
              <div className="gm-hero__logo-halo" aria-hidden="true" />
              <Image
                className="gm-hero__logo"
                src={GM_BRAND_ASSETS.logoWhite.local}
                width={2048}
                height={2048}
                sizes="(max-width: 760px) 172px, 390px"
                loading="eager"
                alt="Gym Master"
              />
            </div>
          </div>

          <div className="gm-hero__content">
            <p className="gm-section-index" aria-hidden="true">
              00 / {t("identityLabel")}
            </p>
            <h1 id="hero-title">{t("heroTitle")}</h1>
            <p className="gm-copy gm-copy--hero">{t("heroBody")}</p>

            <div className="gm-hero__actions">
              <a className="gm-discover" href="#problem">
                <span>{t("discover")}</span>
                <span className="gm-discover__arrow" aria-hidden="true">
                  ↓
                </span>
              </a>

              <p className="gm-hero__microcopy">{t("heroMicrocopy")}</p>
            </div>
          </div>
        </div>

        <div className="gm-scroll-rail" aria-hidden="true">
          <span />
          <small>SCROLL</small>
        </div>
      </section>

      <section
        id="problem"
        className="gm-problem"
        aria-labelledby="problem-title"
      >
        <div className="gm-problem__glow" aria-hidden="true" />

        <div className="gm-shell gm-problem__layout">
          <div className="gm-problem__copy">
            <p className="gm-section-index">01 / {t("problemKicker")}</p>
            <h2 id="problem-title">{t("problemTitle")}</h2>
            <p className="gm-copy">{t("problemBody")}</p>

            <div className="gm-problem__signal" aria-hidden="true">
              <span />
              <p>{t("fragmentedLabel")}</p>
            </div>
          </div>

          <div className="gm-fragment-map" aria-hidden="true">
            <div className="gm-fragment-map__center">
              <span>{t("gymLabel")}</span>
            </div>

            {problemSystems.map((system, index) => (
              <div
                className={`gm-system-card gm-system-card--${index + 1}`}
                data-tone={system.tone}
                key={`${system.label}-${index}`}
              >
                <span className="gm-system-card__dot" />
                <strong>{system.label}</strong>
                <small>ISLA {String(index + 1).padStart(2, "0")}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Scene02Poc labels={scene02Labels} />

      <Scene03AdminOverview labels={scene03Labels} />

      <Scene04AdminBusiness labels={scene04Labels} />

      <Scene05TeamOperation labels={scene05Labels} />
    </main>
  );
}