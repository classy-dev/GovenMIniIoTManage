import dayjs from 'dayjs';
import styled from '@emotion/styled';
import Sun from './icons/Sun';

const TodayWeatherWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  padding: 1.6rem;
  gap: 0.8rem;
  background-color: #3f3f3f;
  color: white;
  border-radius: 0.6rem;

  .date {
    font-size: 1.4rem;
    color: #fff;
    margin-bottom: 0.8rem;
  }

  .temperature {
    display: inline-flex;
    align-items: baseline;
  }

  .temperature .max {
    font-size: 3.2rem;
    font-weight: bold;
  }

  .temperature .min {
    font-size: 1.6rem;
  }

  .weather {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
  }

  svg {
    width: 5rem;
    height: 5rem;
    color: #fab916;
  }
`;

const today = dayjs();

const TodayWeather = () => {
  return (
    <TodayWeatherWrapper>
      <Sun className="ico" />
      <span className="weather">
        <span className="date">{today.format('YYYY년 M월 DD일')}</span>
        <div className="temperature">
          <span className="max">27°</span>
          <span className="min">/19°</span>
        </div>
      </span>
    </TodayWeatherWrapper>
  );
};

export default TodayWeather;
