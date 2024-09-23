import { useRouter } from 'next/router';
import StoreLayout from './StoreLayout';
import { useMemo } from 'react';
import { storeInfoList } from '@/data/storeInfo';
import styled from '@emotion/styled';
import StoreDetailTabs from './StoreDetailTab';
import Seo from '../Seo';

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.6rem 1.6rem;
  overflow: hidden;
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
    <>
      <Seo
        title={`${store?.installed_store ?? ''} | GOVEN MINI`}
        description=""
        image=""
        url=""
      />
      <StoreLayout title={store?.installed_store} passQuery onSave={onSave}>
        <DetailWrapper>
          <StoreDetailTabs />
          {children}
        </DetailWrapper>
      </StoreLayout>
    </>
  );
};

export default StoreDetailLayout;
