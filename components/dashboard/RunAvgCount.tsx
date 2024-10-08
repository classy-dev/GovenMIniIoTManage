import { useMemo } from 'react';
import { useRunCountGraph } from '@/hooks/dashboardHooks';
import Card from '../Card';
import RecentCountChart from '../chart/RecentCountChart';

const RunAvgCount = ({ dateType }: { dateType: '7' | '30' }) => {
  const { data } = useRunCountGraph(dateType);

  /** 평균 가동 횟수 그래프 */

  const chartData = useMemo(
    () =>
      data?.graph.map(d => ({
        date: d.date,
        value: d.run_count as number,
      })) ?? [],
    [data]
  );

  return (
    <Card className="basis-full" title="7일간 평균 가동 횟수 그래프">
      <RecentCountChart
        data={chartData}
        type={dateType === '7' ? 'week' : 'month'}
        className="w-full"
      />
    </Card>
  );
};

export default RunAvgCount;
