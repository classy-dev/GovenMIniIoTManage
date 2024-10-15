import { SVGProps } from 'react';

const CircleArrow = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="1" y="1.02563" width="23" height="23" rx="11.5" stroke="white" />
      <path
        d="M11 9.52563L14 12.5256L11 15.5256"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CircleArrow;
