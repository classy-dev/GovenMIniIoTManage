import Link from 'next/link';
import { StoreListItem } from '@/api/dashboard';
import Card from './Card';
import SkeletonRankList from './skeleton/SkeletonRankList';

interface StoreRankingProps {
  className?: string;
  title?: string;
  sub?: string;
  loading?: boolean;
  storeData: StoreListItem[];
}

const StoreRanking = ({
  className,
  title,
  sub,
  loading,
  storeData,
}: StoreRankingProps) => {
  if (loading) {
    return <SkeletonRankList className={className} />;
  }

  return (
    <Card title={title} sub={sub} className={className ?? ''}>
      {storeData.map((data, i) => {
        const rankValue =
          data.uptime_avg_rate === 0
            ? 0
            : Number(data.uptime_avg_rate || data.compared_per);

        return (
          <Link
            key={i}
            className="inline-flex w-full"
            scroll
            href={`/store-devices?q=${data.store_name}`}
          >
            <div
              key={i}
              className={`flex justify-between items-center w-full ${
                i !== 0 ? 'mt-[1.6rem]' : ''
              } text-[1.4rem]`}
            >
              <div className="inline-flex items-center">
                <span className="inline-flex items-center justify-center pt-[0.1rem] leading-none text-white bg-[#171C8F] w-[1.6rem] h-[1.6rem] text-[0.9rem] font-bold mr-[2.4rem] rounded-full">
                  {i + 1}
                </span>
                <span className="inline-flex min-w-[15rem]">
                  {data.store_name}
                </span>
                <span
                  className={`ml-[2.4rem] font-bold ${
                    rankValue === 0
                      ? 'text-[#8E8E8E]'
                      : rankValue > 0
                        ? 'text-[#FA4616]'
                        : 'text-[#38A5FF]'
                  }`}
                >
                  {rankValue <= 0 ? rankValue : `+${rankValue}`}%
                </span>
              </div>
              <img src="/arrow_right.png" className="w-[1.6rem] h-[1.6rem]" />
            </div>
          </Link>
        );
      })}
    </Card>
  );
};

export default StoreRanking;
