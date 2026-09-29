"use client";

import {Scene, ScrollTransform} from "react-kino";

type Scene10InfrastructureLabels = {
  kicker: string;
  title: string;
  body: string;
  demo: string;
  systemLabel: string;
  connected: string;
  surfaceEyebrow: string;
  surfaceTitle: string;
  surfaceMeta: string;
  layers: {
    app: string;
    sync: string;
    data: string;
    security: string;
    cloud: string;
    continuity: string;
  };
  layerMeta: {
    app: string;
    sync: string;
    data: string;
    security: string;
    cloud: string;
    continuity: string;
  };
  foundationEyebrow: string;
  foundationTitle: string;
  foundationBody: string;
  insightEyebrow: string;
  insightTitle: string;
  insightBody: string;
};

const layerKeys = [
  "app",
  "sync",
  "data",
  "security",
  "cloud",
  "continuity"
] as const;

export function Scene10Infrastructure({
  labels
}: {
  labels: Scene10InfrastructureLabels;
}) {
  return (
    <Scene
      duration="180vh"
      className="gm-scene10"
      aria-labelledby="scene10-title"
    >
      <div className="gm-scene10__ambient" aria-hidden="true" />

      <div className="gm-shell gm-scene10__layout">
        <header className="gm-scene10__copy">
          <p className="gm-section-index">10 / {labels.kicker}</p>
          <h2 id="scene10-title">{labels.title}</h2>
          <p className="gm-copy">{labels.body}</p>
          <span className="gm-scene10__demo">{labels.demo}</span>
        </header>

        <ScrollTransform
          from={{y: 18, opacity: 0.54, scale: 0.985}}
          to={{y: 0, opacity: 1, scale: 1}}
          at={0}
          span={0.1}
          easing="ease-out"
          className="gm-scene10__motion"
        >
          <div className="gm-scene10__stage">
            <div className="gm-scene10__stage-grid" aria-hidden="true" />
            <div className="gm-scene10__glow" aria-hidden="true" />

            <div className="gm-scene10__topline">
              <div>
                <span className="gm-scene10__status-dot" aria-hidden="true" />
                <strong>{labels.systemLabel}</strong>
              </div>

              <span className="gm-scene10__connected">
                <i aria-hidden="true" />
                {labels.connected}
              </span>
            </div>

            <div className="gm-scene10__architecture">
              <section className="gm-scene10__surface">
                <div className="gm-scene10__surface-screen" aria-hidden="true">
                  <span />
                  <i />
                  <i />
                  <i />
                </div>

                <div>
                  <p>{labels.surfaceEyebrow}</p>
                  <strong>{labels.surfaceTitle}</strong>
                  <span>{labels.surfaceMeta}</span>
                </div>
              </section>

              <div className="gm-scene10__bridge" aria-hidden="true">
                <span />
                <i />
                <span />
              </div>

              <section className="gm-scene10__foundation">
                <div className="gm-scene10__foundation-copy">
                  <p className="gm-kicker">{labels.foundationEyebrow}</p>
                  <strong>{labels.foundationTitle}</strong>
                  <span>{labels.foundationBody}</span>
                </div>

                <div className="gm-scene10__layers">
                  {layerKeys.map((key, index) => (
                    <article
                      className="gm-scene10__layer"
                      data-layer={index + 1}
                      key={key}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>

                      <div>
                        <strong>{labels.layers[key]}</strong>
                        <small>{labels.layerMeta[key]}</small>
                      </div>

                      <i aria-hidden="true" />
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <aside className="gm-scene10__insight">
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