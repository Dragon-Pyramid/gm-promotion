import {Scene, ScrollTransform} from "react-kino";

type Scene05TeamOperationLabels = {
  kicker: string;
  title: string;
  body: string;
  demo: string;
  stationLabel: string;
  live: string;
  flowTitle: string;
  flowMeta: string;
  steps: {
    arrival: string;
    checkIn: string;
    payment: string;
    sale: string;
    stock: string;
    record: string;
  };
  stepMeta: {
    arrival: string;
    checkIn: string;
    payment: string;
    sale: string;
    stock: string;
    record: string;
  };
  syncLabel: string;
  syncMeta: string;
  insightEyebrow: string;
  insightTitle: string;
  insightBody: string;
};

const operationValues = ["08:12", "QR", "OK", "POS", "-1", "SYNC"] as const;

export function Scene05TeamOperation({
  labels
}: {
  labels: Scene05TeamOperationLabels;
}) {
  const steps = [
    {
      key: "arrival",
      label: labels.steps.arrival,
      meta: labels.stepMeta.arrival,
      value: operationValues[0],
      tone: "cyan"
    },
    {
      key: "checkIn",
      label: labels.steps.checkIn,
      meta: labels.stepMeta.checkIn,
      value: operationValues[1],
      tone: "violet"
    },
    {
      key: "payment",
      label: labels.steps.payment,
      meta: labels.stepMeta.payment,
      value: operationValues[2],
      tone: "green"
    },
    {
      key: "sale",
      label: labels.steps.sale,
      meta: labels.stepMeta.sale,
      value: operationValues[3],
      tone: "amber"
    },
    {
      key: "stock",
      label: labels.steps.stock,
      meta: labels.stepMeta.stock,
      value: operationValues[4],
      tone: "rose"
    },
    {
      key: "record",
      label: labels.steps.record,
      meta: labels.stepMeta.record,
      value: operationValues[5],
      tone: "cyan"
    }
  ] as const;

  return (
    <Scene
      duration="180vh"
      className="gm-scene05"
      aria-labelledby="scene05-title"
    >
      <div className="gm-scene05__ambient" aria-hidden="true" />

      <div className="gm-shell gm-scene05__layout">
        <header className="gm-scene05__copy">
          <p className="gm-section-index">05 / {labels.kicker}</p>
          <h2 id="scene05-title">{labels.title}</h2>
          <p className="gm-copy">{labels.body}</p>
          <span className="gm-scene05__demo">{labels.demo}</span>
        </header>

        <ScrollTransform
          from={{x: 22, opacity: 0.55, scale: 0.985}}
          to={{x: 0, opacity: 1, scale: 1}}
          at={0}
          span={0.1}
          easing="ease-out"
          className="gm-scene05__flow-motion"
        >
          <div className="gm-scene05__stage">
            <div className="gm-scene05__stage-grid" aria-hidden="true" />
            <div className="gm-scene05__pulse-runner" aria-hidden="true" />

            <div className="gm-scene05__topline">
              <div>
                <span className="gm-scene05__status-dot" aria-hidden="true" />
                <strong>{labels.stationLabel}</strong>
              </div>

              <span className="gm-scene05__live">
                <i aria-hidden="true" />
                {labels.live}
              </span>
            </div>

            <div className="gm-scene05__flow-head">
              <strong>{labels.flowTitle}</strong>
              <span>{labels.flowMeta}</span>
            </div>

            <div className="gm-scene05__track">
              <div className="gm-scene05__rail" aria-hidden="true">
                <span />
              </div>

              {steps.map((step, index) => (
                <article
                  className="gm-scene05__node"
                  data-tone={step.tone}
                  key={step.key}
                >
                  <div className="gm-scene05__node-index">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <i aria-hidden="true" />
                  </div>

                  <div className="gm-scene05__node-copy">
                    <strong>{step.label}</strong>
                    <p>{step.meta}</p>
                  </div>

                  <span className="gm-scene05__node-value">{step.value}</span>
                </article>
              ))}
            </div>

            <div className="gm-scene05__outcome">
              <section className="gm-scene05__sync">
                <div>
                  <p>{labels.syncLabel}</p>
                  <strong>{labels.syncMeta}</strong>
                </div>

                <div className="gm-scene05__sync-bars" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </section>

              <aside className="gm-scene05__insight">
                <p className="gm-kicker">{labels.insightEyebrow}</p>
                <strong>{labels.insightTitle}</strong>
                <p>{labels.insightBody}</p>
              </aside>
            </div>
          </div>
        </ScrollTransform>
      </div>
    </Scene>
  );
}