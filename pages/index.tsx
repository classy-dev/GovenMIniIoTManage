import React, { useEffect, useState } from 'react';

import { storeInfoList } from '@/data/storeInfo';

import Seo from '@/components/Seo';
import { useRouter } from 'next/router';
import Card from '@/components/Card';
import styled from '@emotion/styled';
import PieChart from '@/components/chart/PieChart';
import Goven from '@/components/icons/Goven';
import Flame from '@/components/icons/Flame';
import RecentWeekCountChart from '@/components/chart/RecentWeekCountChart';
import dayjs from 'dayjs';
import { getRandomInRange } from '@/util/rangeRandom';
import FireWork from '@/components/icons/Firework';
import { OnTimeAvgChart, StoreCountChart } from '@/components/chart/BarChart';
import Home from '@/components/icons/Home';
import Power from '@/components/icons/Power';
import Pie from '@/components/icons/Pie';
import IconAvgCard from '@/components/IconAvgCard';
import StoreRanking from '@/components/StoreRanking';
import { weekStoreRanking, weekStoreRankingLower } from '@/data/dashboard';

const DashboardWrapper = styled.main`
  padding-bottom: 1.6rem;

  .total-count {
    display: inline-flex;
    flex-direction: column;
    font-size: 1.4rem;
    text-align: left;
    line-height: 1;
    justify-content: space-between;

    .title {
      font-size: 1.4rem;
      margin-bottom: 1rem;
      font-weight: 400;
      text-align: left;
    }

    .total {
      padding-bottom: 3rem;
    }

    .updatedAt {
      font-size: 1.2rem;
      color: #a0a0a0;
    }
  }

  .total {
    display: inline-flex;
    align-items: baseline;
    font-size: 1.4rem;
    /* margin-bottom: 0.8rem; */
  }

  .count {
    font-size: 3.2rem;
    line-height: 1;
    font-weight: bold;
    padding-right: 0.4rem;
  }

  .store-info {
    flex: 1;
    width: 100%;
    display: flex;
    font-size: 1.4rem;
    align-items: center;

    gap: 0.8rem;

    dl {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      line-height: 1;
      gap: 0.6rem;
    }

    dt {
      text-align: left;
    }

    dd {
      display: inline-flex;
      align-items: baseline;
      font-size: 1.2rem;
    }
  }

  .install-info {
    display: flex;
    flex: 1;

    > * + * {
      justify-content: flex-end;
      border-left: 1px solid #e9e9e9;
    }
  }
`;

const baseDate = dayjs();

