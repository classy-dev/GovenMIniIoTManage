import { ReactElement, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import TemperatureChart from '@/components/chart/TemperatureChart';
import { flicker } from '@/components/icons/Firework';
import Fire, { FireOff } from '@/components/icons/Temperature';
import Warning from '@/components/icons/Warning';
import SkeletonStoreDetail from '@/components/skeleton/SkeletonStoreDetail';
import StoreDetailLayout from '@/components/store-devices/StoreDetailLayout';
import StoreEmpty from '@/components/store-devices/StoreEmpty';
import temperature_json from '@/data/temperature_data_2024_09_11.json';
import useDeviceInfo from '@/hooks/useDeviceInfo';

type mockData = {
  date: string;
  data: { time: string; temperature: number }[];
};

const AnimatedFire = styled(Fire)`
  animation: ${flicker} 1.5s infinite alternate;
  transform-origin: center bottom; /* 애니메이션 원점 설정 */
`;

const TemperatureWrapper = styled.div`
  .temperature-info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    gap: 2rem;
    max-width: 32.8rem;
    width: 100%;
    margin: 1.6rem auto;

    .label {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.4rem;
      font-size: 1.2rem;
    }

    .badge {
      padding: 0.2rem 0.6rem;
      border-radius: 0.8rem;
      font-size: 1rem;
      font-weight: bold;
      color: #343434;
      background: #65f16f;
    }

    .current {
      flex: 1;
      position: relative;
      display: inline-flex;
      align-items: baseline;
      font-size: 4.8rem;
      font-weight: bold;
      gap: 0.2rem;
      color: #fa4616;
      padding-right: 1.6rem;
      svg {
        margin-right: 0.6rem;
      }
    }

    .unit {
      font-size: 2rem;
    }

    &.off {
      .badge {
        color: #fff;
        background: #171c8f;
      }

      .current {
        color: #171c8f;
      }
    }
  }

  .device-info {
    width: 100%;
    max-width: 32.8rem;
    margin: 0 auto;
    display: flex;
    padding: 1.6rem 1.6rem;
    background-color: #efefef;
    gap: 1.6rem;
    border-top-right-radius: 0.8rem;
    border-top-left-radius: 0.8rem;

    dt {
      font-size: 1.2rem;
      font-weight: 400;
      margin-bottom: 0.6rem;
    }

    dd {
      font-weight: bold;
      font-size: 1.6rem;
    }

    dl {
      flex-basis: 100%;
      width: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    dl + dl::before {
      content: '';
      display: block;
      position: absolute;
      left: calc(-0.8rem - 1px);
      width: 2px;
      height: 100%;
      background-color: #d9d9d9;
    }
  }

  .device-info:first-of-type {
    dd {
      font-size: 1.6rem;
    }
  }

  .device-info + .device-info {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    border-bottom-right-radius: 0.8rem;
    border-bottom-left-radius: 0.8rem;
    border-top: 2px solid #d9d9d9;

    dt {
      color: #a0a0a0;
    }

    dd {
      font-size: 1.2rem;
      font-weight: 400;
    }
  }
`;

const mockup: mockData = temperature_json as unknown as mockData;

const StoreDetail = () => {
  const router = useRouter();
  const id = useMemo(() => parseInt(router.query.id as string), [router.query]);
  const [time, setTime] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  const { data, isLoading, error } = useDeviceInfo(id);

  const isON = useMemo(
    () => data?.iot_info.power_status === 2,
    [data?.iot_info.power_status]
  );

  console.log('error', error);
  useEffect(() => {
    if (!data) return () => {};
    if (isON) setTime(Number(data?.iot_info.power_running_time));
    setCurrentTime(dayjs().format('HH:mm:ss'));
    const timer = window.setInterval(() => {
      if (isON) setTime(val => val + 1);
      setCurrentTime(dayjs().format('HH:mm:ss'));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [data?.iot_info.power_running_time, isON]);

  if (isLoading || !router.isReady) {
    return (
      <TemperatureWrapper>
        <SkeletonStoreDetail />
      </TemperatureWrapper>
    );
  }

  if (error) {
    return (
      <TemperatureWrapper>
        <StoreEmpty>
          <Warning />
          <h3>
            모듈을 <br />
            찾을 수 없습니다.
          </h3>
          <p>
            모듈이 없어 화면을 확인 할 수 없습니다.
            <br /> 설치 여부를 확인해주세요.
          </p>
        </StoreEmpty>
      </TemperatureWrapper>
    );
  }

  return (
    <TemperatureWrapper>
      <div className={`temperature-info ${!isON ? 'off' : ''}`}>
        <div className="label">
          <span>현재 전원 상태</span>
          <span className="badge">{!isON ? 'OFF' : 'ON'}</span>
        </div>
        <div className="current">
          {!isON ? <FireOff /> : <AnimatedFire />}
          {data?.iot_info.temp}
          <span className="unit">℃</span>
        </div>
      </div>
      <div className="device-info">
        <dl>
          <dt>전체 가동 횟수</dt>
          <dd>{data?.iot_info.acting ?? 0}회</dd>
        </dl>
        <dl>
          <dt>현재 가동 시간</dt>
          <dd>{dayjs.unix(time).utc().format('HH:mm:ss')}</dd>
        </dl>
      </div>
      <div className="device-info">
        <dl>
          <dt>매장코드</dt>
          <dd>{data?.store_info.external_store_code?.padStart(1, '-')}</dd>
        </dl>
        <dl>
          <dt>시리얼 넘버</dt>
          <dd>{data?.production_info.barcode}</dd>
        </dl>
        <dl>
          <dt>오븐 구입일</dt>
          <dd>
            {data?.production_info.installation_dt
              ? dayjs(data?.production_info.installation_dt).format(
                  'YYYY.MM.DD'
                )
              : '-'}
          </dd>
        </dl>
      </div>
      <TemperatureChart
        className="aspect-square md:aspect-video"
        date={mockup.date}
        data={mockup.data}
        currentTemperature={parseInt(data?.iot_info.temp ?? '')}
        currentTime={currentTime}
      />
    </TemperatureWrapper>
  );
};

StoreDetail.getLayout = (page: ReactElement) => (
  <StoreDetailLayout>{page}</StoreDetailLayout>
);

export default StoreDetail;
