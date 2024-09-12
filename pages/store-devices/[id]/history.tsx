import ArrowRight from '@/components/icons/ArrowRight';
import StoreDetailLayout from '@/components/store-devices/StoreDetailLayout';
import styled from '@emotion/styled';
import { ReactElement } from 'react';
import historymockup from '@/data/history.json';
import dayjs from 'dayjs';
type HistoryData = {
  date: string;
  oven_operation_history: { time: string; action: string }[];
};

const data = historymockup as unknown as HistoryData;

const HistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.6rem;
  padding: 0.8rem;
  border-radius: 0.6rem;
  border: 1px solid #d4d4d4;
  max-height: calc(100vh - 18.6rem);

  .date {
    position: relative;
    width: 100%;
    display: inline-flex;
    flex-direction: row;

    gap: 1.6rem;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 1.4rem;
    padding-bottom: 0.8rem;
    border-bottom: 2px solid #e2e2e2;
  }

  button {
    display: inline-flex;
    width: 3.2rem;
    height: 3.2rem;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #f7f7f7;
  }

  .left {
    transform: rotate(180deg);
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    padding-top: 1.4rem;
    width: 100%;
    overflow: auto;
    li {
      display: flex;
      gap: 0.8rem;
    }
  }

  time {
    color: #fa4616;
  }
`;

const History = () => {
  return (
    <HistoryWrapper>
      <div className="date">
        <button className="left">
          <ArrowRight />
        </button>
        <span>{dayjs(data.date).format('YYYY-MM-DD')}</span>
        <button className="right">
          <ArrowRight />
        </button>
      </div>
      <ul className="content">
        {data.oven_operation_history.map(history => (
          <li>
            <time>{history.time}</time>
            <span>{history.action}</span>
          </li>
        ))}
      </ul>
    </HistoryWrapper>
  );
};

History.getLayout = (page: ReactElement) => (
  <StoreDetailLayout>{page}</StoreDetailLayout>
);

export default History;
