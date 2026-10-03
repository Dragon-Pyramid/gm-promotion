import {Scene, ScrollTransform} from "react-kino";

type Scene09IntelligenceLabels = {
  kicker: string;
  title: string;
  body: string;
  demo: string;
  fieldLabel: string;
  connected: string;
  sources: {
    attendance: string;
    payments: string;
    sales: string;
    training: string;
    relationship: string;
  };
  sourceMeta: {
    attendance: string;
    payments: string;
    sales: string;
    training: string;
    relationship: string;
  };
  coreEyebrow: string;
  coreTitle: string;
  coreMeta: string;
  signalEyebrow: string;
  signalTitle: string;
  signalBody: string;
  signals: {
    rhythm: string;
    change: string;
    attention: string;
  };
  signalMeta: {
    rhythm: string;
    change: string;
    attention: string;
  };
  insightEyebrow: string;
  insightTitle: string;
  insightBody: string;
};

const sourceKeys = [
  "attendance",
  "payments",
  "sales",
  "training",
  "relationship"
] as const;

const signalKeys = ["rhythm", "change", "attention"] as const;

export function Scene09IntelligenceData({
  labels
}: {
  labels: Scene09IntelligenceLabels;
}) {
  return (
    <Scene
      duration="180vh"
      className="gm-scene09"
      aria-labelledby="scene09-title"
    >
      <div className="gm-scene09__ambient" aria-hidden="true" />

      <div className="gm-shell gm-scene09__layout">
        <header className="gm-scene09__copy">
          <p className="gm-section-index">09 / {labels.kicker}</p>
          <h2 id="scene09-title">{labels.title}</h2>
          <p className="gm-copy">{labels.body}</p>
          <span className="gm-scene09__demo">{labels.demo}</span>
        </header>

        <ScrollTransform
          from={{x: 18, opacity: 0.52, scale: 0.985}}
          to={{x: 0, opacity: 1, scale: 1}}
          at={0}
          span={0.1}
          easing="ease-out"
          className="gm-scene09__motion"
        >
          <div className="gm-scene09__stage">
            <div className="gm-scene09__stage-grid" aria-hidden="true" />
            <div className="gm-scene09__halo" aria-hidden="true" />

            <div className="gm-scene09__topline">
              <div>
                <span className="gm-scene09__status-dot" aria-hidden="true" />
                <strong>{labels.fieldLabel}</strong>
              </div>

              <span className="gm-scene09__connected">
                <i aria-hidden="true" />
                {labels.connected}
              </span>
            </div>

            <div className="gm-scene09__field">
              <section className="gm-scene09__sources">
                {sourceKeys.map((key, index) => (
                  <article
                    className="gm-scene09__source"
                    data-index={index + 1}
                    key={key}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{labels.sources[key]}</strong>
                      <small>{labels.sourceMeta[key]}</small>
                    </div>
                    <i aria-hidden="true" />
                  </article>
                ))}
              </section>

              <section className="gm-scene09__core">
                <span className="gm-scene09__ring gm-scene09__ring--one" aria-hidden="true" />
                <span className="gm-scene09__ring gm-scene09__ring--two" aria-hidden="true" />
                <span className="gm-scene09__ring gm-scene09__ring--three" aria-hidden="true" />

                <div className="gm-scene09__core-card">
                  <p>{labels.coreEyebrow}</p>
                  <strong>{labels.coreTitle}</strong>
                  <span>{labels.coreMeta}</span>

                  <div className="gm-scene09__core-pulse" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </section>

              <section className="gm-scene09__signal">
                <p className="gm-kicker">{labels.signalEyebrow}</p>
                <strong>{labels.signalTitle}</strong>
                <p>{labels.signalBody}</p>

                <div className="gm-scene09__signal-list">
                  {signalKeys.map((key, index) => (
                    <article data-index={index + 1} key={key}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <strong>{labels.signals[key]}</strong>
                        <small>{labels.signalMeta[key]}</small>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <aside className="gm-scene09__insight">
              <div>
                <p className="gm-kicker">{labels.insightEyebrow}</p>
                <strong>{labels.insightTitle}</strong>
              </div>
              <p>{labels.insightBody}</p>
            </aside>
          </div>
        </ScrollTransform>
      </div>
    </Scene>
  );
}