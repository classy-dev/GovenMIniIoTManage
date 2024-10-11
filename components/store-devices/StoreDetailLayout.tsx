import { useMemo } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import useDeviceInfo from '@/hooks/useDeviceInfo';
import StoreDetailTabs from './StoreDetailTab';
import StoreLayout from './StoreLayout';
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

  const { data, error } = useDeviceInfo(id);

  return (
    <>
      <Seo
        title={`${data?.store_info.store_name ?? ''} ${error ? 'Not Found' : ''} | GOVEN MINI`}
        description=""
        image=""
        url=""
      />
      <StoreLayout
        title={data?.store_info.store_name}
        passQuery
        onSave={onSave}
      >
        <DetailWrapper>
          <StoreDetailTabs disabled={!!error} />
          {children}
        </DetailWrapper>
      </StoreLayout>
    </>
  );
};

export default StoreDetailLayout;
