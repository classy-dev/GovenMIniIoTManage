import StoreLayout from '@/components/store-devices/StoreLayout';
import StoreList from '@/components/store-devices/StoreList';
import StoreStatus from '@/components/store-devices/StoreStatus';
import { storeInfoList } from '@/data/storeInfo';
import useBack from '@/hooks/useBack';
import useSearchParamsFromRouter from '@/hooks/useSearchParamsFromRouter';
import styled from '@emotion/styled';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useMemo, useState } from 'react';

const StoreDeviceListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.6rem;
  padding: 1.6rem;
`;

const StoreDevices = () => {
  const router = useRouter();
  const qs = useSearchParamsFromRouter();

  const [status, setStatus] = useState<string | undefined>('');
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

  return (
    <StoreDeviceListWrapper>
      <StoreStatus selectedValue={status} onChange={updateStatus} />
      <StoreList
        data={storeInfoList}
        onClickStore={store =>
          router.push(
            '/store-devices/' + store.machinery_minigoven_idx + `?${search}`
          )
        }
      />
    </StoreDeviceListWrapper>
  );
};

StoreDevices.getLayout = (page: ReactElement) => {
  return <StoreLayout title="매장별 리스트">{page}</StoreLayout>;
};

export default StoreDevices;
