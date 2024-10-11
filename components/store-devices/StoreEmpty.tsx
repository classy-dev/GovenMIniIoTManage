import styled from '@emotion/styled';

const EmptyWrapper = styled.div`
  flex: none;
  display: inline-flex;
  width: 100%;
  flex-direction: column;
  align-self: center;

  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  min-height: 40vmin;
  text-align: center;
  h3 {
    font-size: 2.4rem;
  }
  p {
    line-height: 1.15;
  }
  svg {
    color: #ffd34d;
  }
`;

const StoreEmpty = ({ children }: React.PropsWithChildren) => {
  return <EmptyWrapper>{children}</EmptyWrapper>;
};

export default StoreEmpty;
