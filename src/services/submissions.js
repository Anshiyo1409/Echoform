import { getItem, setItem, KEYS } from './storage';

export function getSubmissions() {
  return getItem(KEYS.SUBMISSIONS) || [];
}

export function getSubmissionByTeamId(teamId) {
  const submissions = getSubmissions();
  return submissions.find(s => s.teamId === teamId);
}

export function saveSubmission(submissionData) {
  const submissions = getSubmissions();
  const index = submissions.findIndex(s => s.teamId === submissionData.teamId);
  
  const payload = {
    id: submissionData.id || `sub-${submissionData.teamId}-${Date.now()}`,
    teamId: submissionData.teamId,
    projectName: submissionData.projectName,
    description: submissionData.description || '',
    rationale: submissionData.rationale || '',
    figmaUrl: submissionData.figmaUrl || '',
    canvaUrl: submissionData.canvaUrl || '',
    thumbnailUrl: submissionData.thumbnailUrl || '',
    submittedAt: new Date().toISOString()
  };

  if (index !== -1) {
    submissions[index] = payload;
  } else {
    submissions.push(payload);
  }

  setItem(KEYS.SUBMISSIONS, submissions);
  return payload;
}

export function deleteSubmission(submissionId) {
  const submissions = getSubmissions();
  const filtered = submissions.filter(s => s.id !== submissionId);
  setItem(KEYS.SUBMISSIONS, filtered);
  return true;
}
