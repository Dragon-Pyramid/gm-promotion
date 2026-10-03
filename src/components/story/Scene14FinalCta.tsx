import {Scene, ScrollTransform} from "react-kino";

import {Link} from "@/i18n/navigation";

type Scene14FinalCtaLabels = {
  kicker: string;
  title: string;
  body: string;
  brandEyebrow: string;
  brandLine: string;
  cta: string;
  ctaMeta: string;
  closingEyebrow: string;
  closingTitle: string;
  closingBody: string;
};

export function Scene14FinalCta({
  labels
}: {
  labels: Scene14FinalCtaLabels;
}) {
  return (
    <Scene
      duration="180vh"
      className="gm-scene14"
      aria-labelledby="scene14-title"
    >
      <div className="gm-scene14__ambient" aria-hidden="true" />

      <div className="gm-shell gm-scene14__layout">
        <ScrollTransform
          from={{y: 18, opacity: 0.5, scale: 0.985}}
          to={{y: 0, opacity: 1, scale: 1}}
          at={0}
          span={0.12}
          easing="ease-out"
          className="gm-scene14__motion"
        >
          <section className="gm-scene14__stage">
            <div className="gm-scene14__grid" aria-hidden="true" />
            <div className="gm-scene14__glow gm-scene14__glow--one" aria-hidden="true" />
            <div className="gm-scene14__glow gm-scene14__glow--two" aria-hidden="true" />

            <div className="gm-scene14__index">
              <p className="gm-section-index">14 / {labels.kicker}</p>
              <span aria-hidden="true" />
            </div>

            <div className="gm-scene14__brand" aria-hidden="true">
              <div className="gm-scene14__brand-rings">
                <span />
                <span />
                <span />
              </div>

            </div>

            <div className="gm-scene14__content">
              <p className="gm-kicker">{labels.brandEyebrow}</p>
              <span className="gm-scene14__brand-line">{labels.brandLine}</span>

              <h2 id="scene14-title">{labels.title}</h2>
              <p className="gm-scene14__body">{labels.body}</p>

              <div className="gm-scene14__action">
                <Link
                  href="/demo"
                  className="gm-scene14__cta"
                  data-cta-intent="request-demo"
                >
                  <span>{labels.cta}</span>
                  <i aria-hidden="true">↗</i>
                </Link>

                <p>{labels.ctaMeta}</p>
              </div>
            </div>

            <footer className="gm-scene14__closing">
              <div>
                <p className="gm-kicker">{labels.closingEyebrow}</p>
                <strong>{labels.closingTitle}</strong>
              </div>

              <p>{labels.closingBody}</p>
            </footer>
          </section>
        </ScrollTransform>
      </div>
    </Scene>
  );
}