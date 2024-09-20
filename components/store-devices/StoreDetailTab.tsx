import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const TabWrapper = styled.div`
  padding: 1.6rem 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  max-width: 44rem;
  width: 100%;

  .tab-item {
    flex: 1;
    padding: 2rem 0;
    border-radius: 0.6rem;
    font-weight: bold;
    text-align: center;
    cursor: pointer;

    &.active {
      background: #ffe9e3;
      color: #fa4616;
    }
  }
`;

const StoreDetailTabs = () => {
  const router = useRouter();
  const id = useMemo(() => parseInt(router.query.id as string), [router.query]);
  const [pathname, search] = useMemo(
    () => router.asPath.split('?'),
    [router.asPath]
  );

  const tabPaths = [
    { path: `/store-devices/${id}`, label: '상세 정보' },
    { path: `/store-devices/${id}/setting`, label: '기기 설정' },
    { path: `/store-devices/${id}/history`, label: '변동 내역' },
  ];

  return (
    <TabWrapper>
      {tabPaths.map(tab => (
        <Link
          key={tab.path}
          href={`${tab.path}?${search}`}
          className={`tab-item ${tab.path === pathname ? 'active' : ''}`}
        >
          {tab.label}
        </Link>
      ))}
    </TabWrapper>
  );
};

export default StoreDetailTabs;
