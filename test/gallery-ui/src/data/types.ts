export type ArtifactStatus = 'failed' | 'passed' | 'flaky';
export type ArtifactType = 'screenshot' | 'video';

export type Artifact = {
  id: string;
  title: string;
  scenario: string;
  status: ArtifactStatus;
  type: ArtifactType; // primary type used for filtering (screenshot)
  suite: string;
  specPath: string;
  browser: 'chromium' | 'firefox' | 'webkit';
  recordedAt: string; // ISO string
  duration: number; // seconds
  tags: string[];
  media: {
    kind: ArtifactType;
    src: string;
    poster?: string;
  };
  videoSrc?: string; // optional video for the same artifact
  hasVideo?: boolean;
  summary: string;
};
