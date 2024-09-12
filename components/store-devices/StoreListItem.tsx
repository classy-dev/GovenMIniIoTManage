import { StoreInfomation } from '@/data/storeInfo';
import { mq } from '@/styles/responsive';
import styled from '@emotion/styled';

const StoreItemWrapper = styled.div`
  position: relative;
  flex-basis: calc(33.33% - 0.5333333333rem);
  display: flex;
  border-radius: 0.6rem;
  border: 1px solid #d4d4d4;
  cursor: pointer;
  overflow: hidden;

  &.none {
    opacity: 0.4;
    cursor: not-allowed;
    .status {
      background: #3f3f3f;
      color: #fff;
    }
    time {
      display: none;
    }

    .badge {
      font-size: 1.2rem;
    }
  }

  &.on {
    .status {
      background: #fa4616;
      color: #fff;
    }

    .badge {
      background: #ffe9e3;
      color: #fa4616;
    }
  }

  &.off {
    .status {
      background: #171c8f;
      color: #fff;
    }

    .badge {
      background: #e6e6e6;
      color: #171c8f;
    }
  }

  .status {
    flex: none;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.8rem;
    align-items: center;
    width: 7rem;
    height: 100%;
    background-color: #fa4616;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 1.2rem;
    line-height: 1;
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding: 1.6rem;
    font-size: 1.4rem;
    margin-left: 7rem;
  }

  .serial {
    font-size: 1.2rem;
    line-height: 1;
    color: #a0a0a0;
  }

  .badge {
    font-size: 1rem;
    line-height: 1;
    padding: 0.2rem 0.8rem 0.2rem;
    border-radius: 0.8rem;
  }

  .store {
    white-space: nowrap;
    font-weight: 700;
    line-height: 1;
  }

  .data {
    display: flex;
    font-size: 1.2rem;
    line-height: 1;
    align-items: center;
    gap: 0.8rem;

    dd {
      font-size: 1.4rem;
      font-weight: bold;
    }

    dd + dt {
      border-left: 1px solid #bcbcbc;
      padding-left: 0.8rem;
    }
  }

  ${mq.md} {
    flex-basis: calc(50% - 0.4rem);
  }

  ${mq.sm} {
    flex-basis: 100%;
  }
`;

interface StoreListItemProps {
  status: string;
  info: StoreInfomation;
  onClick: (info: StoreInfomation) => void;
}

const StoreListItem = ({ info, status, onClick }: StoreListItemProps) => {
  const disabled = status === 'none';

  return (
    <StoreItemWrapper
      className={status}
      tabIndex={status === 'none' ? -1 : 0}
      onKeyDown={e =>
        !disabled && (e.key === 'Enter' || e.key === 'Space') && onClick?.(info)
      }
      onClick={() => !disabled && onClick?.(info)}
    >
      <div className="status">
        <span className="badge">{status}</span>
        <time>
          {status === 'on' ? '04:30:00' : status === 'off' ? '--:--:--' : ''}
        </time>
      </div>
      <div className="info">
        <span className="serial">{info.barcode}</span>
        <span className="store">{info.installed_store}</span>
        <dl className="data">
          <dt>현재 온도</dt>
          <dd>{status === 'on' ? '230℃' : status === 'off' ? '0℃' : '--℃'}</dd>
          <dt>총 동작 수</dt>
          <dd>{status === 'none' ? '--회' : '36회'}</dd>
        </dl>
      </div>
    </StoreItemWrapper>
  );
};

export default StoreListItem;
