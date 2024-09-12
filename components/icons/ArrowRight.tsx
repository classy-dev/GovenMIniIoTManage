import { SVGProps } from 'react';

const ArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="9"
    height="16"
    viewBox="0 0 9 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 15L8 8L1 1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="rotate(180deg)"
    />
  </svg>
);

export default ArrowRight;
