"use client";

import {Scene, ScrollTransform} from "react-kino";

type Scene03AdminOverviewLabels = {
  kicker: string;
  title: string;
  body: string;
  demo: string;
  controlCenter: string;
  live: string;
  metrics: {
    members: string;
    collection: string;
    attendance: string;
    alerts: string;
  };
  metricsMeta: {
    members: string;
    collection: string;
    attendance: string;
    alerts: string;
  };
  activityTitle: string;
  activityItems: {
    checkIn: string;
    payment: string;
    sale: string;
  };
  insightEyebrow: string;
  insightTitle: string;
  insightBody: string;
};

const metricValues = ["1,248", "94%", "186", "12"] as const;

export function Scene03AdminOverview({
  labels
}: {
  labels: Scene03AdminOverviewLabels;
}) {
  const metrics = [
    {
      label: labels.metrics.members,
      value: metricValues[0],
      meta: labels.metricsMeta.members
    },
    {
      label: labels.metrics.collection,
      value: metricValues[1],
      meta: labels.metricsMeta.collection
    },
    {
      label: labels.metrics.attendance,
      value: metricValues[2],
      meta: labels.metricsMeta.attendance
    },
    {
      label: labels.metrics.alerts,
      value: metricValues[3],
      meta: labels.metricsMeta.alerts
    }
  ];

  const activityItems = [
    {time: "07:42", label: labels.activityItems.checkIn, tone: "cyan"},
    {time: "07:39", label: labels.activityItems.payment, tone: "violet"},
    {time: "07:35", label: labels.activityItems.sale, tone: "amber"}
  ];

  return (
    <Scene
      duration="180vh"
      className="gm-scene03"
      aria-labelledby="scene03-title"
    >
      <div className="gm-scene03__grid" aria-hidden="true" />
      <div className="gm-scene03__glow gm-scene03__glow--one" aria-hidden="true" />
      <div className="gm-scene03__glow gm-scene03__glow--two" aria-hidden="true" />

      <div className="gm-shell gm-scene03__layout">
        <header className="gm-scene03__copy">
          <p className="gm-section-index">03 / {labels.kicker}</p>
          <h2 id="scene03-title">{labels.title}</h2>
          <p className="gm-copy">{labels.body}</p>
          <span className="gm-scene03__demo">{labels.demo}</span>
        </header>

        <ScrollTransform
          from={{y: 20, opacity: 0.5, scale: 0.985}}
          to={{y: 0, opacity: 1, scale: 1}}
          at={0}
          span={0.1}
          easing="ease-out"
          className="gm-scene03__dashboard-motion"
        >
          <div className="gm-scene03__dashboard">
            <div className="gm-scene03__dashboard-topbar">
              <div className="gm-scene03__dashboard-brand">
                <span className="gm-scene03__brand-dot" aria-hidden="true" />
                <div>
                  <small>GYM MASTER</small>
                  <strong>{labels.controlCenter}</strong>
                </div>
              </div>

              <span className="gm-scene03__live">
                <span aria-hidden="true" />
                {labels.live}
              </span>
            </div>

            <div className="gm-scene03__metrics">
              {metrics.map((metric, index) => (
                <article className="gm-scene03__metric" key={metric.label}>
                  <div className="gm-scene03__metric-head">
                    <span>{metric.label}</span>
                    <small>0{index + 1}</small>
                  </div>
                  <strong>{metric.value}</strong>
                  <p>{metric.meta}</p>
                  <div
                    className={`gm-scene03__spark gm-scene03__spark--${index + 1}`}
                    aria-hidden="true"
                  >
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </article>
              ))}
            </div>

            <div className="gm-scene03__lower">
              <section className="gm-scene03__activity">
                <div className="gm-scene03__panel-title">
                  <strong>{labels.activityTitle}</strong>
                  <span aria-hidden="true">{labels.live}</span>
                </div>

                <div className="gm-scene03__activity-list">
                  {activityItems.map((item) => (
                    <div className="gm-scene03__activity-row" key={item.time}>
                      <time>{item.time}</time>
                      <span
                        className="gm-scene03__activity-dot"
                        data-tone={item.tone}
                        aria-hidden="true"
                      />
                      <p>{item.label}</p>
                      <span className="gm-scene03__activity-pulse" aria-hidden="true" />
                    </div>
                  ))}
                </div>
              </section>

              <aside className="gm-scene03__insight">
                <p className="gm-kicker">{labels.insightEyebrow}</p>
                <strong>{labels.insightTitle}</strong>
                <p>{labels.insightBody}</p>

                <div className="gm-scene03__insight-orbit" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              </aside>
            </div>
          </div>
        </ScrollTransform>
      </div>
    </Scene>
  );
}