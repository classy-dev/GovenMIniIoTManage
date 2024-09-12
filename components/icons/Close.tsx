import { SVGProps } from "react";

const Close = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="30" cy="30" r="30" fill="white" />
    <path
      d="M20 20L41 41"
      stroke="black"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M41 20L20 41"
      stroke="black"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

export default Close;
