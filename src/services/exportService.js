import { getTeams } from './teams';
import { getAssignments } from './assignments';
import { getSubmissions } from './submissions';
import { getSounds } from './sounds';
import { getContexts } from './contexts';

/**
 * Compiles team details along with assigned challenges and submissions.
 */
export function getExportData() {
  const teams = getTeams();
  const assignments = getAssignments();
  const submissions = getSubmissions();
  const sounds = getSounds();
  const contexts = getContexts();

  return teams.map((team) => {
    const asg = assignments.find((a) => a.teamId === team.id);
    const sound = asg ? (asg.sound || sounds.find((s) => s.id === asg.soundId)) : null;
    const context = asg ? (asg.context || contexts.find((c) => c.id === asg.contextId)) : null;
    const sub = submissions.find((s) => s.teamId === team.id);

    return {
      gameroomId: team.gameroomId || 'DEFAULT',
      teamId: team.id,
      teamName: team.teamName,
      assignedSound: sound ? sound.name : 'Unassigned',
      assignedContext: context ? `${context.name} ${context.icon || ''}`.trim() : 'Unassigned',
      revealStatus: asg ? (asg.revealed ? 'Revealed' : 'Not Revealed') : 'N/A',
      submissionStatus: sub ? 'Submitted' : 'Pending',
      projectName: sub?.projectName || '',
      figmaUrl: sub?.figmaUrl || '',
      canvaUrl: sub?.canvaUrl || '',
      submittedAt: sub?.submittedAt ? new Date(sub.submittedAt).toLocaleString() : ''
    };
  });
}

/**
 * Triggers a browser download for a CSV file of team details and challenges.
 */
export function exportToCSV(filename = 'echoform_team_challenges.csv') {
  const data = getExportData();
  if (!data || data.length === 0) return false;

  const headers = [
    'Gameroom ID',
    'Team ID',
    'Team Name',
    'Assigned Sound',
    'Assigned Context',
    'Reveal Status',
    'Submission Status',
    'Project Name',
    'Figma URL',
    'Canva URL',
    'Submitted At'
  ];

  const csvRows = [];
  csvRows.push(headers.join(','));

  data.forEach((row) => {
    const values = [
      row.gameroomId,
      row.teamId,
      row.teamName,
      row.assignedSound,
      row.assignedContext,
      row.revealStatus,
      row.submissionStatus,
      row.projectName,
      row.figmaUrl,
      row.canvaUrl,
      row.submittedAt
    ].map((val) => {
      const escaped = ('' + (val || '')).replace(/"/g, '""');
      return `"${escaped}"`;
    });

    csvRows.push(values.join(','));
  });

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
}

/**
 * Triggers a browser download for a JSON file of team details and challenges.
 */
export function exportToJSON(filename = 'echoform_team_challenges.json') {
  const data = getExportData();
  if (!data || data.length === 0) return false;

  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
}
