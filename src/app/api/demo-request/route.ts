import nodemailer from "nodemailer";
import {NextResponse} from "next/server";

export const runtime = "nodejs";

type DemoRequestPayload = {
  name: string;
  gym: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  message: string;
  locale: string;
};

function asText(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.trim().slice(0, maxLength)
    : "";
}

function safeHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let raw: unknown;

  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      {ok: false, error: "invalid_payload"},
      {status: 400}
    );
  }

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return NextResponse.json(
      {ok: false, error: "invalid_payload"},
      {status: 400}
    );
  }

  const input = raw as Record<string, unknown>;

  const payload: DemoRequestPayload = {
    name: asText(input.name, 120),
    gym: asText(input.gym, 160),
    email: asText(input.email, 200),
    phone: asText(input.phone, 80),
    city: asText(input.city, 120),
    country: asText(input.country, 120),
    message: asText(input.message, 3000),
    locale: asText(input.locale, 8)
  };

  if (
    !payload.name ||
    !payload.gym ||
    !payload.email ||
    !isValidEmail(payload.email)
  ) {
    return NextResponse.json(
      {ok: false, error: "validation_failed"},
      {status: 400}
    );
  }

  const smtpUser = process.env.YAHOO_SMTP_USER?.trim();
  const smtpPassword = process.env.YAHOO_SMTP_APP_PASSWORD?.trim();
  const recipient =
    process.env.DEMO_RECIPIENT_EMAIL?.trim() || smtpUser;

  if (!smtpUser || !smtpPassword || !recipient) {
    console.error("[demo-request] SMTP configuration is incomplete.");

    return NextResponse.json(
      {ok: false, error: "mail_not_configured"},
      {status: 503}
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPassword
    }
  });

  const subjectGym = safeHeader(payload.gym);

  const body = [
    "Nueva solicitud de demostraci\u00f3n de Gym Master",
    "",
    `Nombre: ${payload.name}`,
    `Gimnasio / empresa: ${payload.gym}`,
    `Email: ${payload.email}`,
    `Tel\u00e9fono / WhatsApp: ${payload.phone || "-"}`,
    `Ciudad: ${payload.city || "-"}`,
    `Pa\u00eds: ${payload.country || "-"}`,
    `Idioma de la landing: ${payload.locale || "-"}`,
    "",
    "Mensaje:",
    payload.message || "-"
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `"Gym Master" <${smtpUser}>`,
      to: recipient,
      replyTo: payload.email,
      subject: `[GM-DEMO] Solicitud de demo - ${subjectGym}`,
      text: body
    });

    return NextResponse.json({ok: true});
  } catch (error) {
    console.error("[demo-request] Yahoo SMTP delivery failed.", error);

    return NextResponse.json(
      {ok: false, error: "delivery_failed"},
      {status: 502}
    );
  }
}
