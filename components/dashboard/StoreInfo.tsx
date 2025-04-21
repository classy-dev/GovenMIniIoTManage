import { Dayjs } from 'dayjs';
import {
  useOperationStoreList,
  useUptimeTimeGraph,
} from '@/hooks/dashboardHooks';
import Card from '../Card';
import { BarChart } from '../chart/BarChart';
import SkeletonBarChart from '../skeleton/SkeletonBarChart';

const StoreInfo = ({ baseDate }: { baseDate: Dayjs }) => {
  const storeListCount = useOperationStoreList('7');
  const storeListTime = useUptimeTimeGraph('7');

  /** 일자별 매장 수 & 평균 가동 시간 */
  return (
    <div className="overflow-hidden flex gap-[0.8rem] text-[1.4rem] flex-wrap">
      {storeListCount.isLoading ? (
        <SkeletonBarChart className="flex-none w-full md:flex-1" />
      ) : (
        <Card
          title={
            <>
              일자별 운영 매장 수<sub className="ml-1 text-[#8E8E8E]">(개)</sub>
            </>
          }
          className="flex-none w-full md:flex-1"
          // sub={baseDate.format('YYYY.MM.DD')}
        >
          <BarChart
            className="w-full h-[30rem]"
            valueFormat={val => `${val}개`}
            data={(storeListCount.data?.graph ?? []).map(d => ({
              date: d.date,
              value: Number(d.store_in_operation),
            }))}
          />
        </Card>
      )}
      {/* {storeListTime.isLoading ? (
        <SkeletonBarChart className="flex-none w-full md:flex-1" />
      ) : (
        <Card
          title={
            <>
              일자별 평균 가동 시간
              <sub className="ml-1 text-[#8E8E8E]">(분)</sub>
            </>
          }
          className="flex-none w-full md:flex-1"
          sub={baseDate.format('YYYY.MM.DD')}
        >
          <BarChart
            className="w-full"
            valueFormat={val => `${Math.floor(val / 60)}분`}
            data={(storeListTime.data?.graph ?? []).map(d => ({
              date: d.date,
              value: Number(d.uptime_avg),
            }))}
          />
        </Card>
      )} */}
    </div>
  );
};

export default StoreInfo;
