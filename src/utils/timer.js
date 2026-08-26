// Countdown Timer Utilities for ECHOFORM Event

export function calculateTimeRemaining(eventDateStr, startTimeStr, endTimeStr) {
  const now = new Date();
  
  // Format: eventDateStr = "2026-08-31", endTimeStr = "16:30"
  const [year, month, day] = (eventDateStr || '2026-08-31').split('-').map(Number);
  const [endHours, endMins] = (endTimeStr || '16:30').split(':').map(Number);
  const [startHours, startMins] = (startTimeStr || '11:30').split(':').map(Number);

  const eventStart = new Date(year, month - 1, day, startHours, startMins, 0);
  const eventEnd = new Date(year, month - 1, day, endHours, endMins, 0);

  const isBeforeStart = now < eventStart;
  const isEnded = now > eventEnd;

  let targetDate = eventEnd;
  let statusText = 'TIME REMAINING';

  if (isBeforeStart) {
    targetDate = eventStart;
    statusText = 'STARTS IN';
  } else if (isEnded) {
    return {
      hours: '00',
      minutes: '00',
      seconds: '00',
      totalMs: 0,
      isEnded: true,
      isBeforeStart: false,
      statusText: "TIME'S UP! EVENT ENDED"
    };
  }

  const diffMs = Math.max(0, targetDate.getTime() - now.getTime());
  const totalSecs = Math.floor(diffMs / 1000);

  const hours = Math.floor(totalSecs / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const seconds = totalSecs % 60;

  return {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    totalMs: diffMs,
    isEnded: false,
    isBeforeStart,
    statusText
  };
}
