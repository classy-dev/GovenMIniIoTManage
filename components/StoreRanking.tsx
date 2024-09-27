import Link from 'next/link';
import { StoreRankInfo } from '@/data/dashboard';
import Card from './Card';

interface StoreRankingProps {
  className?: string;
  title?: string;
  sub?: string;
  storeData: StoreRankInfo[];
}

const StoreRanking = ({
  className,
  title,
  sub,
  storeData,
}: StoreRankingProps) => {
  return (
    <Card title={title} sub={sub} className={className ?? ''}>
      {storeData.map((data, i) => (
        <Link
          key={data.machinery_minigoven_idx}
          className="inline-flex w-full"
          scroll
          href={`/store-devices/${data.machinery_minigoven_idx}`}
        >
          <div
            className={`flex justify-between items-center w-full ${
              i !== 0 ? 'mt-[1.6rem]' : ''
            } text-[1.4rem]`}
          >
            <div className="inline-flex items-center">
              <span className="inline-flex items-center justify-center pt-[0.1rem] leading-none text-white bg-[#171C8F] w-[1.6rem] h-[1.6rem] text-[0.9rem] font-bold mr-[2.4rem] rounded-full">
                {i + 1}
              </span>
              <span className="inline-flex min-w-[15rem]">
                {data.installed_store}
              </span>
              <span
                className={`ml-[2.4rem] font-bold ${
                  data.prev_week_compare === 0
                    ? 'text-[#8E8E8E]'
                    : data.prev_week_compare > 0
                      ? 'text-[#38A5FF]'
                      : 'text-[#FA4616]'
                }`}
              >
                {data.prev_week_compare <= 0
                  ? data.prev_week_compare
                  : `+${data.prev_week_compare}`}
                %
              </span>
            </div>
            <img src="/arrow_right.png" className="w-[1.6rem] h-[1.6rem]" />
          </div>
        </Link>
      ))}
    </Card>
  );
};

export default StoreRanking;
