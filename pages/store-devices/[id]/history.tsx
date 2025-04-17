import { ReactElement, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import styled from '@emotion/styled';
import { fetchDeviceHistory } from '@/api/device';
import ArrowRight from '@/components/icons/ArrowRight';
import Warning from '@/components/icons/Warning';
import StoreDetailLayout from '@/components/store-devices/StoreDetailLayout';
import StoreEmpty from '@/components/store-devices/StoreEmpty';

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
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    padding-top: 1.4rem;
    width: 100%;
    overflow: auto;
    line-height: 1.25;
    li {
      display: flex;
      gap: 0.8rem;
    }
  }

  time {
    color: #fa4616;
    width: 4.3rem;
  }
`;

const today = dayjs();
const History = () => {
  const router = useRouter();
  const [date, setDate] = useState<dayjs.Dayjs>(today);

  const id = useMemo(() => parseInt(router.query.id as string), [router.query]);

  const { data, isLoading } = useQuery(
    ['device-history', id, date],
    () => fetchDeviceHistory(id, date.format('YYYY-MM-DD')),
    {
      keepPreviousData: false,
    }
  );

  // 중복 텍스트를 필터링하는 처리 로직 추가
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // 시간순으로 정렬
    const sortedData = [...data].sort(
      (a, b) =>
        dayjs(`1970-01-01 ${a.time}`).unix() -
        dayjs(`1970-01-01 ${b.time}`).unix()
    );

    // 중복된 연속 메시지 필터링
    return sortedData.reduce<Array<{ time: string; text: string }>>(
      (result, item, index) => {
        // 첫 번째 항목이거나 이전 항목과 텍스트가 다른 경우에만 추가
        if (index === 0 || item.text !== sortedData[index - 1].text) {
          result.push(item);
        }
        return result;
      },
      []
    );
  }, [data]);

  return (
    <HistoryWrapper>
      <div className="date">
        <button
          type="button"
          aria-label="left"
          className="left"
          onClick={() => setDate(date.add(-1, 'day'))}
        >
          <ArrowRight />
        </button>
        <span>{date.format('YYYY-MM-DD')}</span>
        <button
          type="button"
          aria-label="right"
          className="right"
          onClick={() => setDate(date.add(1, 'day'))}
          disabled={today.format('YYYYMMDD') === date.format('YYYYMMDD')}
        >
          <ArrowRight />
        </button>
      </div>
      <ul className="content">
        {filteredData.map(history => (
          <li key={`${history.time}-${history.text}`}>
            <time>{dayjs(`1970-01-01 ${history.time}`).format('HH:mm')}</time>
            <span>{history.text}</span>
          </li>
        ))}
        {!data ||
          (data.length === 0 && (
            <li key="empty">
              <StoreEmpty>
                <Warning />
                <p>조회된 변동 내역이 없습니다.</p>
              </StoreEmpty>
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
