import Image from "next/image";
import {getTranslations, setRequestLocale} from "next-intl/server";

import {Scene02Poc} from "@/components/story/Scene02Poc";
import {Scene03AdminOverview} from "@/components/story/Scene03AdminOverview";
import {Scene04AdminBusiness} from "@/components/story/Scene04AdminBusiness";
import {Scene05TeamOperation} from "@/components/story/Scene05TeamOperation";
import {Scene06MemberEntry} from "@/components/story/Scene06MemberEntry";
import {Scene07TrainingProgress} from "@/components/story/Scene07TrainingProgress";
import {Scene08Relationship} from "@/components/story/Scene08Relationship";
import {Scene09IntelligenceData} from "@/components/story/Scene09IntelligenceData";
import {Scene10Infrastructure} from "@/components/story/Scene10Infrastructure";
import {Scene11ThreePeopleOneSystem} from "@/components/story/Scene11ThreePeopleOneSystem";
import {Scene12GymAsSystem} from "@/components/story/Scene12GymAsSystem";
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

  const scene06Labels = {
    kicker: t("memberEntryKicker"),
    title: t("memberEntryTitle"),
    body: t("memberEntryBody"),
    demo: t("memberEntryDemo"),
    portalLabel: t("memberEntryPortalLabel"),
    ready: t("memberEntryReady"),
    journey: {
      arrival: t("memberEntryJourney.arrival"),
      identify: t("memberEntryJourney.identify"),
      access: t("memberEntryJourney.access"),
      welcome: t("memberEntryJourney.welcome"),
      train: t("memberEntryJourney.train")
    },
    passEyebrow: t("memberEntryPassEyebrow"),
    passName: t("memberEntryPassName"),
    passMeta: t("memberEntryPassMeta"),
    accessLabel: t("memberEntryAccessLabel"),
    accessStatus: t("memberEntryAccessStatus"),
    accessTime: t("memberEntryAccessTime"),
    systemEyebrow: t("memberEntrySystemEyebrow"),
    systemTitle: t("memberEntrySystemTitle"),
    systemBody: t("memberEntrySystemBody"),
    welcomeEyebrow: t("memberEntryWelcomeEyebrow"),
    welcomeTitle: t("memberEntryWelcomeTitle"),
    welcomeBody: t("memberEntryWelcomeBody")
  };

  const scene07Labels = {
    kicker: t("trainingProgressKicker"),
    title: t("trainingProgressTitle"),
    body: t("trainingProgressBody"),
    demo: t("trainingProgressDemo"),
    sessionLabel: t("trainingProgressSessionLabel"),
    sessionMeta: t("trainingProgressSessionMeta"),
    sessionLive: t("trainingProgressSessionLive"),
    exercises: {
      squat: t("trainingProgressExercises.squat"),
      press: t("trainingProgressExercises.press"),
      row: t("trainingProgressExercises.row")
    },
    exerciseMeta: {
      squat: t("trainingProgressExerciseMeta.squat"),
      press: t("trainingProgressExerciseMeta.press"),
      row: t("trainingProgressExerciseMeta.row")
    },
    completionLabel: t("trainingProgressCompletionLabel"),
    completionMeta: t("trainingProgressCompletionMeta"),
    progressLabel: t("trainingProgressLabel"),
    progressMeta: t("trainingProgressMeta"),
    metrics: {
      consistency: t("trainingProgressMetrics.consistency"),
      volume: t("trainingProgressMetrics.volume"),
      sessions: t("trainingProgressMetrics.sessions")
    },
    metricMeta: {
      consistency: t("trainingProgressMetricMeta.consistency"),
      volume: t("trainingProgressMetricMeta.volume"),
      sessions: t("trainingProgressMetricMeta.sessions")
    },
    focusEyebrow: t("trainingProgressFocusEyebrow"),
    focusTitle: t("trainingProgressFocusTitle"),
    focusBody: t("trainingProgressFocusBody"),
    insightEyebrow: t("trainingProgressInsightEyebrow"),
    insightTitle: t("trainingProgressInsightTitle"),
    insightBody: t("trainingProgressInsightBody")
  };

  const scene08Labels = {
    kicker: t("relationshipKicker"),
    title: t("relationshipTitle"),
    body: t("relationshipBody"),
    demo: t("relationshipDemo"),
    loopLabel: t("relationshipLoopLabel"),
    connected: t("relationshipConnected"),
    timeline: {
      today: t("relationshipTimeline.today"),
      followUp: t("relationshipTimeline.followUp"),
      nextVisit: t("relationshipTimeline.nextVisit")
    },
    memberEyebrow: t("relationshipMemberEyebrow"),
    memberName: t("relationshipMemberName"),
    memberMeta: t("relationshipMemberMeta"),
    workoutEyebrow: t("relationshipWorkoutEyebrow"),
    workoutTitle: t("relationshipWorkoutTitle"),
    workoutMeta: t("relationshipWorkoutMeta"),
    messageEyebrow: t("relationshipMessageEyebrow"),
    messageTitle: t("relationshipMessageTitle"),
    messageBody: t("relationshipMessageBody"),
    reminderEyebrow: t("relationshipReminderEyebrow"),
    reminderTitle: t("relationshipReminderTitle"),
    reminderMeta: t("relationshipReminderMeta"),
    continuityEyebrow: t("relationshipContinuityEyebrow"),
    continuityTitle: t("relationshipContinuityTitle"),
    continuityBody: t("relationshipContinuityBody"),
    insightEyebrow: t("relationshipInsightEyebrow"),
    insightTitle: t("relationshipInsightTitle"),
    insightBody: t("relationshipInsightBody")
  };

  const scene09Labels = {
    kicker: t("intelligenceKicker"),
    title: t("intelligenceTitle"),
    body: t("intelligenceBody"),
    demo: t("intelligenceDemo"),
    fieldLabel: t("intelligenceFieldLabel"),
    connected: t("intelligenceConnected"),
    sources: {
      attendance: t("intelligenceSources.attendance"),
      payments: t("intelligenceSources.payments"),
      sales: t("intelligenceSources.sales"),
      training: t("intelligenceSources.training"),
      relationship: t("intelligenceSources.relationship")
    },
    sourceMeta: {
      attendance: t("intelligenceSourceMeta.attendance"),
      payments: t("intelligenceSourceMeta.payments"),
      sales: t("intelligenceSourceMeta.sales"),
      training: t("intelligenceSourceMeta.training"),
      relationship: t("intelligenceSourceMeta.relationship")
    },
    coreEyebrow: t("intelligenceCoreEyebrow"),
    coreTitle: t("intelligenceCoreTitle"),
    coreMeta: t("intelligenceCoreMeta"),
    signalEyebrow: t("intelligenceSignalEyebrow"),
    signalTitle: t("intelligenceSignalTitle"),
    signalBody: t("intelligenceSignalBody"),
    signals: {
      rhythm: t("intelligenceSignals.rhythm"),
      change: t("intelligenceSignals.change"),
      attention: t("intelligenceSignals.attention")
    },
    signalMeta: {
      rhythm: t("intelligenceSignalMeta.rhythm"),
      change: t("intelligenceSignalMeta.change"),
      attention: t("intelligenceSignalMeta.attention")
    },
    insightEyebrow: t("intelligenceInsightEyebrow"),
    insightTitle: t("intelligenceInsightTitle"),
    insightBody: t("intelligenceInsightBody")
  };

  const scene10Labels = {
    kicker: t("infrastructureKicker"),
    title: t("infrastructureTitle"),
    body: t("infrastructureBody"),
    demo: t("infrastructureDemo"),
    systemLabel: t("infrastructureSystemLabel"),
    connected: t("infrastructureConnected"),
    surfaceEyebrow: t("infrastructureSurfaceEyebrow"),
    surfaceTitle: t("infrastructureSurfaceTitle"),
    surfaceMeta: t("infrastructureSurfaceMeta"),
    layers: {
      app: t("infrastructureLayers.app"),
      sync: t("infrastructureLayers.sync"),
      data: t("infrastructureLayers.data"),
      security: t("infrastructureLayers.security"),
      cloud: t("infrastructureLayers.cloud"),
      continuity: t("infrastructureLayers.continuity")
    },
    layerMeta: {
      app: t("infrastructureLayerMeta.app"),
      sync: t("infrastructureLayerMeta.sync"),
      data: t("infrastructureLayerMeta.data"),
      security: t("infrastructureLayerMeta.security"),
      cloud: t("infrastructureLayerMeta.cloud"),
      continuity: t("infrastructureLayerMeta.continuity")
    },
    foundationEyebrow: t("infrastructureFoundationEyebrow"),
    foundationTitle: t("infrastructureFoundationTitle"),
    foundationBody: t("infrastructureFoundationBody"),
    insightEyebrow: t("infrastructureInsightEyebrow"),
    insightTitle: t("infrastructureInsightTitle"),
    insightBody: t("infrastructureInsightBody")
  };

  const scene11Labels = {
    kicker: t("oneSystemKicker"),
    title: t("oneSystemTitle"),
    body: t("oneSystemBody"),
    demo: t("oneSystemDemo"),
    systemLabel: t("oneSystemSystemLabel"),
    connected: t("oneSystemConnected"),
    roles: {
      admin: t("oneSystemRoles.admin"),
      team: t("oneSystemRoles.team"),
      member: t("oneSystemRoles.member")
    },
    roleMeta: {
      admin: t("oneSystemRoleMeta.admin"),
      team: t("oneSystemRoleMeta.team"),
      member: t("oneSystemRoleMeta.member")
    },
    roleAction: {
      admin: t("oneSystemRoleAction.admin"),
      team: t("oneSystemRoleAction.team"),
      member: t("oneSystemRoleAction.member")
    },
    roleMoment: {
      admin: t("oneSystemRoleMoment.admin"),
      team: t("oneSystemRoleMoment.team"),
      member: t("oneSystemRoleMoment.member")
    },
    sharedEyebrow: t("oneSystemSharedEyebrow"),
    sharedTitle: t("oneSystemSharedTitle"),
    sharedBody: t("oneSystemSharedBody"),
    contextItems: {
      members: t("oneSystemContextItems.members"),
      payments: t("oneSystemContextItems.payments"),
      access: t("oneSystemContextItems.access"),
      training: t("oneSystemContextItems.training")
    },
    insightEyebrow: t("oneSystemInsightEyebrow"),
    insightTitle: t("oneSystemInsightTitle"),
    insightBody: t("oneSystemInsightBody")
  };

  const scene12Labels = {
    kicker: t("gymSystemKicker"),
    title: t("gymSystemTitle"),
    body: t("gymSystemBody"),
    demo: t("gymSystemDemo"),
    systemLabel: t("gymSystemSystemLabel"),
    connected: t("gymSystemConnected"),
    domains: {
      people: t("gymSystemDomains.people"),
      operation: t("gymSystemDomains.operation"),
      experience: t("gymSystemDomains.experience"),
      data: t("gymSystemDomains.data"),
      infrastructure: t("gymSystemDomains.infrastructure")
    },
    domainMeta: {
      people: t("gymSystemDomainMeta.people"),
      operation: t("gymSystemDomainMeta.operation"),
      experience: t("gymSystemDomainMeta.experience"),
      data: t("gymSystemDomainMeta.data"),
      infrastructure: t("gymSystemDomainMeta.infrastructure")
    },
    coreEyebrow: t("gymSystemCoreEyebrow"),
    coreTitle: t("gymSystemCoreTitle"),
    coreMeta: t("gymSystemCoreMeta"),
    motionEyebrow: t("gymSystemMotionEyebrow"),
    motionTitle: t("gymSystemMotionTitle"),
    motionBody: t("gymSystemMotionBody"),
    principles: {
      connect: t("gymSystemPrinciples.connect"),
      context: t("gymSystemPrinciples.context"),
      continuity: t("gymSystemPrinciples.continuity")
    },
    principleMeta: {
      connect: t("gymSystemPrincipleMeta.connect"),
      context: t("gymSystemPrincipleMeta.context"),
      continuity: t("gymSystemPrincipleMeta.continuity")
    },
    insightEyebrow: t("gymSystemInsightEyebrow"),
    insightTitle: t("gymSystemInsightTitle"),
    insightBody: t("gymSystemInsightBody")
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

      <Scene06MemberEntry labels={scene06Labels} />

      <Scene07TrainingProgress labels={scene07Labels} />

      <Scene08Relationship labels={scene08Labels} />

      <Scene09IntelligenceData labels={scene09Labels} />

      <Scene10Infrastructure labels={scene10Labels} />

      <Scene11ThreePeopleOneSystem labels={scene11Labels} />

      <Scene12GymAsSystem labels={scene12Labels} />
    </main>
  );
}