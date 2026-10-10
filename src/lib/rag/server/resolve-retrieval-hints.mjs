import { normalizeText } from "../retrieval/normalize-query.mjs";
import { uniqueTokens } from "../retrieval/tokenize.mjs";

const RULES = [
  {
    topic: "product-overview",
    profile: "general",
    phrases: [
      "que es gym master",
      "what is gym master",
      "que hace gym master",
      "what does gym master do",
      "plataforma gym master",
      "gym master platform"
    ],
    tokens: [
      "plataforma",
      "platform",
      "overview",
      "solucion",
      "solution"
    ]
  },
  {
    topic: "demo-sales",
    profile: "general",
    phrases: [
      "cuanto cuesta",
      "how much does",
      "request a demo",
      "solicitar una demo",
      "quiero una demo",
      "quiero una demostracion",
      "want a demo",
      "como es la implementacion",
      "como se implementa gym master",
      "implementation of gym master",
      "how is gym master implemented",
      "quiero contratar gym master",
      "contratar gym master",
      "quiero comprar gym master",
      "comprar gym master",
      "purchase gym master",
      "buy gym master",
      "want to buy gym master",
      "hablar con ventas",
      "contactar al equipo de ventas",
      "talk to sales",
      "contact sales",
      "sales contact"
    ],
    tokens: [
      "precio",
      "precios",
      "pricing",
      "price",
      "cost",
      "cuesta",
      "demo",
      "demostracion",
      "trial",
      "prueba",
      "contrato",
      "contract"
    ]
  },
  {
    topic: "faq",
    profile: "general",
    phrases: [
      "inteligencia artificial",
      "artificial intelligence",
      "predecir abandono",
      "predict churn",
      "predict which member",
      "usa ia",
      "uses ai"
    ],
    tokens: [
      "ia",
      "ai",
      "churn",
      "abandono",
      "predict",
      "predecir"
    ]
  },
  {
    topic: "intelligence",
    profile: "admin",
    phrases: [
      "que puede ver un administrador",
      "what can an administrator see",
      "entender como funciona el gimnasio",
      "understand gym activity",
      "reportes e indicadores",
      "reports and indicators"
    ],
    tokens: [
      "reportes",
      "reports",
      "indicadores",
      "indicators",
      "kpi",
      "metricas",
      "metrics",
      "analytics",
      "dashboard",
      "tablero"
    ]
  },
  {
    topic: "operations",
    profile: "team",
    phrases: [
      "ingreso de un socio",
      "member check in",
      "check in payments sales stock",
      "acceso pagos ventas stock",
      "pagos ventas y stock",
      "payments sales and stock"
    ],
    tokens: [
      "ingreso",
      "checkin",
      "acceso",
      "access",
      "ventas",
      "sales",
      "stock",
      "inventario",
      "inventory",
      "caja",
      "pos"
    ]
  },
  {
    topic: "training-progress",
    profile: "member",
    phrases: [
      "entrenamiento y progreso",
      "training and progress",
      "evolucion fisica",
      "physical progress"
    ],
    tokens: [
      "entrenamiento",
      "training",
      "rutina",
      "rutinas",
      "routine",
      "workout",
      "dieta",
      "diet",
      "progreso",
      "progress",
      "evolucion",
      "evolution"
    ]
  },
  {
    topic: "relationship",
    profile: "member",
    phrases: [
      "seguimiento mensajes",
      "follow up messages",
      "proxima visita",
      "next visit"
    ],
    tokens: [
      "seguimiento",
      "followup",
      "mensajes",
      "messages",
      "notificaciones",
      "notifications",
      "visita",
      "visit",
      "comunicacion",
      "communication"
    ]
  },
  {
    topic: "modules",
    profile: "general",
    phrases: [
      "que modulos",
      "what modules",
      "que funcionalidades",
      "what features"
    ],
    tokens: [
      "modulo",
      "modulos",
      "modules",
      "funcionalidad",
      "funcionalidades",
      "features"
    ]
  },
  {
    topic: "team-commercial",
    profile: "team",
    phrases: [
      "equipo comercial",
      "commercial team",
      "usuario comercial",
      "commercial user"
    ],
    tokens: [
      "comercial",
      "commercial",
      "kiosco",
      "kiosk"
    ]
  },
  {
    topic: "administrator",
    profile: "admin",
    phrases: [
      "rol administrador",
      "administrator role",
      "puede hacer un administrador",
      "can an administrator do"
    ],
    tokens: [
      "administrador",
      "administrator",
      "admin"
    ]
  },
  {
    topic: "member",
    profile: "member",
    phrases: [
      "experiencia del socio",
      "member experience",
      "puede ver un socio",
      "can a member see"
    ],
    tokens: [
      "socio",
      "socios",
      "member",
      "members"
    ]
  }
];

function scoreRule(rule, query) {
  const normalized = normalizeText(query);
  const tokens = new Set(uniqueTokens(query));

  let score = 0;
  let phraseHits = 0;
  let tokenHits = 0;

  for (const phrase of rule.phrases) {
    if (normalized.includes(normalizeText(phrase))) {
      score += 5;
      phraseHits += 1;
    }
  }

  for (const token of rule.tokens) {
    if (tokens.has(normalizeText(token))) {
      score += 1;
      tokenHits += 1;
    }
  }

  return {
    score,
    phraseHits,
    tokenHits
  };
}

export function resolveRetrievalHints(query) {
  if (typeof query !== "string" || query.trim().length === 0) {
    throw new Error("query must be a non-empty string");
  }

  const ranked = RULES
    .map((rule, index) => ({
      ...rule,
      index,
      signals: scoreRule(rule, query)
    }))
    .filter((candidate) => candidate.signals.score > 0)
    .sort((a, b) =>
      b.signals.score - a.signals.score ||
      b.signals.phraseHits - a.signals.phraseHits ||
      b.signals.tokenHits - a.signals.tokenHits ||
      a.index - b.index
    );

  const winner = ranked[0];

  if (!winner || winner.signals.score < 2) {
    return {
      topicHint: undefined,
      profileHint: undefined,
      confidence: "none"
    };
  }

  const runnerUp = ranked[1];
  const margin =
    winner.signals.score -
    (runnerUp?.signals.score ?? 0);

  return {
    topicHint: winner.topic,
    profileHint: winner.profile,
    confidence:
      winner.signals.phraseHits > 0 || margin >= 2
        ? "high"
        : "medium"
  };
}
