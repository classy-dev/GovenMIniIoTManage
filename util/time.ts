import dayjs from 'dayjs';

export const formatSecondsToTime = (seconds: number): string => {
  const duration = dayjs.duration(seconds, 'seconds');
  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();
  const secs = duration.seconds();

  if (days >= 2) {
    return `${days}일`;
  }
  if (days === 1) {
    return '1일';
  }
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  // 최대 시간(9999:99:99) 체크
  if (hours > 9999 || minutes > 59 || secs > 59) {
    return '9999:99:99';
  }

  return formattedTime;
};
