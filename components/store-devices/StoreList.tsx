import { StoreInfomation } from '@/data/storeInfo';
import { mq } from '@/styles/responsive';
import styled from '@emotion/styled';
import StoreListItem from './StoreListItem';

const StoreListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

interface StoreListProps {
  data?: StoreInfomation[];
  onClickStore?: (store: StoreInfomation) => void;
}

const StoreList = ({ data, onClickStore }: StoreListProps) => {
  return (
    <StoreListWrapper>
      {data?.map((store, i) => {
        const status = ['on', 'off', 'none'].at(i % 3);

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
