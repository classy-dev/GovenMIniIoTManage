import styled from '@emotion/styled';
import dayjs from 'dayjs';
import Sun from './icons/Sun';

const TodayWeatherWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 1.2rem;
  padding-top: 0.8rem;
  gap: 0.8rem;
  /* font-family: 'Gmarket Sans'; */

  .weather {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    svg {
      color: #fab916;
    }
  }
`;

const today = dayjs();

const TodayWeather = () => {
  return (
    <TodayWeatherWrapper>
      <span className="date">{today.format('YYYY년 M월 DD일')}</span>
      <span className="weather">
        <Sun />
        33°/23°
      </span>
    </TodayWeatherWrapper>
  );
};

export default TodayWeather;
