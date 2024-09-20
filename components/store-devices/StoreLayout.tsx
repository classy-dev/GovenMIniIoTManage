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

  .save {
    padding: 0.8rem 1.1rem;
    font-size: 1.4rem;
    line-height: 1;
    font-weight: bold;
    background: #e3e3e3;
    border-radius: 0.6rem;
  }
`;

interface StoreLayoutProps {
  title?: string;
  passQuery?: boolean;
  useFormSave?: boolean;
  onBack?: () => void;
  onSearch?: () => void;
  onSave?: () => void;
}

const ContentWrapper = styled.main`
  max-width: 102.4rem;
  margin: 5.4rem auto 0;
`;

const Header = ({
  title,
  useFormSave,
  onBackClick,
  onSearchClick,
  onSaveClick,
}: {
  title?: string;
  useFormSave?: boolean;
  onBackClick?: () => void;
  onSearchClick?: () => void;
  onSaveClick?: () => void;
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
      {useFormSave ? (
        <button className="save" onClick={onSaveClick}>
          저장
        </button>
      ) : (
        <button
          className="search aria-hidden:invisible"
          aria-label="검색"
          aria-hidden="true"
          onClick={() => onSearchClick?.()}
        >
          <Search />
        </button>
      )}
    </HeaderWrapper>
  );
};

const StoreLayout = ({
  title,
  useFormSave,
  passQuery,
  onBack,
  onSave,
  onSearch,
  children,
}: React.PropsWithChildren<StoreLayoutProps>) => {
  const back = useBack();

  return (
    <>
      <Header
        title={title}
        useFormSave={!!onSave}
        onBackClick={() => (onBack ? onBack() : back(passQuery))}
        onSearchClick={onSearch}
        onSaveClick={onSave}
      />
      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
};

export default StoreLayout;
