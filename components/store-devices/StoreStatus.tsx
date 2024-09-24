import styled from '@emotion/styled';

const StoreStatusWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;

  .filter {
    flex: none;
    display: inline-flex;
    align-items: center;
    min-width: 4.9rem;
    height: 3rem;
    padding: 0 1rem;
    line-height: 1;
    border-radius: 0.6rem;
    cursor: pointer;

    &.checked {
      background: #ffe9e3;
      color: #fa4616;
    }
  }
`;

interface Props {
  selectedValue?: string;
  className?: string;
  onChange?: (val: string) => void;
}

const RADIO_VALUES = ['', 'ON', 'OFF'];

const StoreStatus = ({ selectedValue = '', onChange, className }: Props) => {
  return (
    <StoreStatusWrapper className={className ?? ''}>
      {RADIO_VALUES.map(val => (
        <label
          key={val}
          className={`filter ${val === selectedValue ? 'checked' : ''}`}
        >
          <input
            type="checkbox"
            value={val}
            checked={val === selectedValue}
            onChange={e => onChange?.(e.target.value)}
          />
          <span className="label">{!val ? '전체' : val}</span>
        </label>
      ))}
    </StoreStatusWrapper>
  );
};

export default StoreStatus;