export default function HomePage() {
  const router = useRouter();
  const [autoMutateData, setAutoMutateData] = useState([
    {
      label: 'on',
      value: 90,
    },
    {
      label: 'off',
      value: 10,
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      const onValue = getRandomInRange(90, 99);

      setAutoMutateData([
        {
          label: 'on',
          value: onValue,
        },
        {
          label: 'off',
          value: 100 - onValue,
        },
      ]);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Seo title="GOVEN MINI" description="" image="" url="" />
      <DashboardWrapper className="mx-auto text-center uppercase font-sans  px-[1.6rem] flex flex-col gap-[0.8rem]">
        <div className="flex gap-[0.8rem] text-[1.4rem] flex-wrap">
          {/** 운영률 키드 */}
          <Card className="relative w-full lg:flex-1">
            <div className="w-full flex-1 flex justify-between">
              <div className="total-count">
                <p className="title !leading-tight">
                  현재 운영률 및 <br />총 대수
                </p>
                <p className="total">
                  <span className="count">3,400</span> 대
                </p>
                <p className="updatedAt">{baseDate.format('YYYY.MM.DD')}</p>
              </div>
              <div className="inline-flex relative aspect-square w-[12.2rem] md:w-[16rem] ml-[5.2rem]">
                <PieChart
                  className="absolute w-full h-full left-0 top-0"
                  margin={{
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                  data={autoMutateData}
                />
              </div>
            </div>
          </Card>
          {/** 운영중인 고븐미니 카드 */}
          <Card
            className="basis-[calc(50%_-_0.4rem)] md:flex-1 md:w-full flex flex-col !bg-[#FA4616] text-white leading-tight text-left"
            href="/store-devices?p=ON"
          >
            <div className="w-full flex flex-col justify-between md:flex-row">
              <div className="flex flex-col items-start">
                <span className="w-full mb-[0.8rem] md:mb-[2.4rem]">
                  운영중인
                  <br />
                  고븐미니
                </span>
                <p className="total w-full">
                  <span className="count">2,300</span> 대
                </p>
                <span className="mt-[0.8rem] px-[0.6rem] py-[0.2rem] leading-none rounded-full bg-[#65F16F] text-[#343434] text-[1rem] font-bold ">
                  ON
                </span>
              </div>
              <div className="mt-[1.6rem] md:mt-[7.2rem] relative w-full flex justify-end items-end opacity-65">
                <Goven />
                <FireWork className="absolute bottom-[0.8rem] right-[1.4rem]" />
              </div>
            </div>
          </Card>
          {/** 미 운영중인 고븐미니 카드 */}
          <Card
            href="/store-devices?p=OFF"
            className="basis-[calc(50%_-_0.4rem)] md:flex-1 md:w-full flex !flex-col !bg-[#171C8F] text-white leading-tight text-left"
          >
            <div className="w-full flex flex-col justify-between md:flex-row">
              <div className="flex flex-col items-start">
                <span className="w-full mb-[0.8rem] md:mb-[2.4rem]">
                  미 운영중인
                  <br /> 고븐미니
                </span>
                <p className="total w-full">
                  <span className="count">1,100</span> 대
                </p>
                <span className="mt-[0.8rem] px-[0.6rem] py-[0.2rem] leading-none rounded-full bg-[#E6E6E6] text-[#343434] text-[1rem] font-bold ">
                  OFF
                </span>
              </div>
              <div className="mt-[1.6rem] md:mt-[7.2rem] w-full flex justify-end items-end opacity-65">
                <Goven />
              </div>
            </div>
          </Card>
        </div>
        {/** 7일간 평균 가동 횟수 그래프 */}
        <Card
          title="7일간 가동 횟수 그래프"
          sub={baseDate.format('YYYY.MM.DD')}
        >
          <RecentWeekCountChart className="w-full" />
        </Card>
        {/** 일자별 매장 수 & 평균 가동 시간 */}
        <div className="flex gap-[0.8rem] text-[1.4rem] flex-wrap">
          <Card
            title="일자별 매장 수"
            className="flex-none w-full md:flex-1"
            sub={baseDate.format('YYYY.MM.DD')}
          >
            <StoreCountChart className="w-full" />
          </Card>
          <Card
            title="평균 가동 시간"
            className="flex-none w-full md:flex-1"
            sub={baseDate.format('YYYY.MM.DD')}
          >
            <OnTimeAvgChart className="w-full" />
          </Card>
        </div>

        <div className="flex gap-[0.8rem] flex-wrap">
          {/** 현재 가동률 & 현재 점포 수 & 현재 구성비 */}
          <IconAvgCard
            className="flex-none w-full md:flex-1 "
            icon={<Power />}
            title="현재 가동률"
            value={72.2}
          />
          <IconAvgCard
            className="flex-none w-full md:flex-1"
            icon={<Home />}
            title="현재 점포수"
            value={53.5}
          />
          <IconAvgCard
            className="flex-none w-full md:flex-1"
            icon={<Pie />}
            title="현재 구성비"
            value={50.2}
          />
        </div>
        <div className="flex flex-wrap gap-[0.8rem]">
          <StoreRanking
            className="basis-full md:basis-[calc(50%_-_0.4rem)]"
            title={'7일간 가동률 상위매장 TOP 3'}
            sub={baseDate.format('YYYY.MM.DD')}
            storeData={weekStoreRanking}
          />
          <StoreRanking
            className="basis-full md:basis-[calc(50%_-_0.4rem)]"
            title={'7일간 가동률 하위매장 TOP 3'}
            sub={baseDate.format('YYYY.MM.DD')}
            storeData={weekStoreRankingLower}
          />
          <StoreRanking
            className="basis-full md:basis-[calc(50%_-_0.4rem)]"
            title={'7일간 가동률+조리횟수 상위매장 TOP 3'}
            sub={baseDate.format('YYYY.MM.DD')}
            storeData={weekStoreRanking}
          />
          <StoreRanking
            className="basis-full md:basis-[calc(50%_-_0.4rem)]"
            title={'7일간 가동률+조리횟수 하위매장 TOP 3'}
            sub={baseDate.format('YYYY.MM.DD')}
            storeData={weekStoreRankingLower}
          />
          <StoreRanking
            className="basis-full md:basis-[calc(50%_-_0.4rem)]"
            title={'7일간 전월대비 가동률 상위매장 TOP 3'}
            sub={baseDate.format('YYYY.MM.DD')}
            storeData={weekStoreRanking}
          />
          <StoreRanking
            className="basis-full md:basis-[calc(50%_-_0.4rem)]"
            title={'7일간 전월대비 가동률 하위매장 TOP 3'}
            sub={baseDate.format('YYYY.MM.DD')}
            storeData={weekStoreRankingLower}
          />
        </div>
      </DashboardWrapper>
    </>
  );
}
