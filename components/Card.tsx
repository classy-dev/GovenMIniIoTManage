import styled from '@emotion/styled';
import Link from 'next/link';
import { ReactNode } from 'react';

export interface CardProps {
  href?: string;
  title?: string;
  sub?: ReactNode;
  className?: string;
}

const CardWrapper = styled.div`
  padding: 1.6rem;
  border: 1px solid #d4d4d4;

  .top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  .title {
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1.15;
    margin-bottom: 1.6rem;
    text-align: left;
  }

  .sub {
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1;
    margin-bottom: 1.6rem;
    color: #a0a0a0;
  }

  .content {
    display: flex;
    flex-wrap: wrap;
  }
`;

const Card = ({
  title,
  sub,
  className,
  href,
  children,
}: React.PropsWithChildren<CardProps>) => {
  return (
    <CardWrapper className={`bg-white rounded-[6px] ${className ?? ''}`}>
      {href ? (
        <Link href={href ?? ''}>
          <div className="top">
            {title && <h4 className="title ">{title}</h4>}
            {sub && <span className="sub">{sub}</span>}
          </div>
          <div className="content">{children}</div>
        </Link>
      ) : (
        <>
          <div className="top">
            {title && <h4 className="title ">{title}</h4>}
            {sub && <span className="sub">{sub}</span>}
          </div>
          <div className="content">{children}</div>
        </>
      )}
    </CardWrapper>
  );
};

export default Card;
