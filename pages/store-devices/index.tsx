import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Seo from '@/components/Seo';
import StoreFilter, {
  StoreFilterData,
} from '@/components/store-devices/StoreFilter';
// import StoreFilter from '@/components/store-devices/StoreFilter';
import StoreLayout from '@/components/store-devices/StoreLayout';
import StoreList from '@/components/store-devices/StoreList';
import { storeInfoList } from '@/data/storeInfo';
import useChosungFilter from '@/hooks/useChosungFilter';
import useSearchParamsFromRouter from '@/hooks/useSearchParamsFromRouter';
import { mq } from '@/styles/responsive';

const StoreDeviceListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.6rem;
  padding: 1.6rem;

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

  const searchResult = useChosungFilter(
    filter.keyword,
    storeInfoList,
    store => store.installed_store
  );

  const searchedList = useMemo(
    () =>
      searchResult.filter(store =>
        !filter.status || filter.status === 'none'
          ? true
          : filter.status === 'ON'
            ? store.power_status === 2
            : store.power_status === 1
      ),
    [filter]
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
          data={searchedList}
          onClickStore={store =>
            router.push(
              `/store-devices/${store.machinery_minigoven_idx}?${search}`
            )
          }
        />
      </StoreDeviceListWrapper>
    </StoreLayout>
  );
};

StoreDevices.getLayout = (page: ReactElement) => {
  return page;
};

export default StoreDevices;
