"use client";

import {Scene, ScrollTransform} from "react-kino";

type Scene06MemberEntryLabels = {
  kicker: string;
  title: string;
  body: string;
  demo: string;
  portalLabel: string;
  ready: string;
  journey: {
    arrival: string;
    identify: string;
    access: string;
    welcome: string;
    train: string;
  };
  passEyebrow: string;
  passName: string;
  passMeta: string;
  accessLabel: string;
  accessStatus: string;
  accessTime: string;
  systemEyebrow: string;
  systemTitle: string;
  systemBody: string;
  welcomeEyebrow: string;
  welcomeTitle: string;
  welcomeBody: string;
};

const journeyKeys = ["arrival", "identify", "access", "welcome", "train"] as const;
const qrCells = [1, 2, 4, 5, 7, 8, 10, 12, 13, 15] as const;

export function Scene06MemberEntry({
  labels
}: {
  labels: Scene06MemberEntryLabels;
}) {
  return (
    <Scene
      duration="180vh"
      className="gm-scene06"
      aria-labelledby="scene06-title"
    >
      <div className="gm-scene06__ambient" aria-hidden="true" />

      <div className="gm-shell gm-scene06__layout">
        <header className="gm-scene06__copy">
          <p className="gm-section-index">06 / {labels.kicker}</p>
          <h2 id="scene06-title">{labels.title}</h2>
          <p className="gm-copy">{labels.body}</p>
          <span className="gm-scene06__demo">{labels.demo}</span>
        </header>

        <ScrollTransform
          from={{y: 18, opacity: 0.55, scale: 0.985}}
          to={{y: 0, opacity: 1, scale: 1}}
          at={0}
          span={0.1}
          easing="ease-out"
          className="gm-scene06__portal-motion"
        >
          <div className="gm-scene06__portal">
            <div className="gm-scene06__portal-grid" aria-hidden="true" />
            <div className="gm-scene06__door-light" aria-hidden="true" />

            <div className="gm-scene06__topline">
              <div>
                <span className="gm-scene06__status-dot" aria-hidden="true" />
                <strong>{labels.portalLabel}</strong>
              </div>

              <span className="gm-scene06__ready">
                <i aria-hidden="true" />
                {labels.ready}
              </span>
            </div>

            <div className="gm-scene06__journey" aria-label={labels.portalLabel}>
              {journeyKeys.map((key, index) => (
                <div className="gm-scene06__journey-step" key={key}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <i aria-hidden="true" />
                  <strong>{labels.journey[key]}</strong>
                </div>
              ))}
            </div>

            <div className="gm-scene06__experience">
              <section className="gm-scene06__pass">
                <div className="gm-scene06__avatar" aria-hidden="true">
                  <span />
                  <i />
                </div>

                <div className="gm-scene06__pass-copy">
                  <p>{labels.passEyebrow}</p>
                  <strong>{labels.passName}</strong>
                  <span>{labels.passMeta}</span>
                </div>

                <div className="gm-scene06__qr" aria-hidden="true">
                  {Array.from({length: 16}, (_, index) => (
                    <span
                      className={qrCells.includes(index as (typeof qrCells)[number]) ? "is-active" : ""}
                      key={index}
                    />
                  ))}
                </div>
              </section>

              <div className="gm-scene06__scanner" aria-hidden="true">
                <span className="gm-scene06__scanner-ring gm-scene06__scanner-ring--one" />
                <span className="gm-scene06__scanner-ring gm-scene06__scanner-ring--two" />
                <span className="gm-scene06__scanner-core">GM</span>
                <span className="gm-scene06__scanner-beam" />
              </div>

              <section className="gm-scene06__access">
                <p>{labels.accessLabel}</p>

                <div className="gm-scene06__check" aria-hidden="true">
                  <span>✓</span>
                </div>

                <strong>{labels.accessStatus}</strong>
                <span>{labels.accessTime}</span>
              </section>
            </div>

            <div className="gm-scene06__bottom">
              <section className="gm-scene06__system">
                <p className="gm-kicker">{labels.systemEyebrow}</p>
                <strong>{labels.systemTitle}</strong>
                <span>{labels.systemBody}</span>

                <div className="gm-scene06__system-line" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
              </section>

              <aside className="gm-scene06__welcome">
                <p className="gm-kicker">{labels.welcomeEyebrow}</p>
                <strong>{labels.welcomeTitle}</strong>
                <p>{labels.welcomeBody}</p>
              </aside>
            </div>
          </div>
        </ScrollTransform>
      </div>
    </Scene>
  );
}