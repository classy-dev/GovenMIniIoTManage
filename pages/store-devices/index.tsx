import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from 'react-query';
import styled from '@emotion/styled';
import { fetchDeviceList, StoreListData } from '@/api/device';
import Spinner from '@/components/icons/Spinner';
import Seo from '@/components/Seo';
import StoreFilter, {
  StoreFilterData,
} from '@/components/store-devices/StoreFilter';
// import StoreFilter from '@/components/store-devices/StoreFilter';
import StoreLayout from '@/components/store-devices/StoreLayout';
import StoreList from '@/components/store-devices/StoreList';
import useSearchParamsFromRouter from '@/hooks/useSearchParamsFromRouter';
import { mq } from '@/styles/responsive';

const StoreDeviceListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.6rem;
  padding: 1.6rem;

  .more-btn {
    margin: 2rem 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 5.2rem;
    max-width: 500px;
    border-radius: 3.2rem;
    text-align: center;
    background-color: #fa4616;
    color: #fff;
    font-weight: bold;
  }

  ${mq.md} {
    padding-top: 6.2rem;
  }
`;

const StoreDevices = () => {
  const router = useRouter();
  const qs = useSearchParamsFromRouter();

  const [filter, setFilter] = useState<StoreFilterData>({
    keyword: '',
  });

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ['storeList', filter],
      ({ pageParam = 1 }) =>
        fetchDeviceList({
          current_number: pageParam,
          per_number: 20,
          src_keyword: filter.keyword,
          power_status:
            !filter.status || filter.status === 'none'
              ? 0
              : filter.status === 'ON'
                ? 2
                : 1,
        }),
      {
        getNextPageParam: (response, allPages) => {
          const maxPageNumber = Math.ceil(response.total_count / 20);
          if (maxPageNumber < allPages.length + 1) return undefined;
          return allPages.length + 1;
        },
        enabled: !!router.isReady,
      }
    );

  const list = useMemo(
    () =>
      ([] as StoreListData[]).concat(
        ...(data?.pages.map(res => res.list) ?? [])
      ),
    [data]
  );

  const search = useMemo(
    () => router.asPath.split('?')?.[1] ?? '',
    [router.asPath]
  );

  useEffect(() => {
    setFilter(f => ({ ...f, status: qs.get('p')?.toUpperCase() }));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(qs.toString());
    params.set('p', filter.status ?? '');
    router.replace(`${router.pathname}?${params.toString()}`, undefined, {
      shallow: true,
      scroll: false,
    });
  }, [filter.status]);

  return (
    <StoreLayout
      title="매장별 리스트"
      rightContent={<StoreFilter filter={filter} onChangeFilter={setFilter} />}
    >
      <Seo
        title="기기 목록 | GOVEN MINI"
        description="고븐 미니 기기 목록"
        image=""
        url=""
      />
      <StoreDeviceListWrapper>
        <StoreList
          isLoading={isLoading || !router.isReady}
          data={list}
          onClickStore={store =>
            router.push(
              `/store-devices/${store.device_info.govenmini_iot_idx}?${search}`
            )
          }
        />

        {hasNextPage && (
          <button
            type="button"
            disabled={isFetching}
            className="w-full max-w-lg h-[5.6rem] bg-[#FA4616] rounded-[0.6rem] mt-[1.6rem] font-bold text-white transition-all duration-300 ease-in-out
            disabled:bg-opacity-50 disabled:cursor-not-allowed self-center hover:bg-[#E13D10] active:bg-[#D23407]"
            onClick={() => fetchNextPage()}
          >
            {isFetching ? (
              <>
                <span className="mr-2">불러오는중</span>
                <Spinner size={16} className="inline-flex" />
              </>
            ) : (
              '더 보기'
            )}
          </button>
        )}
      </StoreDeviceListWrapper>
    </StoreLayout>
  );
};

StoreDevices.getLayout = (page: ReactElement) => {
  return page;
};

export default StoreDevices;
