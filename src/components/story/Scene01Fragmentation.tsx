"use client";

import {useEffect, useRef} from "react";

type Scene01Labels = {
  kicker: string;
  title: string;
  body: string;
  fragmented: string;
  gym: string;
};

type Scene01System = {
  label: string;
  tone: string;
};

type Scene01FragmentationProps = {
  labels: Scene01Labels;
  systems: readonly Scene01System[];
};

const ROUTES = [
  "M 188 124 C 300 154 356 214 424 278",
  "M 820 148 C 704 178 650 226 576 282",
  "M 132 352 C 278 350 350 346 420 344",
  "M 858 382 C 720 380 652 366 580 356",
  "M 220 580 C 316 538 364 478 426 424",
  "M 786 574 C 690 532 636 476 576 424"
] as const;

export function Scene01Fragmentation({
  labels,
  systems
}: Scene01FragmentationProps) {
  const sceneRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      scene.dataset.cinematicReady = "false";
      scene.dataset.entered = "true";
      return;
    }

    scene.dataset.cinematicReady = "true";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        window.requestAnimationFrame(() => {
          scene.dataset.entered = "true";
        });

        observer.disconnect();
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    observer.observe(scene);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sceneRef}
      id="problem"
      className="gm-problem gm-problem--cinematic"
      aria-labelledby="problem-title"
      data-cinematic-ready="false"
      data-entered="false"
    >
      <div className="gm-problem__glow" aria-hidden="true" />

      <div className="gm-shell gm-problem__layout">
        <div className="gm-problem__copy">
          <p className="gm-section-index">01 / {labels.kicker}</p>
          <h2 id="problem-title">{labels.title}</h2>
          <p className="gm-copy">{labels.body}</p>

          <div className="gm-problem__signal" aria-hidden="true">
            <span />
            <p>{labels.fragmented}</p>
          </div>
        </div>

        <div className="gm-fragment-map" aria-hidden="true">
          <svg
            className="gm-fragment-map__routes"
            viewBox="0 0 1000 700"
            preserveAspectRatio="none"
          >
            {ROUTES.map((route, index) => (
              <path
                className={`gm-fragment-route gm-fragment-route--${index + 1}`}
                d={route}
                key={route}
                pathLength="100"
              />
            ))}
          </svg>

          <div className="gm-fragment-map__center">
            <span>{labels.gym}</span>
          </div>

          {systems.map((system, index) => (
            <div
              className={`gm-system-card-shell gm-system-card-shell--${index + 1}`}
              key={`${system.label}-${index}`}
            >
              <div className="gm-system-card" data-tone={system.tone}>
                <span className="gm-system-card__dot" />
                <strong>{system.label}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}