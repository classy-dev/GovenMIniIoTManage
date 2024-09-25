import React, { useMemo, useState } from 'react';

import { mq } from '@/styles/responsive';
import styled from '@emotion/styled';
import Search from '../icons/Search';
import { throttleEvent } from '@/util/event';
import StoreStatus from './StoreStatus';

const SearchInputWrapper = styled.div`
  display: none;
  position: relative;
  width: 100%;
  max-width: 32.8rem;
  height: 4.8rem;
  border: 1px solid #a0a0a0;
  border-radius: 0.6rem;
  margin-bottom: 1px;

  &:focus-within {
    border-color: #3f3f3f;
  }

  svg {
    position: absolute;
    left: 1.6rem;
    top: 0;
    height: 100%;
    pointer-events: none;
    cursor: pointer;
  }

  input {
    padding: 1.6rem 1.6rem 1.6rem 7rem;
    outline: none;
    border-radius: inherit;
  }

  ${mq.lg} {
    display: inline-flex;
  }
`;

export type StoreFilterData = {
  status?: string;
  keyword: string;
};

interface Props {
  filter: StoreFilterData;
  onChangeFilter: (filter: StoreFilterData) => void;
}

const StoreFilter = ({ filter, onChangeFilter }: Props) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const onSearch = useMemo(
    () =>
      throttleEvent<[React.ChangeEvent<HTMLInputElement>]>(
        e =>
          onChangeFilter({
            ...filter,
            keyword: e.target.value,
          }),
        500
      ),
    [filter]
  );

  return (
    <React.Fragment key="store-filter">
      <SearchInputWrapper>
        <Search />
        <input
          type="text"
          defaultValue={filter.keyword}
          placeholder="매장명을 입력해주세요."
          onChange={onSearch}
        />
      </SearchInputWrapper>
      <StoreStatus
        className="!hidden md:flex absolute left-0 top-[100%] p-[1.6rem] w-full bg-white"
        selectedValue={filter.status}
        onChange={status => onChangeFilter({ ...filter, status })}
      />
      <button className="md:hidden" onClick={() => setToggleMenu(!toggleMenu)}>
        <Search />
      </button>
      <div
        className={`${
          toggleMenu ? '' : 'hidden'
        } md:hidden absolute z-20 top-[100%] border-t bg-white 
      rounded-b-[0.6rem] p-[1.6rem] left-0 w-full flex flex-col items-center`}
      >
        <input
          className="w-full rounded-[0.6rem] px-[1.6rem] h-[4.8rem] border border-[#A0A0A0]"
          type="text"
          defaultValue={filter.keyword}
          placeholder="매장명을 입력해주세요."
          onChange={onSearch}
        />
        <StoreStatus
          className="!inline-flex w-auto mt-[1.6rem]"
          selectedValue={filter.status}
          onChange={status => onChangeFilter({ ...filter, status })}
        />
      </div>
      <div
        className={`${
          toggleMenu ? '' : 'hidden'
        } absolute left-0 top-[100%] bottom-0 w-full h-[calc(100vh-5.4rem)] z-10 bg-[currentColor] opacity-50`}
      />
    </React.Fragment>
  );
};

export default StoreFilter;
