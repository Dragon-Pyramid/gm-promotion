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
  }
];
