import {Scene, ScrollTransform} from "react-kino";

type Labels = {
  kicker: string;
  title: string;
  body: string;
  demo: string;
  sessionLabel: string;
  sessionMeta: string;
  sessionLive: string;
  exercises: {squat: string; press: string; row: string};
  exerciseMeta: {squat: string; press: string; row: string};
  completionLabel: string;
  completionMeta: string;
  progressLabel: string;
  progressMeta: string;
  metrics: {consistency: string; volume: string; sessions: string};
  metricMeta: {consistency: string; volume: string; sessions: string};
  focusEyebrow: string;
  focusTitle: string;
  focusBody: string;
  insightEyebrow: string;
  insightTitle: string;
  insightBody: string;
};

const exerciseValues = {squat: "4 × 8", press: "3 × 10", row: "4 × 12"} as const;
const metricValues = {consistency: "87%", volume: "+18%", sessions: "32"} as const;
const weeks = ["W1", "W4", "W8", "W12"] as const;

export function Scene07TrainingProgress({labels}: {labels: Labels}) {
  const exercises = [
    {key: "squat", tone: "cyan"},
    {key: "press", tone: "violet"},
    {key: "row", tone: "green"}
  ] as const;

  const metrics = [
    {key: "consistency", tone: "cyan"},
    {key: "volume", tone: "violet"},
    {key: "sessions", tone: "green"}
  ] as const;

  return (
    <Scene duration="180vh" className="gm-scene07" aria-labelledby="scene07-title">
      <div className="gm-scene07__ambient" aria-hidden="true" />

      <div className="gm-shell gm-scene07__layout">
        <header className="gm-scene07__copy">
          <p className="gm-section-index">07 / {labels.kicker}</p>
          <h2 id="scene07-title">{labels.title}</h2>
          <p className="gm-copy">{labels.body}</p>
          <span className="gm-scene07__demo">{labels.demo}</span>
        </header>

        <ScrollTransform
          from={{x: 20, opacity: 0.55, scale: 0.985}}
          to={{x: 0, opacity: 1, scale: 1}}
          at={0}
          span={0.1}
          easing="ease-out"
          className="gm-scene07__motion"
        >
          <div className="gm-scene07__stage">
            <div className="gm-scene07__stage-grid" aria-hidden="true" />

            <div className="gm-scene07__topline">
              <div>
                <span className="gm-scene07__status-dot" aria-hidden="true" />
                <strong>{labels.sessionLabel}</strong>
              </div>
              <span className="gm-scene07__live"><i aria-hidden="true" />{labels.sessionLive}</span>
            </div>

            <div className="gm-scene07__training-grid">
              <section className="gm-scene07__session">
                <div className="gm-scene07__session-head">
                  <div>
                    <p>{labels.sessionLabel}</p>
                    <strong>{labels.sessionMeta}</strong>
                  </div>
                  <span>03 / 04</span>
                </div>

                <div className="gm-scene07__exercise-list">
                  {exercises.map((exercise, index) => (
                    <article className="gm-scene07__exercise" data-tone={exercise.tone} key={exercise.key}>
                      <span className="gm-scene07__exercise-index">{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <strong>{labels.exercises[exercise.key]}</strong>
                        <small>{labels.exerciseMeta[exercise.key]}</small>
                      </div>
                      <b>{exerciseValues[exercise.key]}</b>
                    </article>
                  ))}
                </div>
              </section>

              <section className="gm-scene07__core" aria-label={labels.completionLabel}>
                <span className="gm-scene07__orbit gm-scene07__orbit--one" aria-hidden="true" />
                <span className="gm-scene07__orbit gm-scene07__orbit--two" aria-hidden="true" />
                <div className="gm-scene07__completion">
                  <span>72%</span>
                  <strong>{labels.completionLabel}</strong>
                  <small>{labels.completionMeta}</small>
                </div>
                <div className="gm-scene07__pulse" aria-hidden="true"><i /><i /><i /></div>
              </section>

              <section className="gm-scene07__progress">
                <div className="gm-scene07__progress-head">
                  <div>
                    <p>{labels.progressLabel}</p>
                    <strong>{labels.progressMeta}</strong>
                  </div>
                  <span>+18%</span>
                </div>

                <div className="gm-scene07__chart">
                  <svg aria-hidden="true" viewBox="0 0 320 116">
                    <path
                      d="M8 102 C44 98 56 83 86 80 C118 77 126 59 158 60 C188 61 208 44 232 42 C264 39 276 21 312 18"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />
                  </svg>
                  <div className="gm-scene07__weeks" aria-hidden="true">
                    {weeks.map((week) => <span key={week}>{week}</span>)}
                  </div>
                </div>

                <div className="gm-scene07__metrics">
                  {metrics.map((metric) => (
                    <article data-tone={metric.tone} key={metric.key}>
                      <span>{labels.metrics[metric.key]}</span>
                      <strong>{metricValues[metric.key]}</strong>
                      <small>{labels.metricMeta[metric.key]}</small>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <div className="gm-scene07__bottom">
              <section className="gm-scene07__focus">
                <p className="gm-kicker">{labels.focusEyebrow}</p>
                <strong>{labels.focusTitle}</strong>
                <span>{labels.focusBody}</span>
                <div aria-hidden="true"><i /><i /><i /><i /></div>
              </section>

              <aside className="gm-scene07__insight">
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