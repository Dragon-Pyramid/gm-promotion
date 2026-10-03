"use client";

import {FormEvent, useRef, useState} from "react";

type DemoRequestFormLabels = {
  title: string;
  body: string;
  name: string;
  namePlaceholder: string;
  gym: string;
  gymPlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  city: string;
  cityPlaceholder: string;
  country: string;
  countryPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  whatsapp: string;
};

type DemoPayload = {
  name: string;
  gym: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  message: string;
  locale: string;
};

type SubmissionState = "idle" | "sending" | "success" | "error";

const WHATSAPP_NUMBER = "5493815476502";

function readField(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function buildPayload(form: HTMLFormElement, locale: string): DemoPayload {
  const formData = new FormData(form);

  return {
    name: readField(formData, "name"),
    gym: readField(formData, "gym"),
    email: readField(formData, "email"),
    phone: readField(formData, "phone"),
    city: readField(formData, "city"),
    country: readField(formData, "country"),
    message: readField(formData, "message"),
    locale
  };
}

function buildWhatsAppMessage(payload: DemoPayload) {
  if (payload.locale === "en") {
    return [
      "Hello! I would like to request a Gym Master demo.",
      "",
      `Name: ${payload.name}`,
      `Gym / company: ${payload.gym}`,
      `Email: ${payload.email}`,
      `Phone / WhatsApp: ${payload.phone || "-"}`,
      `City: ${payload.city || "-"}`,
      `Country: ${payload.country || "-"}`,
      "",
      "What I would like to improve or solve:",
      payload.message || "-"
    ].join("\n");
  }

  return [
    "\u00a1Hola! Quiero solicitar una demostraci\u00f3n de Gym Master.",
    "",
    `Nombre: ${payload.name}`,
    `Gimnasio / empresa: ${payload.gym}`,
    `Email: ${payload.email}`,
    `Tel\u00e9fono / WhatsApp: ${payload.phone || "-"}`,
    `Ciudad: ${payload.city || "-"}`,
    `Pa\u00eds: ${payload.country || "-"}`,
    "",
    "Lo que quiero mejorar o resolver:",
    payload.message || "-"
  ].join("\n");
}

export function DemoRequestForm({
  labels,
  locale
}: {
  labels: DemoRequestFormLabels;
  locale: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = formRef.current;

    if (!form || !form.reportValidity()) {
      return;
    }

    setSubmissionState("sending");

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(buildPayload(form, locale))
      });

      if (!response.ok) {
        setSubmissionState("error");
        return;
      }

      setSubmissionState("success");
      form.reset();
    } catch {
      setSubmissionState("error");
    }
  }

  function handleWhatsApp() {
    const form = formRef.current;

    if (!form || !form.reportValidity()) {
      return;
    }

    const payload = buildPayload(form, locale);
    const message = buildWhatsAppMessage(payload);
    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      ref={formRef}
      className="gm-demo-form"
      aria-labelledby="demo-form-title"
      onSubmit={handleSubmit}
    >
      <div className="gm-demo-form__heading">
        <p className="gm-kicker">GYM MASTER</p>
        <h2 id="demo-form-title">{labels.title}</h2>
        <p>{labels.body}</p>
      </div>

      <div className="gm-demo-form__fields">
        <label>
          <span>{labels.name}</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            placeholder={labels.namePlaceholder}
            required
          />
        </label>

        <label>
          <span>{labels.gym}</span>
          <input
            name="gym"
            type="text"
            autoComplete="organization"
            placeholder={labels.gymPlaceholder}
            required
          />
        </label>

        <label>
          <span>{labels.email}</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder={labels.emailPlaceholder}
            required
          />
        </label>

        <label>
          <span>{labels.phone}</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={labels.phonePlaceholder}
          />
        </label>

        <label>
          <span>{labels.city}</span>
          <input
            name="city"
            type="text"
            autoComplete="address-level2"
            placeholder={labels.cityPlaceholder}
          />
        </label>

        <label>
          <span>{labels.country}</span>
          <input
            name="country"
            type="text"
            autoComplete="country-name"
            placeholder={labels.countryPlaceholder}
          />
        </label>

        <label className="gm-demo-form__message">
          <span>{labels.message}</span>
          <textarea
            name="message"
            rows={5}
            placeholder={labels.messagePlaceholder}
          />
        </label>
      </div>

      <div className="gm-demo-form__actions">
        <button
          className="gm-demo-form__submit"
          type="submit"
          disabled={submissionState === "sending"}
          data-cta-intent="submit-demo-request"
        >
          <span>
            {submissionState === "sending"
              ? labels.sending
              : labels.submit}
          </span>
          <i aria-hidden="true">{"\u2197"}</i>
        </button>

        <button
          className="gm-demo-form__whatsapp"
          type="button"
          onClick={handleWhatsApp}
          data-cta-intent="whatsapp-demo-request"
        >
          <span>{labels.whatsapp}</span>
          <i aria-hidden="true">{"\u2197"}</i>
        </button>
      </div>

      {submissionState === "success" ? (
        <p
          className="gm-demo-form__status gm-demo-form__status--success"
          role="status"
        >
          {labels.success}
        </p>
      ) : null}

      {submissionState === "error" ? (
        <p
          className="gm-demo-form__status gm-demo-form__status--error"
          role="alert"
        >
          {labels.error}
        </p>
      ) : null}
    </form>
  );
}
