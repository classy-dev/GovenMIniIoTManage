import {
  useStoreListUptimeComparedMonth,
  useStoreListUptimeRate,
  useStoreListUptimeRunCount,
} from '@/hooks/dashboardHooks';
import StoreRanking from '../StoreRanking';

const StoreRankings = () => {
  const uptimeRateDescending = useStoreListUptimeRate('7', 3, 'desc');
  const uptimeRateAscending = useStoreListUptimeRate('7', 3, 'asc');

  const uptimeRateWithCountDescending = useStoreListUptimeRunCount(
    '7',
    3,
    'desc'
  );
  const uptimeRateWithCountAscending = useStoreListUptimeRunCount(
    '7',
    3,
    'asc'
  );
  const comparedMonthDesceding = useStoreListUptimeComparedMonth(3, 'desc');
  const comparedMonthAsceding = useStoreListUptimeComparedMonth(3, 'asc');

  return (
    <div className="flex flex-wrap gap-[0.8rem]">
      <StoreRanking
        className="basis-full md:basis-[calc(50%_-_0.4rem)]"
        title="7일간 가동률 상위매장 TOP 3"
        loading={uptimeRateDescending.isLoading}
        storeData={uptimeRateDescending.data?.list ?? []}
      />
      <StoreRanking
        className="basis-full md:basis-[calc(50%_-_0.4rem)]"
        title="7일간 가동률 하위매장 TOP 3"
        loading={uptimeRateAscending.isLoading}
        storeData={uptimeRateAscending.data?.list ?? []}
      />
      <StoreRanking
        className="basis-full md:basis-[calc(50%_-_0.4rem)]"
        title="7일간 가동률+조리횟수 상위매장 TOP 3"
        loading={uptimeRateWithCountDescending.isLoading}
        storeData={uptimeRateWithCountDescending.data?.list ?? []}
      />
      <StoreRanking
        className="basis-full md:basis-[calc(50%_-_0.4rem)]"
        title="7일간 가동률+조리횟수 하위매장 TOP 3"
        loading={uptimeRateWithCountAscending.isLoading}
        storeData={uptimeRateWithCountAscending.data?.list ?? []}
      />
      <StoreRanking
        className="basis-full md:basis-[calc(50%_-_0.4rem)]"
        title="7일간 전월대비 가동률 상위매장 TOP 3"
        loading={comparedMonthDesceding.isLoading}
        storeData={comparedMonthDesceding.data?.list ?? []}
      />
      <StoreRanking
        className="basis-full md:basis-[calc(50%_-_0.4rem)]"
        title="7일간 전월대비 가동률 하위매장 TOP 3"
        loading={comparedMonthAsceding.isLoading}
        storeData={comparedMonthAsceding.data?.list ?? []}
      />
    </div>
  );
};

export default StoreRankings;
