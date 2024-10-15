import dayjs from 'dayjs';

export const formatSecondsToTime = (seconds: number) => {
  const duration = dayjs.duration(seconds, 'seconds');

  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();
  const secs = duration.seconds();

  // 24시간 이상인 경우도 처리
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};
