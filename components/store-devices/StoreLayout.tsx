import { useMemo } from 'react';
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
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: inherit;
    font-size: 1.6rem;
    line-height: 1;
    white-space: nowrap;
  }

  .save {
    padding: 0.8rem 1.1rem;
    font-size: 1.4rem;
    line-height: 1;
    font-weight: bold;
    background: #e3e3e3;
    border-radius: 0.6rem;
  }

  .right {
    display: inline-flex;
    gap: 0.4rem;
  }
`;

interface StoreLayoutProps {
  title?: string;
  passQuery?: boolean;
  rightContent?: React.ReactNode;
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
  right,
  onBackClick,
}: {
  title?: string;
  right?: React.ReactNode;
  onBackClick?: () => void;
}) => {
  return (
    <HeaderWrapper>
      <button
        type="button"
        className="back"
        aria-label="뒤로가기"
        onClick={() => onBackClick?.()}
      >
        <Back />
      </button>
      <h2>{title}</h2>
      <div className="right">{right}</div>
    </HeaderWrapper>
  );
};

const StoreLayout = ({
  title,
  passQuery,
  rightContent,
  onBack,
  onSave,
  onSearch,
  children,
}: React.PropsWithChildren<StoreLayoutProps>) => {
  const back = useBack();

  const rightNode = useMemo(
    () =>
      rightContent ||
      (onSave ? (
        <button type="button" className="save" onClick={onSave}>
          저장
        </button>
      ) : onSearch ? (
        <button
          type="button"
          className="search aria-hidden:invisible"
          aria-label="검색"
          aria-hidden="true"
          onClick={() => onSearch()}
        >
          <Search />
        </button>
      ) : (
        <></>
      )),
    [rightContent, onSave, onSearch]
  );

  return (
    <>
      <Header
        title={title}
        onBackClick={() => (onBack ? onBack() : back(passQuery))}
        right={rightNode}
      />
      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
};

export default StoreLayout;
