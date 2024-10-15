import React from 'react';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import BasicInfo from '@/components/dashboard/BasicInfo';
import RunAvgCount from '@/components/dashboard/RunAvgCount';
import StoreInfo from '@/components/dashboard/StoreInfo';
import StoreRankings from '@/components/dashboard/StoreRankings';
import Seo from '@/components/Seo';

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

const baseDate = dayjs().add(-1, 'day');

const HomePage = () => {
  return (
    <>
      <Seo title="GOVEN MINI" description="" image="" url="" />
      <DashboardWrapper className="mx-auto text-center uppercase font-sans  px-[1.6rem] flex flex-col gap-[0.8rem]">
        <BasicInfo />
        <RunAvgCount />
        <StoreInfo baseDate={baseDate} />
        <StoreRankings />
      </DashboardWrapper>
    </>
  );
};

export default HomePage;
