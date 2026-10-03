import Image from "next/image";

import {Kino, Reveal, Scene, ScrollTransform} from "react-kino";

import {GM_BRAND_ASSETS} from "@/lib/brand/assets";

type Labels = {
  kicker: string;
  title: string;
  body: string;
  connected: string;
  chips: {
    members: string;
    payments: string;
    attendance: string;
    sales: string;
    training: string;
  };
};

function Chip({
  children,
  className,
  from,
  at,
  index
}: {
  children: string;
  className: string;
  from: {x: number; y: number; rotate: number};
  at: number;
  index: string;
}) {
  return (
    <ScrollTransform
      from={{...from, opacity: 0.16, scale: 0.82}}
      to={{x: 0, y: 0, rotate: 0, opacity: 1, scale: 1}}
      at={at}
      span={0.46}
      easing="ease-out"
      className={className}
    >
      <div className="gm-chip">
        <span className="gm-chip__index">{index}</span>
        <span className="gm-chip__label">{children}</span>
        <span className="gm-chip__status" aria-hidden="true" />
      </div>
    </ScrollTransform>
  );
}

type SignalTone = "blue" | "violet" | "cyan" | "amber" | "rose";

function ConvergenceSignal({
  className,
  from,
  at,
  tone
}: {
  className: string;
  from: {x: number; y: number};
  at: number;
  tone: SignalTone;
}) {
  return (
    <ScrollTransform
      from={{...from, opacity: 0, scale: 0.58}}
      to={{x: 0, y: 0, opacity: 1, scale: 1}}
      at={at}
      span={0.24}
      easing="ease-out"
      className={className}
    >
      <span className="gm-scene02__signal-trail" aria-hidden="true" />
      <span className="gm-scene02__signal-dot" data-tone={tone} aria-hidden="true" />
    </ScrollTransform>
  );
}

