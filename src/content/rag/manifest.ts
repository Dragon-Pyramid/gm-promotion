export type RagLocale = "es" | "en";
export type RagProfile = "general" | "admin" | "team" | "member";

export type RagDocument = {
  id: string;
  locale: RagLocale;
  profile: RagProfile;
  topic: string;
  path: string;
  visibility: "public";
  status: "current";
  version: number;
};

export const ragDocuments: RagDocument[] = [
  {
    id: "gm-product-overview-es",
    locale: "es",
    profile: "general",
    topic: "product-overview",
    path: "src/content/rag/es/product-overview.md",
    visibility: "public",
    status: "current",
    version: 1
  },
  {
    id: "gm-product-overview-en",
    locale: "en",
    profile: "general",
    topic: "product-overview",
    path: "src/content/rag/en/product-overview.md",
    visibility: "public",
    status: "current",
    version: 1
  },
  {
    id: "gm-administrator-es",
    locale: "es",
    profile: "admin",
    topic: "administrator",
    path: "src/content/rag/es/administrator.md",
    visibility: "public",
    status: "current",
    version: 1
  },
  {
    id: "gm-administrator-en",
    locale: "en",
    profile: "admin",
    topic: "administrator",
    path: "src/content/rag/en/administrator.md",
    visibility: "public",
    status: "current",
    version: 1
  },
  {
    id: "gm-team-commercial-es",
    locale: "es",
    profile: "team",
    topic: "team-commercial",
    path: "src/content/rag/es/team-commercial.md",
    visibility: "public",
    status: "current",
    version: 1
  },
  {
    id: "gm-team-commercial-en",
    locale: "en",
    profile: "team",
    topic: "team-commercial",
    path: "src/content/rag/en/team-commercial.md",
    visibility: "public",
    status: "current",
    version: 1
  },
  {
    id: "gm-member-es",
    locale: "es",
    profile: "member",
    topic: "member",
    path: "src/content/rag/es/member.md",
    visibility: "public",
    status: "current",
    version: 1
  },
  {
    id: "gm-member-en",
    locale: "en",
    profile: "member",
    topic: "member",
    path: "src/content/rag/en/member.md",
    visibility: "public",
    status: "current",
    version: 1
  },
  {
    id: "gm-modules-es",
    locale: "es",
    profile: "general",
    topic: "modules",
    path: "src/content/rag/es/modules.md",
    visibility: "public",
    status: "current",
    version: 1
  },
  {
    id: "gm-modules-en",
    locale: "en",
    profile: "general",
    topic: "modules",
    path: "src/content/rag/en/modules.md",
    visibility: "public",
    status: "current",
    version: 1
  },
  {
    id: "gm-operations-es",
    locale: "es",
    profile: "team",
    topic: "operations",
    path: "src/content/rag/es/operations.md",
    visibility: "public",
    status: "current",
    version: 1
  },
  {
    id: "gm-operations-en",
    locale: "en",
    profile: "team",
    topic: "operations",
    path: "src/content/rag/en/operations.md",
    visibility: "public",
    status: "current",
    version: 1
  },
  {
    id: "gm-training-progress-es",
    locale: "es",
    profile: "member",
    topic: "training-progress",
    path: "src/content/rag/es/training-progress.md",
    visibility: "public",
    status: "current",
    version: 1
  },
  {
    id: "gm-training-progress-en",
    locale: "en",
    profile: "member",
    topic: "training-progress",
    path: "src/content/rag/en/training-progress.md",
    visibility: "public",
    status: "current",
    version: 1
  },
  {
    id: "gm-relationship-es",
    locale: "es",
    profile: "member",
    topic: "relationship",
    path: "src/content/rag/es/relationship.md",
    visibility: "public",
    status: "current",
    version: 1
  },
  {
    id: "gm-relationship-en",
    locale: "en",
    profile: "member",
    topic: "relationship",
    path: "src/content/rag/en/relationship.md",
    visibility: "public",
    status: "current",
    version: 1
  },
  {
    id: "gm-intelligence-es",
    locale: "es",
    profile: "admin",
    topic: "intelligence",
    path: "src/content/rag/es/intelligence.md",
    visibility: "public",
    status: "current",
    version: 1
  },
  {
    id: "gm-intelligence-en",
    locale: "en",
    profile: "admin",
    topic: "intelligence",
    path: "src/content/rag/en/intelligence.md",
    visibility: "public",
    status: "current",
    version: 1
  },
  {
    id: "gm-demo-sales-es",
    locale: "es",
    profile: "general",
    topic: "demo-sales",
    path: "src/content/rag/es/demo-sales.md",
    visibility: "public",
    status: "current",
    version: 1
  },
  {
    id: "gm-demo-sales-en",
    locale: "en",
    profile: "general",
    topic: "demo-sales",
    path: "src/content/rag/en/demo-sales.md",
    visibility: "public",
    status: "current",
    version: 1
  },
  {
    id: "gm-faq-es",
    locale: "es",
    profile: "general",
    topic: "faq",
    path: "src/content/rag/es/faq.md",
    visibility: "public",
    status: "current",
    version: 1
  },
  {
    id: "gm-faq-en",
    locale: "en",
    profile: "general",
    topic: "faq",
    path: "src/content/rag/en/faq.md",
    visibility: "public",
    status: "current",
    version: 1
  }
];
