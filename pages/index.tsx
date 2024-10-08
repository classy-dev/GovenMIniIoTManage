import React from 'react';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import BasicInfo from '@/components/dashboard/BasicInfo';
import RunAvgCount from '@/components/dashboard/RunAvgCount';
import StoreInfo from '@/components/dashboard/StoreInfo';
import Seo from '@/components/Seo';
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

const HomePage = () => {
  return (
    <>
      <Seo title="GOVEN MINI" description="" image="" url="" />
      <DashboardWrapper className="mx-auto text-center uppercase font-sans  px-[1.6rem] flex flex-col gap-[0.8rem]">
        <BasicInfo />
        <div className="flex flex-wrap gap-[0.8rem]">
          {/** 평균 가동 횟수 그래프 */}

          <RunAvgCount dateType="7" />
          <RunAvgCount dateType="30" />
        </div>

        {/** 일자별 매장 수 & 평균 가동 시간 */}
        <StoreInfo baseDate={dayjs()} />
        <div className="flex gap-[0.8rem] text-[1.4rem] flex-wrap">
          {/* <Card
            title="일자별 매장 수"
            className="flex-none w-full md:flex-1"
            sub={baseDate.format('YYYY.MM.DD')}
          >
            <BarChart className="w-full" data={[]} />
          </Card>
          <Card
            title="평균 가동 시간"
            className="flex-none w-full md:flex-1"
            sub={baseDate.format('YYYY.MM.DD')}
          >
            <BarChart className="w-full" data={[]} />
          </Card> */}
        </div>

        <div className="flex flex-wrap gap-[0.8rem]">
          <StoreRanking
            className="basis-full md:basis-[calc(50%_-_0.4rem)]"
            title="7일간 가동률 상위매장 TOP 3"
            sub={baseDate.format('YYYY.MM.DD')}
            storeData={weekStoreRanking}
          />
          <StoreRanking
            className="basis-full md:basis-[calc(50%_-_0.4rem)]"
            title="7일간 가동률 하위매장 TOP 3"
            sub={baseDate.format('YYYY.MM.DD')}
            storeData={weekStoreRankingLower}
          />
          <StoreRanking
            className="basis-full md:basis-[calc(50%_-_0.4rem)]"
            title="7일간 가동률+조리횟수 상위매장 TOP 3"
            sub={baseDate.format('YYYY.MM.DD')}
            storeData={weekStoreRanking}
          />
          <StoreRanking
            className="basis-full md:basis-[calc(50%_-_0.4rem)]"
            title="7일간 가동률+조리횟수 하위매장 TOP 3"
            sub={baseDate.format('YYYY.MM.DD')}
            storeData={weekStoreRankingLower}
          />
          <StoreRanking
            className="basis-full md:basis-[calc(50%_-_0.4rem)]"
            title="7일간 전월대비 가동률 상위매장 TOP 3"
            sub={baseDate.format('YYYY.MM.DD')}
            storeData={weekStoreRanking}
          />
          <StoreRanking
            className="basis-full md:basis-[calc(50%_-_0.4rem)]"
            title="7일간 전월대비 가동률 하위매장 TOP 3"
            sub={baseDate.format('YYYY.MM.DD')}
            storeData={weekStoreRankingLower}
          />
        </div>
      </DashboardWrapper>
    </>
  );
};

export default HomePage;
