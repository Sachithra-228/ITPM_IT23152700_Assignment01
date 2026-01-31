import type { ArtifactStatus, ArtifactType, Artifact } from './types';
import testcases from './testcases.json';

type RawTestcase = {
  id: string;
  name: string;
  category: string;
  inputLengthType: string;
  input: string;
  expected: string;
  actual: string;
  status: string;
};

const statusMap = (status: string): ArtifactStatus => {
  const normalized = status.trim().toLowerCase();
  if (normalized === 'pass') return 'passed';
  if (normalized === 'fail') return 'failed';
  return 'flaky';
};

const baseTimestamp = new Date('2026-01-31T10:24:00Z').getTime();

export const artifacts: Artifact[] = (testcases as RawTestcase[]).map((tc, index) => {
  const status = statusMap(tc.status);
  const type: ArtifactType = 'screenshot';
  const recordedAt = new Date(baseTimestamp + index * 90 * 1000).toISOString(); // 90s spacing for readability
  const duration = 16 + (index % 4) * 3;
  const mediaSrc = `/assets/screens/${tc.id}.png`;
  const videoSrc = `/assets/videos/${tc.id}.webm`;
  return {
    id: tc.id,
    title: tc.name,
    scenario: tc.input,
    status,
    type,
    suite: 'SwiftTranslator - Playwright automation',
    specPath: 'singlish_to_sinhala.spec.js',
    browser: 'chromium',
    recordedAt,
    duration,
    tags: [tc.category, `len-${tc.inputLengthType.toLowerCase()}`],
    media: {
      kind: 'screenshot',
      src: mediaSrc,
    },
    videoSrc,
    hasVideo: true,
    summary: tc.expected,
  };
});
