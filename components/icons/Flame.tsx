import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const flicker = keyframes`
    0%,
    100% {
      transform: translate(-50%, -50%) rotate(-45deg) scaleY(1.05) scaleX(1);
    }
    25% {
      transform: translate(-50%, -50%) rotate(-45deg) scaleY(1.1) scaleX(1.05);
    }
    50% {
      transform: translate(-50%, -50%) rotate(-45deg) scaleY(1) scaleX(0.95);
    }
    75% {
      transform: translate(-50%, -50%) rotate(-45deg) scaleY(1.05) scaleX(1);
    }
`;

const FlameWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  .flame {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50% 0 50% 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  .flame-container {
    position: relative;
    width: 32px;
    height: 32px;
  }

  .red {
    width: 32px;
    height: 32px;
    background: orangered;
    box-shadow: 0 0 4px 2px orangered;
    animation: ${flicker} 1.5s infinite alternate;
  }

  .orange {
    width: 24px;
    height: 24px;
    background: orange;
    box-shadow: 0 0 4px 2px orange;
    animation: ${flicker} 2s infinite alternate;
  }
  .gold {
    width: 16px;
    height: 16px;
    background: gold;
    box-shadow: 0 0 3px 1px gold;
    animation: ${flicker} 2.5s infinite alternate;
  }
  .white {
    width: 8px;
    height: 8px;
    background: lightyellow;
    box-shadow: 0 0 3px 1px lightyellow;
    animation: ${flicker} 3s infinite alternate;
  }
`;

const Flame = () => {
  return (
    <FlameWrapper>
      <div className="flame-container">
        <div className="flame red"></div>
        <div className="flame orange"></div>
        <div className="flame gold"></div>
        <div className="flame white"></div>
      </div>
    </FlameWrapper>
  );
};

export default Flame;
