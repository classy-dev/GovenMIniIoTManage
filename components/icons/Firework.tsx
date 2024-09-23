import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { SVGProps } from 'react';

export const flicker = keyframes`
     0% {
         transform: scale(1) translateY(0);
         d: path("M14.4527 8.48679L12.1842 3.93896L11.4471 4.74309C7.30945 9.25693 6 11.9609 6 14.2499C6 17.422 8.73452 19.909 12 19.909C15.2655 19.909 18 17.422 18 14.2499C18 13.3179 17.6746 12.3124 17.2381 11.3658C16.796 10.4069 16.2091 9.44335 15.62 8.57788L15.1065 7.82342L14.4527 8.48679Z");
     }
     50% {
         transform: scale(1.05) translateY(-1px);
         d: path("M14.4527 7.48679L12.1842 2.93896L11.4471 3.74309C7.30945 8.25693 5.5 10.9609 5.5 13.2499C5.5 16.422 8.73452 18.909 12 18.909C15.2655 18.909 18.5 16.422 18.5 13.2499C18.5 12.3179 18.1746 11.3124 17.7381 10.3658C17.296 9.4069 16.7091 8.44335 16.12 7.57788L15.6065 6.82342L14.4527 7.48679Z");
     }
     100% {
         transform:  scale(0.95) translateY(1px);
         d: path("M14.4527 8.48679L12.1842 3.93896L11.4471 4.74309C7.30945 9.25693 6.5 11.9609 6.5 14.2499C6.5 17.422 8.73452 19.909 12 19.909C15.2655 19.909 17.5 17.422 17.5 14.2499C17.5 13.3179 17.1746 12.3124 16.7381 11.3658C16.296 10.4069 15.7091 9.44335 15.12 8.57788L14.6065 7.82342L14.4527 8.48679Z");
     }
 `;

const FireContainer = styled.div`
  display: inline-flex;
  justify-content: center; /* 중앙 정렬로 변경 */
  align-items: center;

  svg {
    width: 1.4rem;
    height: 1.4rem;
    margin: 0 -0.2rem;
  }

  path {
    fill: #fff;
  }

  .svg:nth-of-type(2) path {
    animation-delay: 0.1s;
  }
  svg:nth-of-type(3) path {
    animation-delay: 0.25s;
  }
  svg:nth-of-type(4) path {
    animation-delay: 0.4s;
  }
  svg:nth-of-type(5) path {
    animation-delay: 0.55s;
  }

  path {
    animation: ${flicker} 1.25s infinite alternate;
    transform-origin: center bottom; /* 애니메이션 원점 설정 */
  }
`;

export const Fire = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.4527 8.48679L12.1842 3.93896L11.4471 4.74309C7.30945 9.25693 6 11.9609 6 14.2499C6 17.422 8.73452 19.909 12 19.909C15.2655 19.909 18 17.422 18 14.2499C18 13.3179 17.6746 12.3124 17.2381 11.3658C16.796 10.4069 16.2091 9.44335 15.62 8.57788L15.1065 7.82342L14.4527 8.48679Z"
      />
    </svg>
  );
};

const FireWork = ({ className }: { className?: string }) => (
  <FireContainer className={className}>
    <Fire />
    <Fire />
    <Fire />
    <Fire />
    <Fire />
  </FireContainer>
);

export default FireWork;
