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

const DashboardWrapper = styled.main`
  .total-count {
    padding: 0.8rem 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: 1.4rem;
    text-align: left;
    line-height: 1;

    .title {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      font-weight: 400;
      text-align: left;
    }

    .updatedAt {
      font-size: 1rem;
      color: #a0a0a0;
    }
  }

  .total {
    display: inline-flex;
    align-items: baseline;
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }

  .count {
    font-size: 3.2rem;
    line-height: 1;
    font-weight: bold;
    padding-right: 0.2rem;
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

const baseDate = dayjs().hour(-1);

export default function Home() {
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
      <Seo
        title="GOVEN MINI"
        description="Join GOPIZZA in cheering for the FIFA World Cup 2026 Qualifiers! Support the exciting match between Singapore and Korea on June 6th with exclusive discounts. Find a nearby GOPIZZA store and enjoy delicious pizza deals. Get your coupon now!"
        image="/og-image.png"
        url="https://promotion.gopizza.sg"
      />
      <DashboardWrapper className="max-w-[64rem] mx-auto text-center uppercase font-sans  px-[1.6rem] flex flex-col gap-[0.8rem]">
        <Card className="relative">
          <div className="total-count">
            <p className="title !leading-tight">
              현재 운영률 및 <br />총 대수
            </p>
            <p className="total">
              <span className="count">3400</span> 대
            </p>
            <p className="updatedAt">{baseDate.format('YYYY.MM.DD 기준')}</p>
          </div>
          <div className="absolute right-0 top-0 h-full w-auto aspect-square">
            <PieChart
              className="absolute w-full h-full left-0 top-0"
              margin={{
                top: 14,
                left: 0,
                right: 0,
                bottom: 13,
              }}
              data={autoMutateData}
            />
          </div>
        </Card>
        <div className="flex gap-[0.8rem] text-[1.4rem]">
          <Card
            className="flex-1 flex flex-col !bg-[#FA4616] text-white leading-tight text-left"
            href="/store-devices?p=ON"
          >
            <span className="w-full mb-[0.8rem]">
              운영중인
              <br />
              고븐미니
            </span>
            <p className="total w-full">
              <span className="count">2,300</span> 대
            </p>
            <span className="px-[0.6rem] py-[0.2rem] leading-none rounded-full bg-[#65F16F] text-[#343434] text-[1rem] font-bold ">
              ON
            </span>
            <div className="relative w-full flex justify-end mt-6 opacity-75">
              <Goven />
              <FireWork className="absolute bottom-[0.8rem] right-[1.4rem]" />
            </div>
          </Card>
          <Card
            href="/store-devices?p=OFF"
            className="flex-1 flex !flex-col !bg-[#171C8F] text-white leading-tight text-left"
          >
            <span className="w-full  mb-[0.8rem]">
              미 운영중인
              <br /> 고븐미니
            </span>
            <p className="total w-full">
              <span className="count">1,100</span> 대
            </p>
            <span className="px-[0.6rem] py-[0.2rem] leading-none rounded-full bg-[#E6E6E6] text-[#343434] text-[1rem] font-bold ">
              OFF
            </span>
            <div className="w-full flex justify-end mt-6 opacity-75">
              <Goven />
            </div>
          </Card>
        </div>
        <Card
          title="7일간 가동 횟수 그래프"
          sub={baseDate.format('YYYY.MM.DD 기준')}
        >
          <div className="w-full overflow-hidden">
            <RecentWeekCountChart className="w-full aspect-square " />
          </div>
        </Card>
        <Card
          title="7일간 운영 상위매장 TOP 5"
          sub={baseDate.format('YYYY.MM.DD 기준')}
        >
          {Array.from({ length: 5 }, (_, i) => i).map(i => (
            <div
              className="flex justify-between items-center w-full mb-[1.6rem] text-[1.4rem]"
              key={i + 1}
            >
              <div className="inline-flex items-center">
                <span className="text-[#A0A0A0]  text-[1.2rem] font-bold min-w-[2.1rem] mr-[2.4rem]">
                  0{i + 1}.
                </span>
                <span>GS25 울진베스트점</span>
              </div>
              <img src="/arrow_right.png" className="w-[1.6rem] h-[1.6rem]" />
            </div>
          ))}
        </Card>
        <Card
          title="7일간 운영 하위매장 TOP 5"
          sub={baseDate.format('YYYY.MM.DD 기준')}
        >
          {Array.from({ length: 5 }, (_, i) => i).map(i => (
            <div
              className="flex justify-between items-center w-full mb-[1.6rem] text-[1.4rem]"
              key={i + 1}
            >
              <div className="inline-flex items-center">
                <span className="text-[#A0A0A0]  text-[1.2rem] font-bold min-w-[2.1rem] mr-[2.4rem]">
                  0{i + 1}.
                </span>
                <span>GS25 울진베스트점</span>
              </div>
              <img src="/arrow_right.png" className="w-[1.6rem] h-[1.6rem]" />
            </div>
          ))}
        </Card>
      </DashboardWrapper>
    </>
  );
}
