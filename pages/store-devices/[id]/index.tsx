import { storeInfoList } from '@/data/storeInfo';
import { useRouter } from 'next/router';
import { ReactElement, useMemo } from 'react';

import temperature_json from '@/temperature_data_2024_09_11.json';
import TemperatureChart from '@/components/chart/TemperatureChart';
import dayjs from 'dayjs';
import StoreDetailLayout from '@/components/store-devices/StoreDetailLayout';

type mockData = {
  date: string;
  data: { time: string; temperature: number }[];
};

const mockup: mockData = temperature_json as unknown as mockData;

const StoreDetail = () => {
  const router = useRouter();
  const id = useMemo(() => parseInt(router.query.id as string), [router.query]);
  const store = storeInfoList.find(
    store => store.machinery_minigoven_idx === id
  );

  return (
    <>
      <div className="temperature-info">
        <div className="label">
          <span className="badge">HOT</span>
          <span className="">현재 오븐 온도</span>
        </div>
        <div className="current">
          260
          <span className="unit">℃</span>
        </div>
      </div>
      <div className="device-info">
        <dl>
          <dt>매장코드</dt>
          <dd>{store?.barcode}</dd>
        </dl>
        <dl>
          <dt>시리얼 넘버</dt>
          <dd>{store?.barcode}</dd>
        </dl>
        <dl>
          <dt>오븐 구입일</dt>
          <dd>{dayjs(store?.installation_dt).format('YYYY.MM.DD')}</dd>
        </dl>
      </div>
      <TemperatureChart
        className="aspect-square md:aspect-video"
        date={mockup.date}
        data={mockup.data}
      />
    </>
  );
};

StoreDetail.getLayout = (page: ReactElement) => (
  <StoreDetailLayout>{page}</StoreDetailLayout>
);

export default StoreDetail;
