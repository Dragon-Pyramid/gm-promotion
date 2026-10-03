import {Scene, ScrollTransform} from "react-kino";

type Scene13BeforeAfterLabels = {
  kicker: string;
  title: string;
  body: string;
  demo: string;
  sameGym: string;
  twoStates: string;
  beforeLabel: string;
  beforeTitle: string;
  beforeBody: string;
  afterLabel: string;
  afterTitle: string;
  afterBody: string;
  nodes: {
    members: string;
    payments: string;
    access: string;
    training: string;
  };
  shifts: {
    fragmentation: string;
    islands: string;
    lateReaction: string;
    partialView: string;
  };
  outcomes: {
    continuity: string;
    sharedContext: string;
    contextualDecision: string;
    connectedView: string;
  };
  insightEyebrow: string;
  insightTitle: string;
  insightBody: string;
};

const nodeKeys = ["members", "payments", "access", "training"] as const;

const shiftKeys = [
  ["fragmentation", "continuity"],
  ["islands", "sharedContext"],
  ["lateReaction", "contextualDecision"],
  ["partialView", "connectedView"]
] as const;

export function Scene13BeforeAfter({
  labels
}: {
  labels: Scene13BeforeAfterLabels;
}) {
  return (
    <Scene
      duration="180vh"
      className="gm-scene13"
      aria-labelledby="scene13-title"
    >
      <div className="gm-scene13__ambient" aria-hidden="true" />

      <div className="gm-shell gm-scene13__layout">
        <header className="gm-scene13__copy">
          <p className="gm-section-index">13 / {labels.kicker}</p>
          <h2 id="scene13-title">{labels.title}</h2>
          <p className="gm-copy">{labels.body}</p>
          <span className="gm-scene13__demo">{labels.demo}</span>
        </header>

        <ScrollTransform
          from={{y: 16, opacity: 0.54, scale: 0.985}}
          to={{y: 0, opacity: 1, scale: 1}}
          at={0}
          span={0.1}
          easing="ease-out"
          className="gm-scene13__motion"
        >
          <div className="gm-scene13__stage">
            <div className="gm-scene13__stage-grid" aria-hidden="true" />
            <div className="gm-scene13__glow" aria-hidden="true" />

            <div className="gm-scene13__topline">
              <div>
                <span className="gm-scene13__status-dot" aria-hidden="true" />
                <strong>{labels.sameGym}</strong>
              </div>

              <span className="gm-scene13__states">
                <i aria-hidden="true" />
                {labels.twoStates}
              </span>
            </div>

            <div className="gm-scene13__compare">
              <section className="gm-scene13__state gm-scene13__state--before">
                <div className="gm-scene13__state-head">
                  <span>{labels.beforeLabel}</span>
                  <strong>{labels.beforeTitle}</strong>
                  <p>{labels.beforeBody}</p>
                </div>

                <div className="gm-scene13__canvas gm-scene13__canvas--before">
                  <div className="gm-scene13__broken-path" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>

                  {nodeKeys.map((key, index) => (
                    <article
                      className="gm-scene13__node"
                      data-index={index + 1}
                      key={`before-${key}`}
                    >
                      <i aria-hidden="true" />
                      <strong>{labels.nodes[key]}</strong>
                      <small>{String(index + 1).padStart(2, "0")}</small>
                    </article>
                  ))}
                </div>
              </section>

              <div className="gm-scene13__bridge" aria-hidden="true">
                <span />
                <strong>→</strong>
                <i />
              </div>

              <section className="gm-scene13__state gm-scene13__state--after">
                <div className="gm-scene13__state-head">
                  <span>{labels.afterLabel}</span>
                  <strong>{labels.afterTitle}</strong>
                  <p>{labels.afterBody}</p>
                </div>

                <div className="gm-scene13__canvas gm-scene13__canvas--after">
                  <div className="gm-scene13__connected-path" aria-hidden="true">
                    <span />
                    <i />
                  </div>

                  <div className="gm-scene13__shared-core" aria-hidden="true">
                    <span>GM</span>
                  </div>

                  {nodeKeys.map((key, index) => (
                    <article
                      className="gm-scene13__node"
                      data-index={index + 1}
                      key={`after-${key}`}
                    >
                      <i aria-hidden="true" />
                      <strong>{labels.nodes[key]}</strong>
                      <small>{String(index + 1).padStart(2, "0")}</small>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <div className="gm-scene13__shifts">
              {shiftKeys.map(([fromKey, toKey], index) => (
                <article key={fromKey}>
                  <span>{labels.shifts[fromKey]}</span>
                  <i aria-hidden="true">→</i>
                  <strong>{labels.outcomes[toKey]}</strong>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                </article>
              ))}
            </div>

            <aside className="gm-scene13__insight">
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