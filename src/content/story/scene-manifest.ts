export type StoryScene = {
  id: string;
  chapter: "identity" | "transformation";
  duration: string;
  motionMode: "static" | "kino";
  fallbackMode: "natural" | "poster";
  analyticsId: string;
};

export const sceneManifest: StoryScene[] = [
  {
    id: "scene-00",
    chapter: "identity",
    duration: "100vh",
    motionMode: "static",
    fallbackMode: "natural",
    analyticsId: "story_identity"
  },
  {
    id: "scene-01",
    chapter: "transformation",
    duration: "100vh",
    motionMode: "static",
    fallbackMode: "natural",
    analyticsId: "story_problem"
  },
  {
    id: "scene-02",
    chapter: "transformation",
    duration: "320vh",
    motionMode: "kino",
    fallbackMode: "natural",
    analyticsId: "story_transformation"
  }
];
