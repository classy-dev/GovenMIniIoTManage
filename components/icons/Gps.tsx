import { SVGProps } from 'react';

const Gps = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="38"
      viewBox="0 0 76 76"
      fill="none"
      {...props}
    >
      <circle cx="38" cy="38" r="28" stroke="#FA4616" strokeWidth="4" />
      <circle cx="38.0003" cy="37.9993" r="17.1429" fill="#FA4616" />
      <path
        d="M38 8.85714V2"
        stroke="#FA4616"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M38 73.9997V67.1426"
        stroke="#FA4616"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M67.1429 38L74 38"
        stroke="#FA4616"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M2.00028 38L8.85742 38"
        stroke="#FA4616"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Gps;
