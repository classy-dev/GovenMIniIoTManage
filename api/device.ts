import request from './request';

type ProductionInfo = {
  machinery_minigoven_idx: number;
  barcode: string;
  production_dt: string;
  packing_dt: string;
  box_barcode: string;
  shipment_dt: string;
  installation_dt: string;
};

type StoreInfo = {
  store_name: string;
  store_type: string;
  external_store_code: string;
};

type IoTInfo = {
  temp: string;
  acting: string;
  power_running_time: string;
};

type CookSetting = {
  temp: number;
  running_time: number;
};

type SettingInfo = {
  pre_heat_temp: number;
  cook_1: CookSetting;
  cook_2: CookSetting;
  cook_3: CookSetting;
  power_status?: number;
};

export const fetchDeviceInfo = async (machinery_minigoven_idx: Identifier) => {
  const res = await request.get<
    ServerResponse<{
      production_info: ProductionInfo;
      store_info: StoreInfo;
      iot_info: IoTInfo;
    }>
  >(`/mc/v2/iot/govenmini/detail/${machinery_minigoven_idx}/info`);

  return res.data.data;
};

export const fetchDeviceSettingInfo = async (
  machinery_minigoven_idx: Identifier
) => {
  const res = await request.get<ServerResponse<SettingInfo>>(
    `/mc/v2/iot/govenmini/detail/${machinery_minigoven_idx}/controller`
  );

  return res.data.data;
};

export const updateDeviceSettingInfo = async (
  machinery_minigoven_idx: number,
  formData: Omit<SettingInfo, 'power_status'>
) => {
  const res = await request.put<
    ServerResponse<Omit<SettingInfo, 'power_status'>>
  >(
    `/mc/v2/iot/govenmini/detail/${machinery_minigoven_idx}/controller`,
    formData
  );

  return res.data.data;
};
