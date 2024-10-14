import request from './request';

type DeviceInfo = {
  govenmini_iot_idx: number;
  barcode: string;
  production_dt: string;
  packing_dt: string;
  box_barcode: string;
  shipment_dt: string;
  installation_dt: string;
};

type StoreInfo = {
  store_idx: number;
  store_name: string;
  store_type: string;
  external_store_code: string;
};

type IoTInfo = {
  temp: string;
  acting: string;
  power_running_time: string;
  power_status: number;
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

export type StoreListData = {
  device_info: DeviceInfo;
  store_info: StoreInfo;
  iot_info: IoTInfo;
};

export const fetchDeviceInfo = async (govenmini_iot_idx: Identifier) => {
  const res = await request.get<
    ServerResponse<{
      production_info: DeviceInfo;
      store_info: StoreInfo;
      iot_info: IoTInfo;
    }>
  >(`/mc/v2/iot/govenmini/detail/${govenmini_iot_idx}/info`);

  return res.data.data;
};

export const fetchDeviceTemperatureData = async (
  govenmini_iot_idx: Identifier
) => {
  const res = await request.get<
    ServerResponse<{
      graph: {
        datetime: string;
        temp: number;
      }[];
    }>
  >(`/mc/v2/iot/govenmini/detail/${govenmini_iot_idx}/info/graph`);

  return res.data.data;
};

export const fetchDeviceHistory = async (
  govenmini_iot_idx: Identifier,
  date: string
) => {
  const res = await request.get<
    ServerResponse<
      {
        time: string;
        text: string;
      }[]
    >
  >(`/mc/v2/iot/govenmini/detail/${govenmini_iot_idx}/history/${date}`);

  return res.data.data;
};

export const fetchDeviceSettingInfo = async (govenmini_iot_idx: Identifier) => {
  const res = await request.get<ServerResponse<SettingInfo>>(
    `/mc/v2/iot/govenmini/detail/${govenmini_iot_idx}/controller`
  );

  return res.data.data;
};

export const updateDeviceSettingInfo = async (
  govenmini_iot_idx: number,
  formData: Omit<SettingInfo, 'power_status'>
) => {
  const res = await request.put<
    ServerResponse<Omit<SettingInfo, 'power_status'>>
  >(`/mc/v2/iot/govenmini/detail/${govenmini_iot_idx}/controller`, formData);

  return res.data.data;
};

export const fetchDeviceList = async (params: {
  per_number: number;
  current_number: number;
  src_keyword: string;
  power_status: number;
}) => {
  const res = await request.get<
    ServerResponse<{
      total_count: number;
      list: StoreListData[];
    }>
  >(`/mc/v2/iot/govenmini/store`, { params });

  return res.data.data;
};
