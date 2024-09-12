import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const Loading = keyframes`
    20%{background-position:0%   0%, 50%  50%,100%  50%}
      40%{background-position:0% 100%, 50%   0%,100%  50%}
      60%{background-position:0%  50%, 50% 100%,100%   0%}
      80%{background-position:0%  50%, 50%  50%,100% 100%}
  `;

const Loader = styled.div`
  --_g: no-repeat radial-gradient(circle closest-side, currentColor 90%, #0000);
  width: 4rem;
  aspect-ratio: 2;
  background: var(--_g) 0% 50%, var(--_g) 50% 50%, var(--_g) 100% 50%;
  background-size: calc(100% / 3) 50%;

  animation: ${Loading} 1s infinite linear;
`;

export default Loader;