export function Scene02Poc({labels}: {labels: Labels}) {
  return (
    <Kino>
      <Scene duration="320vh">
        <section className="gm-scene02" aria-labelledby="scene02-title">
          <div className="gm-scene02__grid" aria-hidden="true" />
          <div className="gm-scene02__ambient gm-scene02__ambient--one" aria-hidden="true" />
          <div className="gm-scene02__ambient gm-scene02__ambient--two" aria-hidden="true" />


          <ScrollTransform
            from={{opacity: 1}}
            to={{opacity: 0}}
            at={0.03}
            span={0.28}
            easing="ease-out"
            className="gm-scene02__residual-motion"
          >
            <div className="gm-scene02__residual" aria-hidden="true" />
          </ScrollTransform>
          <div className="gm-scene02__topline" aria-hidden="true">
            <span>02</span>
            <span>GYM MASTER</span>
            <span>GM</span>
          </div>

          <div className="gm-scene02__links" aria-hidden="true">
            <span className="gm-link gm-link--1" />
            <span className="gm-link gm-link--2" />
            <span className="gm-link gm-link--3" />
            <span className="gm-link gm-link--4" />
            <span className="gm-link gm-link--5" />
          </div>

          <ScrollTransform
            from={{opacity: 1}}
            to={{opacity: 0}}
            at={0.60}
            span={0.12}
            easing="ease-out"
            className="gm-scene02__signals-exit"
          >
            <div className="gm-scene02__signals" aria-hidden="true">
              <ConvergenceSignal
                className="gm-scene02__signal gm-scene02__signal--1"
                from={{x: -118, y: -78}}
                at={0.24}
                tone="blue"
              />
              <ConvergenceSignal
                className="gm-scene02__signal gm-scene02__signal--2"
                from={{x: 112, y: -86}}
                at={0.29}
                tone="violet"
              />
              <ConvergenceSignal
                className="gm-scene02__signal gm-scene02__signal--3"
                from={{x: -126, y: 16}}
                at={0.34}
                tone="cyan"
              />
              <ConvergenceSignal
                className="gm-scene02__signal gm-scene02__signal--4"
                from={{x: 122, y: 28}}
                at={0.39}
                tone="amber"
              />
              <ConvergenceSignal
                className="gm-scene02__signal gm-scene02__signal--5"
                from={{x: 0, y: 126}}
                at={0.44}
                tone="rose"
              />
            </div>
          </ScrollTransform>
          <div className="gm-scene02__chips" aria-hidden="true">
            <Chip
              className="gm-chip-pos gm-chip-pos--members"
              from={{x: -360, y: -190, rotate: -9}}
              at={0.04}
              index="01"
            >
              {labels.chips.members}
            </Chip>

            <Chip
              className="gm-chip-pos gm-chip-pos--payments"
              from={{x: 300, y: -210, rotate: 8}}
              at={0.08}
              index="02"
            >
              {labels.chips.payments}
            </Chip>

            <Chip
              className="gm-chip-pos gm-chip-pos--attendance"
              from={{x: -390, y: 170, rotate: 7}}
              at={0.12}
              index="03"
            >
              {labels.chips.attendance}
            </Chip>

            <Chip
              className="gm-chip-pos gm-chip-pos--sales"
              from={{x: 360, y: 155, rotate: -7}}
              at={0.16}
              index="04"
            >
              {labels.chips.sales}
            </Chip>

            <Chip
              className="gm-chip-pos gm-chip-pos--training"
              from={{x: 0, y: 310, rotate: 5}}
              at={0.20}
              index="05"
            >
              {labels.chips.training}
            </Chip>
          </div>

          <div className="gm-scene02__core-anchor">
            <ScrollTransform
              from={{scale: 0.62, opacity: 0}}
              to={{scale: 1.22, opacity: 0.72}}
              at={0.45}
              span={0.18}
              easing="ease-out"
              className="gm-scene02__ignition-motion"
            >
              <div className="gm-scene02__ignition" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </ScrollTransform>
            <ScrollTransform
              from={{scale: 0.52, opacity: 0, rotate: -3}}
              to={{scale: 1, opacity: 1, rotate: 0}}
              at={0.43}
              span={0.20}
              easing="ease-out"
              className="gm-scene02__core-entry"
            >
              <ScrollTransform
                from={{y: 0, scale: 1, opacity: 1}}
                to={{y: -138, scale: 0.72, opacity: 0.42}}
                at={0.60}
                span={0.18}
                easing="ease-out"
                className="gm-scene02__core-motion"
              >
                <div className="gm-scene02__core">
                  <span className="gm-scene02__pulse gm-scene02__pulse--one" aria-hidden="true" />
                  <span className="gm-scene02__pulse gm-scene02__pulse--two" aria-hidden="true" />

                  <div className="gm-scene02__logo-frame">
                    <Image
                      src={`${GM_BRAND_ASSETS.logoWhite.local}?context=scene02`}
                      width={2048}
                      height={2048}
                      sizes="270px"
                      alt=""
                    />
                  </div>

                  <span className="gm-scene02__core-label">{labels.connected}</span>
                </div>
              </ScrollTransform>
            </ScrollTransform>
          </div>

          <ScrollTransform
            from={{y: 0, opacity: 1}}
            to={{y: -58, opacity: 0}}
            at={0.89}
            span={0.09}
            easing="ease-in"
            className="gm-scene02__copy"
          >
            <div>
              <Reveal at={0.62} animation="fade-up">
                <p className="gm-kicker">{labels.kicker}</p>
              </Reveal>
              <Reveal at={0.68} animation="fade-up">
                <h2 id="scene02-title">{labels.title}</h2>
              </Reveal>
              <Reveal at={0.75} animation="fade-up">
                <p className="gm-copy">{labels.body}</p>
              </Reveal>
            </div>
          </ScrollTransform>
        </section>
      </Scene>
    </Kino>
  );
}