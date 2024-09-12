import styled from '@emotion/styled';
import Back from '@/components/icons/Back';
import Search from '@/components/icons/Search';
import useBack from '@/hooks/useBack';

const HeaderWrapper = styled.header`
  position: fixed;
  width: 100%;
  max-width: 102.4rem;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.6rem 0;
  height: 5.4rem;
  background: #fff;
  margin: 0 auto;
  z-index: 10;
  h2 {
    font-size: 1.6rem;
    line-height: 1;
  }
`;

interface StoreLayoutProps {
  title?: string;
  passQuery?: boolean;
  onBack?: () => void;
  onSearch?: () => void;
}

const ContentWrapper = styled.main`
  max-width: 102.4rem;
  margin: 5.4rem auto 0;
`;

const Header = ({
  title,
  onBackClick,
  onSearchClick,
}: {
  title?: string;
  onBackClick?: () => void;
  onSearchClick?: () => void;
}) => {
  return (
    <HeaderWrapper>
      <button
        className="back"
        aria-label="뒤로가기"
        onClick={() => onBackClick?.()}
      >
        <Back />
      </button>
      <h2>{title}</h2>
      <button
        className="search"
        aria-label="검색"
        onClick={() => onSearchClick?.()}
      >
        <Search />
      </button>
    </HeaderWrapper>
  );
};

const StoreLayout = ({
  title,
  children,
  passQuery,
}: React.PropsWithChildren<StoreLayoutProps>) => {
  const back = useBack();

  return (
    <>
      <Header
        title={title}
        onBackClick={() => back(passQuery)}
        onSearchClick={() => {}}
      />
      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
};

export default StoreLayout;
