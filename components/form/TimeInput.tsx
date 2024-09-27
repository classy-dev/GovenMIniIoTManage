import React, { useState, useEffect, useRef } from 'react';
import { useController, Control } from 'react-hook-form';
import styled from '@emotion/styled';

const TimeInputWrapper = styled.div`
  width: 12rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.6rem;
  border: 1px solid currentColor;
  font-size: 2.4rem;
  font-weight: bold;
  position: relative;

  input {
    flex: 1;
    border: 0;
    text-align: right;
    font-size: 2.4rem;
    width: 100%;
    height: 4rem;
    font-family: 'GmarketSans';
    font-weight: bold;
    box-sizing: content-box;
    border-radius: inherit;
    padding: 0;
    padding-left: 1rem;

    &:focus {
      border: 0;
      outline: 0;
    }

    &:disabled {
      user-select: none;
      cursor: not-allowed;
      background: transparent;
    }
  }

  input ~ input {
    flex: none;
    width: 2em;
    padding-left: 0;
    padding-right: 1.5rem;
    text-align: left;
  }

  span {
    position: relative;
    top: 0.1em;
    pointer-events: none;
    padding: 0 0.05em;
  }
`;

interface TimeInputProps {
  name: string;
  control: Control<any>;
  defaultValue?: number;
  disabled?: boolean;
}

const TimeInput: React.FC<TimeInputProps> = ({
  name,
  control,
  defaultValue = 0,
  disabled,
}) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    defaultValue,
  });

  const [minutes, setMinutes] = useState<string>('');
  const [seconds, setSeconds] = useState<string>('');
  const minutesInputRef = useRef<HTMLInputElement>(null);
  const secondsInputRef = useRef<HTMLInputElement>(null);

  const handleFocusSeconds = () => {
    secondsInputRef.current?.focus();
    secondsInputRef.current?.select();
  };

  const handleFocusMinute = () => {
    minutesInputRef.current?.focus();
    minutesInputRef.current?.select();
  };

  const handleInputMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setMinutes(input);
    if (input) handleFocusSeconds();
  };
  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSeconds(input);
  };

  const updateValue = () => {
    const mins = parseInt(minutes) || 0;
    const secs = parseInt(seconds) || 0;
    const totalSeconds = mins * 60 + secs;

    onChange(totalSeconds >= 600 ? 599 : totalSeconds);
  };

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (e.currentTarget === secondsInputRef.current && seconds === '') {
        setMinutes('');
        minutesInputRef.current?.focus();
      }
    }
  };

  const handleBlur = () => {
    setSeconds(seconds.padStart(2, '0'));
    updateValue();
  };

  useEffect(() => {
    if (value !== undefined) {
      const mins = Math.floor(value / 60);
      const secs = value % 60;
      setMinutes(mins.toString());
      setSeconds(secs.toString().padStart(2, '0'));
    }
  }, [value]);

  return (
    <TimeInputWrapper
      onClick={e => {
        handleFocusMinute();
      }}
    >
      <input
        ref={minutesInputRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={minutes}
        onInput={handleInputMinuteChange}
        placeholder="0"
        aria-label="Minutes"
        maxLength={1}
        disabled={disabled}
      />
      <span>:</span>
      <input
        ref={secondsInputRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={seconds}
        onChange={handleSecondsChange}
        onKeyDown={handleBackspace}
        onBlur={handleBlur}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          handleFocusSeconds();
        }}
        placeholder="00"
        aria-label="Seconds"
        maxLength={2}
        disabled={disabled}
      />
    </TimeInputWrapper>
  );
};

export default TimeInput;
