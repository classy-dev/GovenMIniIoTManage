import { useRouter } from 'next/router';
import StoreLayout from './StoreLayout';
import { useMemo } from 'react';
import { storeInfoList } from '@/data/storeInfo';
import styled from '@emotion/styled';
import StoreDetailTabs from './StoreDetailTab';

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.6rem 1.6rem;
  overflow: hidden;

  .temperature-info {
    margin: 1.6rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 2rem;

    .label {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.4rem;
      font-size: 1.2rem;
    }
    .badge {
      padding: 0.2rem 0.6rem;
      border-radius: 0.8rem;
      font-size: 1rem;
      font-weight: bold;
      color: #fa4616;
      background: #ffe5df;
    }

    .current {
      position: relative;
      display: inline-flex;
      align-items: baseline;
      font-size: 4.8rem;
      font-weight: bold;
      gap: 0.4rem;
      color: #fa4616;
    }
    .unit {
      font-size: 2rem;
    }
  }

  .device-info {
    display: flex;
    justify-content: center;
    gap: 1.6rem;

    dt {
      color: #a0a0a0;
      font-size: 1.2rem;
      font-weight: 400;
      margin-bottom: 0.6rem;
    }

    dd {
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
`;

const StoreDetailLayout = ({
  onSave,
  children,
}: React.PropsWithChildren<{ onSave?: () => void }>) => {
  const router = useRouter();
  const id = useMemo(() => parseInt(router.query.id as string), [router.query]);
  const store = storeInfoList.find(
    store => store.machinery_minigoven_idx === id
  );

  return (
    <StoreLayout title={store?.installed_store} passQuery onSave={onSave}>
      <DetailWrapper>
        <StoreDetailTabs />
        {children}
      </DetailWrapper>
    </StoreLayout>
  );
};

export default StoreDetailLayout;
