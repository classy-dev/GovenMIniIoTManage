import { useMemo, useState } from 'react';
import { useRunCountGraph } from '@/hooks/dashboardHooks';
import Card from '../Card';
import RecentCountChart from '../chart/RecentCountChart';
import DateTypeToggle from '../DateTypeToggle';
import SkeletonLineChart from '../skeleton/SkeletonLineChart';

const RunAvgCount = () => {
  const [dateType, setDateType] = useState('7');
  const { data, isLoading } = useRunCountGraph(dateType as '7' | '30');

  const chartData = useMemo(
    () =>
      data?.graph.map(d => ({
        date: d.date,
        value: d.run_count as number,
      })) ?? [],
    [data]
  );

  /** 평균 가동 횟수 그래프 */
  return (
    <div className="flex flex-wrap gap-[0.8rem]">
      {isLoading ? (
        <SkeletonLineChart className="basis-full" />
      ) : (
        <Card
          className="basis-full"
          title="일자별 가동 횟수"
          sub={
            <DateTypeToggle selectedValue={dateType} onChange={setDateType} />
          }
        >
          <RecentCountChart
            className="w-full"
            data={chartData}
            type={dateType === '7' ? 'week' : 'month'}
          />
        </Card>
      )}
    </div>
  );
};

export default RunAvgCount;
