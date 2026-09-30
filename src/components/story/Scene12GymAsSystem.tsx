"use client";

import {Scene, ScrollTransform} from "react-kino";

type Scene12GymAsSystemLabels = {
  kicker: string;
  title: string;
  body: string;
  demo: string;
  systemLabel: string;
  connected: string;
  domains: {people:string;operation:string;experience:string;data:string;infrastructure:string;};
  domainMeta: {people:string;operation:string;experience:string;data:string;infrastructure:string;};
  coreEyebrow: string;
  coreTitle: string;
  coreMeta: string;
  motionEyebrow: string;
  motionTitle: string;
  motionBody: string;
  principles: {connect:string;context:string;continuity:string;};
  principleMeta: {connect:string;context:string;continuity:string;};
  insightEyebrow: string;
  insightTitle: string;
  insightBody: string;
};

const domainKeys=["people","operation","experience","data","infrastructure"] as const;
const principleKeys=["connect","context","continuity"] as const;

export function Scene12GymAsSystem({labels}:{labels:Scene12GymAsSystemLabels}) {
  return (
    <Scene duration="180vh" className="gm-scene12" aria-labelledby="scene12-title">
      <div className="gm-scene12__ambient" aria-hidden="true" />
      <div className="gm-shell gm-scene12__layout">
        <header className="gm-scene12__copy">
          <p className="gm-section-index">12 / {labels.kicker}</p>
          <h2 id="scene12-title">{labels.title}</h2>
          <p className="gm-copy">{labels.body}</p>
          <span className="gm-scene12__demo">{labels.demo}</span>
        </header>

        <ScrollTransform from={{y:16,opacity:0.54,scale:0.985}} to={{y:0,opacity:1,scale:1}} at={0} span={0.1} easing="ease-out" className="gm-scene12__motion">
          <div className="gm-scene12__stage">
            <div className="gm-scene12__stage-grid" aria-hidden="true" />
            <div className="gm-scene12__glow" aria-hidden="true" />

            <div className="gm-scene12__topline">
              <div><span className="gm-scene12__status-dot" aria-hidden="true" /><strong>{labels.systemLabel}</strong></div>
              <span className="gm-scene12__connected"><i aria-hidden="true" />{labels.connected}</span>
            </div>

            <div className="gm-scene12__system">
              <section className="gm-scene12__organism">
                <div className="gm-scene12__orbit" aria-hidden="true">
                  <span className="gm-scene12__orbit-ring gm-scene12__orbit-ring--outer" />
                  <span className="gm-scene12__orbit-ring gm-scene12__orbit-ring--mid" />
                  <span className="gm-scene12__orbit-ring gm-scene12__orbit-ring--inner" />
                  <i className="gm-scene12__orbit-pulse" />
                </div>

                <div className="gm-scene12__core">
                  <span aria-hidden="true" />
                  <p>{labels.coreEyebrow}</p>
                  <strong>{labels.coreTitle}</strong>
                  <small>{labels.coreMeta}</small>
                </div>

                {domainKeys.map((key,index)=>(
                  <article className="gm-scene12__domain" data-domain={key} data-index={index+1} key={key}>
                    <i aria-hidden="true" />
                    <div><strong>{labels.domains[key]}</strong><span>{labels.domainMeta[key]}</span></div>
                  </article>
                ))}
              </section>

              <section className="gm-scene12__motion-panel">
                <p className="gm-kicker">{labels.motionEyebrow}</p>
                <strong>{labels.motionTitle}</strong>
                <p>{labels.motionBody}</p>
                <div className="gm-scene12__principles">
                  {principleKeys.map((key,index)=>(
                    <article key={key}>
                      <span>{String(index+1).padStart(2,"0")}</span>
                      <div><strong>{labels.principles[key]}</strong><small>{labels.principleMeta[key]}</small></div>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <aside className="gm-scene12__insight">
              <div><p className="gm-kicker">{labels.insightEyebrow}</p><strong>{labels.insightTitle}</strong></div>
              <p>{labels.insightBody}</p>
            </aside>
          </div>
        </ScrollTransform>
      </div>
    </Scene>
  );
}