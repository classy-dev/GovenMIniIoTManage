import styled from '@emotion/styled';

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.4rem;
  color: #3f3f3f;

  .filter {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 4rem;
    height: 2.5rem;
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

const RADIO_VALUES = ['7', '30'];

const DateTypeToggle = ({ selectedValue = '', onChange, className }: Props) => {
  return (
    <ToggleWrapper className={className ?? ''}>
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
          <span className="label">{!val ? '전체' : `${val}일`}</span>
        </label>
      ))}
    </ToggleWrapper>
  );
};

export default DateTypeToggle;
