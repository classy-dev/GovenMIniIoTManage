import { SVGProps } from 'react';

const Warning = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_227_1113"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="64"
      height="64"
    >
      <rect width="64" height="64" fill="currentColor" />
    </mask>
    <g mask="url(#mask0_227_1113)">
      <path
        d="M28.5449 13.923C30.0884 11.277 33.9116 11.277 35.4551 13.9231L56.491 49.9845C58.0465 52.6511 56.123 56 53.0359 56H10.9641C7.87698 56 5.9535 52.6511 7.50903 49.9845L28.5449 13.923Z"
        fill="currentColor"
      />
      <path
        d="M29.2824 29.9442C29.1769 28.7735 30.0989 27.7646 31.2744 27.7646H32.4975C33.673 27.7646 34.595 28.7735 34.4894 29.9442L33.4116 41.8997C33.3405 42.6893 32.6787 43.2941 31.8859 43.2941C31.0932 43.2941 30.4314 42.6893 30.3602 41.8997L29.2824 29.9442Z"
        fill="white"
      />
      <ellipse cx="31.8858" cy="46.1178" rx="1.4" ry="1.41176" fill="white" />
    </g>
  </svg>
);

export default Warning;
