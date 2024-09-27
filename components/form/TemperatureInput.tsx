import { Control, useController } from 'react-hook-form';
import styled from '@emotion/styled';

const InputStyle = styled.input`
  width: 12rem;
  height: 4rem;
  padding: 0 0.4rem;
  border-radius: 0.6rem;
  border: 1px solid;
  text-align: center;
  font-family: 'GmarketSans';
  font-weight: bold;
  font-size: 2.4rem;
  line-height: 1;

  &:disabled {
    user-select: none;
    cursor: not-allowed;
    background: transparent;
  }
`;

interface TemperatureInputProps {
  name: string;
  control: Control<any>;
  defaultValue?: number;
  disabled?: boolean;
}

const TemperatureInput = ({
  name,
  control,
  disabled,
  defaultValue,
}: TemperatureInputProps) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <InputStyle
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      name={name}
      value={value}
      onFocus={e => e.target?.select()}
      onChange={e => onChange(e.target.value?.replace(/(\d+)/g, '$1'))}
      onBlur={() => {
        const numberValue = parseInt(value);
        if (numberValue > 250) {
          onChange(250);
        }
      }}
      maxLength={3}
      disabled={disabled}
    />
  );
};

export default TemperatureInput;
