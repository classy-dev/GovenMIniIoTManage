import { updateDeviceSettingInfo } from '@/api/device';
import ConfirmModal, { AlertModal } from '@/components/ConfirmModal';
import TemperatureInput from '@/components/form/TemperatureInput';
import TimeInput from '@/components/form/TimeInput';
import StoreDetailLayout from '@/components/store-devices/StoreDetailLayout';
import useBack from '@/hooks/useBack';
import useDeviceSettingInfo from '@/hooks/useDeviceSetting';
import { formRequestSubmit } from '@/util/form';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

const SettingWrapper = styled.div`
  max-width: 76.8rem;
  width: 100%;
  margin: 0 auto;

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

    dl.on dd {
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
    flex: 1;
    display: inline-flex;
    align-items: flex-end;
    flex-wrap: wrap;

    .unit {
      margin-left: 0.8rem;
      font-weight: bold;
      width: 1em;
      line-height: 1;
    }
  }

  .input-wrapper + .input-wrapper {
    justify-content: flex-end;

    span {
      text-align: right;
    }
  }

  &.off form {
    opacity: 0.4;
  }
`;

type FormData = {
  pre_heat_temp: number;
  cook_1: {
    temp: number;
    running_time: number;
  };
  cook_2: {
    temp: number;
    running_time: number;
  };
  cook_3: {
    temp: number;
    running_time: number;
  };
};

const Setting = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const back = useBack();
  const router = useRouter();

  const [showConfirm, setShowConfirm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const id = useMemo(() => parseInt(router.query.id as string), [router.query]);
  const { data } = useDeviceSettingInfo(id);

  const { mutate } = useMutation(
    (data: FormData) => updateDeviceSettingInfo(id, data),
    {
      onSuccess: () => {
        setShowConfirm(false);
        setShowAlert(true);
      },
    }
  );

  const { handleSubmit, control, watch, reset, getValues } = useForm<FormData>({
    defaultValues: {
      pre_heat_temp: 0,
      cook_1: {
        temp: 0,
        running_time: 0,
      },
      cook_2: {
        temp: 0,
        running_time: 0,
      },
      cook_3: {
        temp: 0,
        running_time: 0,
      },
    },
  });

  useEffect(() => {
    if (data) reset(data);
  }, [data]);

  const isPowerOn = data?.power_status === 2;
  const isInstalled = true;

  return (
    <StoreDetailLayout>
      <SettingWrapper className={!isPowerOn ? 'off' : ''}>
        <div className="status">
          <dl className={isPowerOn ? 'on' : ''}>
            <dt>전원상태</dt>
            <dd>{isPowerOn ? 'ON' : 'OFF'}</dd>
          </dl>
          <dl className={isInstalled ? 'on' : 'off'}>
            <dt>모듈설치</dt>
            <dd>{isInstalled ? '완료' : ''}</dd>
          </dl>
        </div>
        <form
          ref={formRef}
          onSubmit={handleSubmit(data => setShowConfirm(true))}
        >
          <div className="field">
            <span className="label">예열 온도</span>
            <div className="input-wrapper justify-end">
              <TemperatureInput
                control={control}
                name="pre_heat_temp"
                defaultValue={0}
                disabled={!isPowerOn}
              />
              <span className="unit">℃</span>
            </div>
          </div>
          <div className="field">
            <div className="input-wrapper">
              <span className="flex-none w-full mb-[1.6rem]">조리 온도 01</span>
              <TemperatureInput
                control={control}
                name="cook_1.temp"
                defaultValue={0}
                disabled={!isPowerOn}
              />
              <span className="unit">℃</span>
            </div>
            <div className="input-wrapper">
              <span className="flex-none w-full mb-[1.6rem]">조리 시간 01</span>
              <TimeInput
                control={control}
                name="cook_1.running_time"
                defaultValue={0}
                disabled={!isPowerOn}
              />
            </div>
          </div>
          <div className="field">
            <div className="input-wrapper">
              <span className="flex-none w-full mb-[1.6rem]">조리 온도 02</span>
              <TemperatureInput
                name="cook_2.temp"
                control={control}
                defaultValue={0}
                disabled={!isPowerOn}
              />
              <span className="unit">℃</span>
            </div>
            <div className="input-wrapper">
              <span className="flex-none w-full mb-[1.6rem]">조리 시간 02</span>
              <TimeInput
                control={control}
                name="cook_2.running_time"
                defaultValue={0}
                disabled={!isPowerOn}
              />
            </div>
          </div>
          <div className="field">
            <div className="input-wrapper">
              <span className="flex-none w-full mb-[1.6rem]">조리 온도 03</span>
              <TemperatureInput
                name="cook_3.temp"
                control={control}
                defaultValue={0}
                disabled={!isPowerOn}
              />
              <span className="unit">℃</span>
            </div>
            <div className="input-wrapper">
              <span className="basis-full mb-[1.6rem]">조리 시간 03</span>
              <TimeInput
                control={control}
                name="cook_3.running_time"
                defaultValue={0}
                disabled={!isPowerOn}
              />
            </div>
          </div>
          <button
            disabled={!isPowerOn}
            className="h-[5.6rem] bg-[#FA4616] rounded-[0.6rem] mt-[1.6rem] font-bold text-white disabled:cursor-not-allowed"
          >
            기기 설정 저장
          </button>
        </form>
      </SettingWrapper>
      <ConfirmModal
        show={showConfirm}
        text="해당 설정을 저장하시겠습니까?"
        onConfirm={() => mutate(getValues())}
        onClose={() => setShowConfirm(false)}
      />
      <AlertModal
        show={showAlert}
        text="저장 되었습니다."
        onClose={() => {
          setShowAlert(false);
          back(true);
        }}
      />
    </StoreDetailLayout>
  );
};

Setting.getLayout = (page: ReactElement) => page;

export default Setting;
