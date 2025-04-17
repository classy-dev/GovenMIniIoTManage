import { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

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

const StoreDetailTabs = ({ disabled = false }) => {
  const router = useRouter();
  const id = useMemo(() => parseInt(router.query.id as string), [router.query]);
  const [pathname, search] = useMemo(
    () => router.asPath.split('?'),
    [router.asPath]
  );

  const tabPaths = [
    { path: `/store-devices/${id}`, label: '상세 정보' },
    // { path: `/store-devices/${id}/setting`, label: '기기 설정' },
    { path: `/store-devices/${id}/history`, label: '변동 내역' },
  ];

  return (
    <TabWrapper>
      {tabPaths.map(tab => (
        <Link
          aria-disabled={disabled}
          key={tab.path}
          href={`${tab.path}?${search}`}
          onClick={e => (disabled ? e.preventDefault() : '')}
          className={`tab-item ${tab.path === pathname ? 'active' : ''}  aria-disabled:!cursor-not-allowed`}
        >
          {tab.label}
        </Link>
      ))}
    </TabWrapper>
  );
};

export default StoreDetailTabs;
