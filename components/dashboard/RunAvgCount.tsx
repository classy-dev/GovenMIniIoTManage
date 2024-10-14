import { useMemo } from 'react';
import { useRunCountGraph } from '@/hooks/dashboardHooks';
import Card from '../Card';
import RecentCountChart from '../chart/RecentCountChart';
import SkeletonLineChart from '../skeleton/SkeletonLineChart';

const RunAvgCount = ({ dateType }: { dateType: '7' | '30' }) => {
  const { data, isLoading } = useRunCountGraph(dateType);

  /** 평균 가동 횟수 그래프 */

  const chartData = useMemo(
    () =>
      data?.graph.map(d => ({
        date: d.date,
        value: d.run_count as number,
      })) ?? [],
    [data]
  );

  if (isLoading) return <SkeletonLineChart className="basis-full" />;

  return (
    <Card className="basis-full" title="7일간 평균 가동 횟수 그래프">
      <RecentCountChart
        className="w-full"
        data={chartData}
        type={dateType === '7' ? 'week' : 'month'}
      />
    </Card>
  );
};

export default RunAvgCount;
