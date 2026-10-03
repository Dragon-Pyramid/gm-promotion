import {Scene, ScrollTransform} from "react-kino";

type Scene04AdminBusinessLabels = {
  kicker: string;
  title: string;
  body: string;
  demo: string;
  pulseLabel: string;
  resultLabel: string;
  resultMeta: string;
  trendMeta: string;
  flowTitle: string;
  flowIncome: string;
  flowExpenses: string;
  sources: {
    fees: string;
    sales: string;
    services: string;
    expenses: string;
  };
  decisionEyebrow: string;
  decisionTitle: string;
  decisionBody: string;
};

const businessSources = [
  {key: "fees", value: "74%", tone: "cyan"},
  {key: "sales", value: "16%", tone: "violet"},
  {key: "services", value: "10%", tone: "amber"},
  {key: "expenses", value: "10.6M", tone: "rose"}
] as const;

export function Scene04AdminBusiness({
  labels
}: {
  labels: Scene04AdminBusinessLabels;
}) {
  return (
    <Scene
      duration="180vh"
      className="gm-scene04"
      aria-labelledby="scene04-title"
    >
      <div className="gm-scene04__ambient" aria-hidden="true" />

      <div className="gm-shell gm-scene04__layout">
        <header className="gm-scene04__copy">
          <p className="gm-section-index">04 / {labels.kicker}</p>
          <h2 id="scene04-title">{labels.title}</h2>
          <p className="gm-copy">{labels.body}</p>
          <span className="gm-scene04__demo">{labels.demo}</span>
        </header>

        <ScrollTransform
          from={{y: 20, opacity: 0.55, scale: 0.985}}
          to={{y: 0, opacity: 1, scale: 1}}
          at={0}
          span={0.1}
          easing="ease-out"
          className="gm-scene04__visual-motion"
        >
          <div className="gm-scene04__visual-shell">
            <div className="gm-scene04__visual-grid" aria-hidden="true" />

            <div className="gm-scene04__topline">
              <div>
                <span className="gm-scene04__status-dot" aria-hidden="true" />
                <strong>{labels.pulseLabel}</strong>
              </div>
              <small>GYM MASTER</small>
            </div>

            <div className="gm-scene04__business-grid">
              <section className="gm-scene04__result-card">
                <div className="gm-scene04__result-copy">
                  <p>{labels.resultLabel}</p>
                  <strong>7.8M</strong>
                  <small>{labels.resultMeta}</small>
                </div>

                <div className="gm-scene04__trend">
                  <strong>+12.6%</strong>
                  <span>{labels.trendMeta}</span>
                </div>

                <div className="gm-scene04__rings" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              </section>

              <section className="gm-scene04__sources">
                {businessSources.map((source) => (
                  <article
                    className="gm-scene04__source"
                    data-tone={source.tone}
                    key={source.key}
                  >
                    <div className="gm-scene04__source-head">
                      <span>
                        {
                          labels.sources[
                            source.key as keyof Scene04AdminBusinessLabels["sources"]
                          ]
                        }
                      </span>
                      <i aria-hidden="true" />
                    </div>
                    <strong>{source.value}</strong>
                  </article>
                ))}
              </section>

              <section className="gm-scene04__flow">
                <div className="gm-scene04__flow-head">
                  <strong>{labels.flowTitle}</strong>
                  <div>
                    <span className="gm-scene04__legend gm-scene04__legend--income">
                      {labels.flowIncome}
                    </span>
                    <span className="gm-scene04__legend gm-scene04__legend--expenses">
                      {labels.flowExpenses}
                    </span>
                  </div>
                </div>

                <div className="gm-scene04__bars" aria-hidden="true">
                  <div><span /><i /></div>
                  <div><span /><i /></div>
                  <div><span /><i /></div>
                  <div><span /><i /></div>
                  <div><span /><i /></div>
                  <div><span /><i /></div>
                  <div><span /><i /></div>
                  <div><span /><i /></div>
                </div>

                <div className="gm-scene04__axis" aria-hidden="true">
                  <span>01</span>
                  <span>02</span>
                  <span>03</span>
                  <span>04</span>
                  <span>05</span>
                  <span>06</span>
                  <span>07</span>
                  <span>08</span>
                </div>
              </section>

              <aside className="gm-scene04__decision">
                <p className="gm-kicker">{labels.decisionEyebrow}</p>
                <strong>{labels.decisionTitle}</strong>
                <p>{labels.decisionBody}</p>

                <div className="gm-scene04__decision-signal" aria-hidden="true">
                  <span />
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