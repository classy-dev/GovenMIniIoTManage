import styled from '@emotion/styled';
import Warning from '@/components/icons/Warning';
import { StoreInfomation } from '@/data/storeInfo';
import StoreListItem from './StoreListItem';

const StoreListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;

  .empty {
    flex: none;
    display: inline-flex;
    width: 100%;
    flex-direction: column;
    align-self: center;

    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    min-height: 40vmin;
    h3 {
      font-size: 2.4rem;
    }
    svg {
      color: #ffd34d;
    }
  }
`;

interface StoreListProps {
  data?: StoreInfomation[];
  onClickStore?: (store: StoreInfomation) => void;
}

const StoreList = ({ data, onClickStore }: StoreListProps) => {
  if (!data?.length)
    return (
      <StoreListWrapper>
        <div className="empty">
          <Warning />
          <h3>조회된 매장이 없습니다.</h3>
        </div>
      </StoreListWrapper>
    );

  return (
    <StoreListWrapper>
      {data?.map((store, i) => {
        const status = ['none', 'off', 'on'].at(store.power_status);

        return (
          <StoreListItem
            key={store.machinery_minigoven_idx}
            status={status ?? 'none'}
            info={store}
            onClick={() => onClickStore?.(store)}
          />
        );
      })}
    </StoreListWrapper>
  );
};

export default StoreList;
