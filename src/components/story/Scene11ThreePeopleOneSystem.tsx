import {Scene, ScrollTransform} from "react-kino";

type Scene11ThreePeopleOneSystemLabels = {
  kicker: string;
  title: string;
  body: string;
  demo: string;
  systemLabel: string;
  connected: string;
  roles: {
    admin: string;
    team: string;
    member: string;
  };
  roleMeta: {
    admin: string;
    team: string;
    member: string;
  };
  roleAction: {
    admin: string;
    team: string;
    member: string;
  };
  roleMoment: {
    admin: string;
    team: string;
    member: string;
  };
  sharedEyebrow: string;
  sharedTitle: string;
  sharedBody: string;
  contextItems: {
    members: string;
    payments: string;
    access: string;
    training: string;
  };
  insightEyebrow: string;
  insightTitle: string;
  insightBody: string;
};

const roleKeys = ["admin", "team", "member"] as const;
const contextKeys = ["members", "payments", "access", "training"] as const;

export function Scene11ThreePeopleOneSystem({
  labels
}: {
  labels: Scene11ThreePeopleOneSystemLabels;
}) {
  return (
    <Scene
      duration="180vh"
      className="gm-scene11"
      aria-labelledby="scene11-title"
    >
      <div className="gm-scene11__ambient" aria-hidden="true" />

      <div className="gm-shell gm-scene11__layout">
        <header className="gm-scene11__copy">
          <p className="gm-section-index">11 / {labels.kicker}</p>
          <h2 id="scene11-title">{labels.title}</h2>
          <p className="gm-copy">{labels.body}</p>
          <span className="gm-scene11__demo">{labels.demo}</span>
        </header>

        <ScrollTransform
          from={{y: 16, opacity: 0.54, scale: 0.985}}
          to={{y: 0, opacity: 1, scale: 1}}
          at={0}
          span={0.1}
          easing="ease-out"
          className="gm-scene11__motion"
        >
          <div className="gm-scene11__stage">
            <div className="gm-scene11__stage-grid" aria-hidden="true" />
            <div className="gm-scene11__glow" aria-hidden="true" />

            <div className="gm-scene11__topline">
              <div>
                <span className="gm-scene11__status-dot" aria-hidden="true" />
                <strong>{labels.systemLabel}</strong>
              </div>

              <span className="gm-scene11__connected">
                <i aria-hidden="true" />
                {labels.connected}
              </span>
            </div>

            <div className="gm-scene11__people">
              <div className="gm-scene11__thread" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              {roleKeys.map((key, index) => (
                <article
                  className="gm-scene11__person"
                  data-role={key}
                  data-index={index + 1}
                  key={key}
                >
                  <div className="gm-scene11__avatar" aria-hidden="true">
                    <span />
                    <i />
                  </div>

                  <div className="gm-scene11__person-copy">
                    <p>{labels.roles[key]}</p>
                    <strong>{labels.roleAction[key]}</strong>
                    <span>{labels.roleMeta[key]}</span>
                  </div>

                  <div className="gm-scene11__moment">
                    <i aria-hidden="true" />
                    <span>{labels.roleMoment[key]}</span>
                  </div>
                </article>
              ))}
            </div>

            <section className="gm-scene11__shared">
              <div className="gm-scene11__shared-copy">
                <p className="gm-kicker">{labels.sharedEyebrow}</p>
                <strong>{labels.sharedTitle}</strong>
                <span>{labels.sharedBody}</span>
              </div>

              <div className="gm-scene11__context">
                {contextKeys.map((key, index) => (
                  <span data-index={index + 1} key={key}>
                    <i aria-hidden="true" />
                    {labels.contextItems[key]}
                  </span>
                ))}
              </div>

              <div className="gm-scene11__core" aria-hidden="true">
                <span />
                <strong>GM</strong>
                <i />
              </div>
            </section>

            <aside className="gm-scene11__insight">
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