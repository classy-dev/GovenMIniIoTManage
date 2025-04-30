import { useBasicInfo } from '@/hooks/dashboardHooks';
import Card from '../Card';
import PieChart from '../chart/PieChart';
import CircleArrow from '../icons/CircleArrow';
import FireWork from '../icons/Firework';
import Goven from '../icons/Goven';
import TodayWeather from '../TodayWeather';

const BasicInfo = () => {
  const { data } = useBasicInfo();

  return (
    <>
      <div className="flex gap-[0.8rem] text-[1.4rem] flex-wrap">
        <Card className="relative w-full basis-full md:basis-[23rem] min-h-[12rem]">
          <TodayWeather />
        </Card>
        {/** 운영중인 고븐미니 카드 */}
        <Card
          className="flex justify-center items-center flex-1 basis-[calc(50%_-_0.4rem)] md:flex-1 md:w-full flex-col !bg-[#FA4616] text-white leading-tight text-left"
          href="/store-devices?p=ON"
        >
          <div className="w-full flex flex-col items-center justify-center">
            <div className="relative inline-flex opacity-65">
              <Goven width={47} height={53} />
              <FireWork className="absolute bottom-[0.25rem] left-[-0.2rem] scale-[0.65]" />
            </div>
            <div className="flex flex-col items-center justify-center w-full text-center mt-[1.6rem]">
              <span className="w-full mb-[0.8rem] text-[1.2rem] leading-none">
                운영중인 고븐미니
              </span>
              <p className="total">
                <span className="count">{data?.store_in_operation}</span> 대
              </p>
              <button
                type="button"
                className="mt-[1.6rem]"
                aria-label="운영중인 고븐미니 보기"
              >
                <CircleArrow />
              </button>
            </div>
          </div>
        </Card>
        {/** 미 운영중인 고븐미니 카드 */}
        <Card
          href="/store-devices?p=OFF"
          className="flex justify-center items-center flex-1 basis-[calc(50%_-_0.4rem)] md:flex-1 md:w-full !flex-col !bg-[#171C8F] text-white leading-tight text-left"
        >
          <div className="w-full flex flex-col items-center justify-center">
            <div className="relative inline-flex opacity-65">
              <Goven width={47} height={53} />
            </div>
            <div className="flex flex-col items-center justify-center w-full text-center mt-[1.6rem]">
              <span className="w-full mb-[0.8rem] text-[1.2rem] leading-none">
                미 운영중인 고븐미니
              </span>
              <p className="total">
                <span className="count">{data?.store_not_operation}</span> 대
              </p>
              <button
                type="button"
                className="mt-[1.6rem]"
                aria-label="운영중인 고븐미니 보기"
              >
                <CircleArrow />
              </button>
            </div>
          </div>
        </Card>
        {/** 운영률 키드 */}
        <Card className="relative w-full flex-[0.5] md:basis-[21%] basis-full ">
          <div className="w-full flex-1 relative">
            <p className=" title !leading-tight">현재 운영률</p>
            <div className="inline-flex relative aspect-square w-[12.2rem] md:w-[16rem]">
              <PieChart
                className="absolute w-full h-full left-0 top-0"
                margin={{
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
                data={[
                  {
                    label: 'on',
                    value: data?.store_in_operation_rate ?? 0,
                  },
                  {
                    label: 'off',
                    value: 100 - (data?.store_in_operation_rate ?? 0),
                  },
                ]}
              />
            </div>
          </div>
        </Card>
      </div>
      <div className="gap-[0.8rem] text-[1.4rem] flex-wrap hidden">
        {/** 운영중인 고븐미니 카드 */}
        <Card
          className="basis-[calc(50%_-_0.4rem)] md:flex-1 md:w-full flex flex-col !bg-[#FA4616] text-white leading-tight text-left"
          href="/store-devices?p=ON"
        >
          <div className="w-full flex flex-col justify-between md:flex-row">
            <div className="flex flex-col items-start w-full">
              <span className="w-full mb-[0.8rem] md:mb-[2.4rem]">
                운영중인
                <br />
                고븐미니
              </span>
              <p className="total w-full">
                <span className="count">{data?.store_in_operation}</span> 대
              </p>
              <span className="mt-[0.8rem] px-[0.6rem] py-[0.2rem] leading-none rounded-full bg-[#65F16F] text-[#343434] text-[1rem] font-bold ">
                ON
              </span>
            </div>
            <div className="mt-[1.6rem] md:mt-[7.2rem] relative w-full flex justify-end items-end opacity-65">
              <Goven />
              <FireWork className="absolute bottom-[0.8rem] right-[1.4rem]" />
            </div>
          </div>
        </Card>
        {/** 미 운영중인 고븐미니 카드 */}
        <Card
          href="/store-devices?p=OFF"
          className="basis-[calc(50%_-_0.4rem)] md:flex-1 md:w-full flex !flex-col !bg-[#171C8F] text-white leading-tight text-left"
        >
          <div className="w-full flex flex-col justify-between md:flex-row">
            <div className="flex flex-col items-start w-full">
              <span className="w-full mb-[0.8rem] md:mb-[2.4rem]">
                미 운영중인
                <br /> 고븐미니
              </span>
              <p className="total w-full">
                <span className="count">{data?.store_not_operation}</span> 대
              </p>
              <span className="mt-[0.8rem] px-[0.6rem] py-[0.2rem] leading-none rounded-full bg-[#E6E6E6] text-[#343434] text-[1rem] font-bold ">
                OFF
              </span>
            </div>
            <div className="mt-[1.6rem] md:mt-[7.2rem] w-full flex justify-end items-end opacity-65">
              <Goven />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default BasicInfo;
