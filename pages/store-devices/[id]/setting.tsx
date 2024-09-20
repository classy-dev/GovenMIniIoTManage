import StoreDetailLayout from '@/components/store-devices/StoreDetailLayout';
import { formRequestSubmit } from '@/util/form';
import styled from '@emotion/styled';
import { ReactElement, useRef } from 'react';
import { useForm } from 'react-hook-form';

const SettingWrapper = styled.div`
  .status {
    display: flex;
    justify-content: flex-end;
    gap: 1.6rem;
    margin-bottom: 1.6rem;

    dl {
      display: flex;
      gap: 0.4rem;
    }

    dd {
      font-weight: bold;
    }

    &.on dd {
      color: #39c342;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .field {
    display: flex;
    flex-wrap: wrap;
    padding: 1.6rem;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #d4d4d4;
    border-radius: 0.6rem;
  }

  .input-wrapper {
    display: inline-flex;
    align-items: flex-end;

    .unit {
      margin-left: 0.8rem;
      font-weight: bold;
    }
  }

  input {
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
  }
`;

const Setting = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const { handleSubmit } = useForm<any>({});

  return (
    <StoreDetailLayout onSave={() => formRequestSubmit(formRef.current)}>
      <SettingWrapper>
        <div className="status on">
          <dl>
            <dt>전원상태</dt>
            <dd>ON</dd>
          </dl>
          <dl>
            <dt>모듈설치</dt>
            <dd>완료</dd>
          </dl>
        </div>
        <form
          ref={formRef}
          onSubmit={handleSubmit(
            () => console.log('valid'),
            () => console.error('invalid')
          )}
        >
          <div className="field">
            <span className="label">예열 온도 설정</span>
            <div className="input-wrapper">
              <input type="text" value={'4:30'} />
              <span className="unit">℃</span>
            </div>
          </div>
          <div className="field">
            <span className="flex-none w-full mb-[1.6rem]">조리 온도 01</span>
            <div className="input-wrapper">
              <input type="text" value={230} />
              <span className="unit">℃</span>
            </div>
            <div className="input-wrapper">
              <input type="text" value={'4:30'} />
              <span className="unit">T</span>
            </div>
          </div>
          <div className="field">
            <span className="flex-none w-full mb-[1.6rem]">조리 온도 02</span>
            <div className="input-wrapper">
              <input type="text" value={230} />
              <span className="unit">℃</span>
            </div>
            <div className="input-wrapper">
              <input type="text" value={'4:30'} />
              <span className="unit">T</span>
            </div>
          </div>
          <div className="field">
            <span className="flex-none w-full mb-[1.6rem]">조리 온도 03</span>
            <div className="input-wrapper">
              <input type="text" value={230} />
              <span className="unit">℃</span>
            </div>
            <div className="input-wrapper">
              <input type="text" value={'4:30'} />
              <span className="unit">T</span>
            </div>
          </div>
        </form>
      </SettingWrapper>
    </StoreDetailLayout>
  );
};

Setting.getLayout = (page: ReactElement) => page;

export default Setting;
