import { normalizeText } from "../retrieval/normalize-query.mjs";
import { uniqueTokens } from "../retrieval/tokenize.mjs";

const ALLOWED_LOCALES = new Set(["es", "en"]);

const SPANISH_PHRASES = [
  "que es",
  "que puede",
  "como ayuda",
  "como acompana",
  "como se",
  "cuanto cuesta",
  "quiero una demo",
  "quiero una demostracion",
  "quiero contratar",
  "quiero comprar",
  "puedo",
  "hay "
];

const ENGLISH_PHRASES = [
  "what is",
  "what can",
  "how does",
  "how are",
  "how much",
  "does gym master",
  "can i",
  "are there",
  "i want"
];

const SPANISH_TOKENS = new Set([
  "administrador",
  "gimnasio",
  "socio",
  "socios",
  "cuota",
  "cuotas",
  "pagos",
  "entrenamiento",
  "rutina",
  "rutinas",
  "dieta",
  "dietas",
  "precio",
  "precios",
  "cuesta",
  "demostracion",
  "seguimiento",
  "mensajes",
  "notificaciones",
  "ingreso",
  "funcionalidad",
  "funcionalidades",
  "modulo",
  "modulos",
  "predecir",
  "abandono"
]);

const ENGLISH_TOKENS = new Set([
  "administrator",
  "member",
  "members",
  "membership",
  "payments",
  "training",
  "workout",
  "workouts",
  "diet",
  "price",
  "pricing",
  "demo",
  "followup",
  "messages",
  "notifications",
  "checkin",
  "feature",
  "features",
  "module",
  "modules",
  "predict",
  "churn"
]);

function assertPageLocale(pageLocale) {
  if (!ALLOWED_LOCALES.has(pageLocale)) {
    throw new Error(`Unsupported page locale: ${pageLocale}`);
  }
}

function phraseScore(normalized, phrases) {
  return phrases.reduce(
    (score, phrase) =>
      score + (normalized.includes(phrase.trim()) ? 2 : 0),
    0
  );
}

function tokenScore(tokens, dictionary) {
  return tokens.reduce(
    (score, token) =>
      score + (dictionary.has(token) ? 1 : 0),
    0
  );
}

export function resolveQueryLocale({ query, pageLocale }) {
  if (typeof query !== "string" || query.trim().length === 0) {
    throw new Error("query must be a non-empty string");
  }

  assertPageLocale(pageLocale);

  if (/[¿¡ñáéíóúü]/i.test(query)) {
    return "es";
  }

  const normalized = normalizeText(query);
  const tokens = uniqueTokens(query);

  const spanishScore =
    phraseScore(normalized, SPANISH_PHRASES) +
    tokenScore(tokens, SPANISH_TOKENS);

  const englishScore =
    phraseScore(normalized, ENGLISH_PHRASES) +
    tokenScore(tokens, ENGLISH_TOKENS);

  if (spanishScore > englishScore && spanishScore >= 2) {
    return "es";
  }

  if (englishScore > spanishScore && englishScore >= 2) {
    return "en";
  }

  return pageLocale;
}
