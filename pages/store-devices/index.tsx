import Search from '@/components/icons/Search';
import Seo from '@/components/Seo';
import StoreLayout from '@/components/store-devices/StoreLayout';
import StoreList from '@/components/store-devices/StoreList';
import StoreStatus from '@/components/store-devices/StoreStatus';
import { storeInfoList } from '@/data/storeInfo';
import useChosungFilter from '@/hooks/useChosungFilter';
import useSearchParamsFromRouter from '@/hooks/useSearchParamsFromRouter';
import { mq } from '@/styles/responsive';
import { throttleEvent } from '@/util/event';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useMemo, useState } from 'react';

const StoreDeviceListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.6rem;
  padding: 1.6rem;
`;

const SearchInputWrapper = styled.div`
  display: none;
  position: relative;
  width: 100%;
  max-width: 32.8rem;
  height: 4.8rem;
  border: 1px solid #a0a0a0;
  border-radius: 0.6rem;

  &:focus-within {
    border-color: #3f3f3f;
  }

  svg {
    position: absolute;
    left: 1.6rem;
    top: 0;
    height: 100%;
    pointer-events: none;
    cursor: pointer;
  }

  input {
    padding: 1.6rem 1.6rem 1.6rem 7rem;
    outline: none;
    border-radius: inherit;
  }

  ${mq.lg} {
    display: inline-flex;
  }
`;

const StoreDevices = () => {
  const router = useRouter();
  const qs = useSearchParamsFromRouter();

  const [status, setStatus] = useState<string | undefined>('');
  const [keyword, setKeyword] = useState('');
  const searchResult = useChosungFilter(
    keyword,
    storeInfoList,
    store => store.installed_store
  );
  const searchedList = useMemo(
    () =>
      searchResult.filter(store =>
        !status || status === 'none'
          ? true
          : status === 'ON'
          ? store.power_status === 2
          : store.power_status === 1
      ),
    [keyword, status]
  );

  const search = useMemo(
    () => router.asPath.split('?')?.[1] ?? '',
    [router.asPath]
  );

  useEffect(() => {
    setStatus(qs.get('p')?.toUpperCase());
  }, []);

  const updateStatus = (val: string) => {
    const params = new URLSearchParams(qs.toString());
    params.set('p', val);
    setStatus(val);
    router.replace(router.pathname + '?' + params.toString(), undefined, {
      shallow: true,
      scroll: false,
    });
  };

  const onSearch = useMemo(
    () =>
      throttleEvent<[React.ChangeEvent<HTMLInputElement>]>(
        e => setKeyword(e.target.value),
        500
      ),
    []
  );

  return (
    <StoreLayout
      title="매장별 리스트"
      rightContent={
        <>
          <SearchInputWrapper>
            <Search />
            <input
              type="text"
              defaultValue={keyword}
              placeholder="매장명을 입력해주세요."
              onChange={onSearch}
            />
          </SearchInputWrapper>
          <button className="inline-flex lg:hidden">
            <Search />
          </button>
        </>
      }
    >
      <Seo
        title="기기 목록 | GOVEN MINI"
        description="고븐 미니 기기 목록"
        image=""
        url=""
      />
      <StoreDeviceListWrapper>
        <StoreStatus
          className="!hidden lg:!flex"
          selectedValue={status}
          onChange={updateStatus}
        />
        <StoreList
          data={searchedList}
          onClickStore={store =>
            router.push(
              '/store-devices/' + store.machinery_minigoven_idx + `?${search}`
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
