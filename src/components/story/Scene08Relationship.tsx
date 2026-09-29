"use client";

import {Scene, ScrollTransform} from "react-kino";

type Scene08RelationshipLabels = {
  kicker: string;
  title: string;
  body: string;
  demo: string;
  loopLabel: string;
  connected: string;
  timeline: {
    today: string;
    followUp: string;
    nextVisit: string;
  };
  memberEyebrow: string;
  memberName: string;
  memberMeta: string;
  workoutEyebrow: string;
  workoutTitle: string;
  workoutMeta: string;
  messageEyebrow: string;
  messageTitle: string;
  messageBody: string;
  reminderEyebrow: string;
  reminderTitle: string;
  reminderMeta: string;
  continuityEyebrow: string;
  continuityTitle: string;
  continuityBody: string;
  insightEyebrow: string;
  insightTitle: string;
  insightBody: string;
};

const timelineKeys = ["today", "followUp", "nextVisit"] as const;

export function Scene08Relationship({
  labels
}: {
  labels: Scene08RelationshipLabels;
}) {
  return (
    <Scene
      duration="180vh"
      className="gm-scene08"
      aria-labelledby="scene08-title"
    >
      <div className="gm-scene08__ambient" aria-hidden="true" />

      <div className="gm-shell gm-scene08__layout">
        <header className="gm-scene08__copy">
          <p className="gm-section-index">08 / {labels.kicker}</p>
          <h2 id="scene08-title">{labels.title}</h2>
          <p className="gm-copy">{labels.body}</p>
          <span className="gm-scene08__demo">{labels.demo}</span>
        </header>

        <ScrollTransform
          from={{y: 16, opacity: 0.55, scale: 0.985}}
          to={{y: 0, opacity: 1, scale: 1}}
          at={0}
          span={0.1}
          easing="ease-out"
          className="gm-scene08__motion"
        >
          <div className="gm-scene08__stage">
            <div className="gm-scene08__stage-grid" aria-hidden="true" />
            <div className="gm-scene08__glow" aria-hidden="true" />

            <div className="gm-scene08__topline">
              <div>
                <span className="gm-scene08__status-dot" aria-hidden="true" />
                <strong>{labels.loopLabel}</strong>
              </div>

              <span className="gm-scene08__connected">
                <i aria-hidden="true" />
                {labels.connected}
              </span>
            </div>

            <div className="gm-scene08__timeline">
              {timelineKeys.map((key, index) => (
                <div className="gm-scene08__timeline-step" key={key}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <i aria-hidden="true" />
                  <strong>{labels.timeline[key]}</strong>
                </div>
              ))}
            </div>

            <div className="gm-scene08__relationship">
              <section className="gm-scene08__touchpoints">
                <article className="gm-scene08__touch gm-scene08__touch--workout">
                  <p>{labels.workoutEyebrow}</p>
                  <strong>{labels.workoutTitle}</strong>
                  <span>{labels.workoutMeta}</span>
                  <div aria-hidden="true"><i /><i /><i /></div>
                </article>

                <article className="gm-scene08__touch gm-scene08__touch--message">
                  <p>{labels.messageEyebrow}</p>
                  <strong>{labels.messageTitle}</strong>
                  <span>{labels.messageBody}</span>
                  <div className="gm-scene08__message-pulse" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                </article>
              </section>

              <section className="gm-scene08__member">
                <span className="gm-scene08__orbit gm-scene08__orbit--one" aria-hidden="true" />
                <span className="gm-scene08__orbit gm-scene08__orbit--two" aria-hidden="true" />
                <span className="gm-scene08__connector gm-scene08__connector--left" aria-hidden="true" />
                <span className="gm-scene08__connector gm-scene08__connector--right" aria-hidden="true" />

                <div className="gm-scene08__member-card">
                  <div className="gm-scene08__avatar" aria-hidden="true">
                    <span />
                    <i />
                  </div>
                  <p>{labels.memberEyebrow}</p>
                  <strong>{labels.memberName}</strong>
                  <span>{labels.memberMeta}</span>
                </div>
              </section>

              <section className="gm-scene08__touchpoints">
                <article className="gm-scene08__touch gm-scene08__touch--reminder">
                  <p>{labels.reminderEyebrow}</p>
                  <strong>{labels.reminderTitle}</strong>
                  <span>{labels.reminderMeta}</span>
                  <div className="gm-scene08__calendar" aria-hidden="true">
                    <b>18</b>
                    <small>30</small>
                  </div>
                </article>

                <article className="gm-scene08__touch gm-scene08__touch--continuity">
                  <p>{labels.continuityEyebrow}</p>
                  <strong>{labels.continuityTitle}</strong>
                  <span>{labels.continuityBody}</span>
                  <div className="gm-scene08__continuity-line" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </article>
              </section>
            </div>

            <aside className="gm-scene08__insight">
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