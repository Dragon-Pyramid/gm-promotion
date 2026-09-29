export type StoryScene = {
  id: string;
  chapter: "identity" | "transformation" | "control" | "operation" | "experience" | "intelligence";
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
  },
  {
    id: "scene-03",
    chapter: "control",
    duration: "180vh",
    motionMode: "kino",
    fallbackMode: "natural",
    analyticsId: "story_admin_overview"
  },
  {
    id: "scene-04",
    chapter: "control",
    duration: "180vh",
    motionMode: "kino",
    fallbackMode: "natural",
    analyticsId: "story_admin_business"
  },
  {
    id: "scene-05",
    chapter: "operation",
    duration: "180vh",
    motionMode: "kino",
    fallbackMode: "natural",
    analyticsId: "story_team_operation"
  },
  {
    id: "scene-06",
    chapter: "experience",
    duration: "180vh",
    motionMode: "kino",
    fallbackMode: "natural",
    analyticsId: "story_member_entry"
  },
  {
    id: "scene-07",
    chapter: "experience",
    duration: "180vh",
    motionMode: "kino",
    fallbackMode: "natural",
    analyticsId: "story_training_progress"
  },
  {
    id: "scene-08",
    chapter: "experience",
    duration: "180vh",
    motionMode: "kino",
    fallbackMode: "natural",
    analyticsId: "story_relationship"
  },
  {
    id: "scene-09",
    chapter: "intelligence",
    duration: "180vh",
    motionMode: "kino",
    fallbackMode: "natural",
    analyticsId: "story_intelligence_data"
  }
];
