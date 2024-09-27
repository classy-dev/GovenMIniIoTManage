import { SVGProps } from 'react';

const Search = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx="10"
      cy="10"
      r="9"
      transform="matrix(-1 0 0 1 32 12)"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M28.5 29L35 35"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Search;
