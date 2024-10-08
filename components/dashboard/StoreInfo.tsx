import { useMemo } from 'react';
import { Dayjs } from 'dayjs';
import {
  useOperationStoreList,
  useUptimeTimeGraph,
} from '@/hooks/dashboardHooks';
import Card from '../Card';
import { BarChart } from '../chart/BarChart';

const StoreInfo = ({ baseDate }: { baseDate: Dayjs }) => {
  const storeListCount = useOperationStoreList('7');
  const storeListTime = useUptimeTimeGraph('7');

  /** 일자별 매장 수 & 평균 가동 시간 */
  return (
    <div className="flex gap-[0.8rem] text-[1.4rem] flex-wrap">
      <Card
        title="일자별 매장 수"
        className="flex-none w-full md:flex-1"
        sub={baseDate.format('YYYY.MM.DD')}
      >
        <BarChart
          className="w-full"
          data={useMemo(
            () =>
              (storeListCount.data?.graph ?? []).map(d => ({
                date: d.date,
                value: Number(d.store_in_operation),
              })),
            [storeListCount.data]
          )}
        />
      </Card>
      <Card
        title="평균 가동 시간"
        className="flex-none w-full md:flex-1"
        sub={baseDate.format('YYYY.MM.DD')}
      >
        <BarChart
          className="w-full"
          data={useMemo(
            () =>
              (storeListTime.data?.graph ?? []).map(d => ({
                date: d.date,
                value: Number(d.uptime_avg),
              })),
            [storeListTime.data]
          )}
        />
      </Card>
    </div>
  );
};

export default StoreInfo;
