import styled from '@emotion/styled';
import { StoreListData } from '@/api/device';
import Warning from '@/components/icons/Warning';
import SkeletonLoadingList from '@/components/skeleton/SkeletonStoreList';
import useDelayedLoading from '@/hooks/useDelayedLoading';
import StoreEmpty from './StoreEmpty';
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
  isLoading: boolean;
  data?: StoreListData[];
  onClickStore?: (store: StoreListData) => void;
}

const StoreList = ({ data, onClickStore, isLoading }: StoreListProps) => {
  const loading = useDelayedLoading(isLoading, 300);

  if (loading)
    return (
      <StoreListWrapper>
        <SkeletonLoadingList />
      </StoreListWrapper>
    );

  if (isLoading) return <StoreListWrapper />;

  if (!data?.length)
    return (
      <StoreListWrapper>
        <StoreEmpty>
          <Warning />
          <h3>조회된 매장이 없습니다.</h3>
        </StoreEmpty>
      </StoreListWrapper>
    );

  return (
    <StoreListWrapper>
      {data?.map((store, i) => {
        const status = ['none', 'off', 'on'].at(store.iot_info.power_status);

        return (
          <StoreListItem
            key={
              store.device_info.govenmini_iot_idx || store.store_info.store_idx
            }
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
