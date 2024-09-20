import { mq } from '@/styles/responsive';
import styled from '@emotion/styled';
import React from 'react';

const ResponsiveContainerWrapper = styled.div`
  position: relative;

  &::before {
    display: block;
    content: '';
    width: 100%;
    padding-bottom: 49.6%;
  }

  > svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  ${mq.sm} {
    &::before {
      padding-bottom: 75%;
    }
  }
`;

const ResponsiveContainer = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{ className?: string }>
>(({ children, className }, ref) => {
  return (
    <ResponsiveContainerWrapper ref={ref} className={className}>
      {children}
    </ResponsiveContainerWrapper>
  );
});

export default ResponsiveContainer;
