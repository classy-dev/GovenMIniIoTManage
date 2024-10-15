import request from './request';

const BASE_PATH = '/mc/v2/iot/govenmini/dashboard';

// /mc/v2/iot/govenminidashboard/graph/run-count/{date_type}
// 타입 정의
type DateType = '7' | '30';
type OrderType = 'asc' | 'desc';

interface BasicInfo {
  store_total: number;
  store_in_operation: number;
  store_not_operation: number;
  store_in_operation_rate: number;
}

export interface GraphData {
  date: string;
  [key: string]: string | number;
}

export interface StoreListItem {
  [key: string]: string | number | number[];
  store_idx: number;
  store_name: string;
  govenmini_iot_idx_list: number[];
}

// 기본 정보
export const fetchBasicInfo = async () => {
  const response = await request.get<ServerResponse<BasicInfo>>(
    `${BASE_PATH}/basic`
  );
  return response.data.data;
};

// 그래프 - 가동횟수
export const fetchRunCountGraph = async (dateType: DateType) => {
  const response = await request.get<ServerResponse<{ graph: GraphData[] }>>(
    `${BASE_PATH}/graph/run-count/${dateType}`
  );
  return response.data.data;
};

// 그래프 - 일간 평균 가동율
export const fetchUptimeRateGraph = async (dateType: DateType) => {
  const response = await request.get<ServerResponse<{ graph: GraphData[] }>>(
    `${BASE_PATH}/graph/uptime/${dateType}/rate`
  );
  return response.data.data;
};

// 그래프 - 일간 평균 가동 시간
export const fetchUptimeTimeGraph = async (dateType: DateType) => {
  const response = await request.get<ServerResponse<{ graph: GraphData[] }>>(
    `${BASE_PATH}/graph/uptime/${dateType}/time`
  );
  return response.data.data;
};

// 일자별 운영매장 수
export const fetchOperationStoreList = async (dateType: DateType) => {
  const response = await request.get<ServerResponse<{ graph: GraphData[] }>>(
    `${BASE_PATH}/graph/store_list/operation/${dateType}`
  );
  return response.data.data;
};

// 매장리스트 - 가동률
export const fetchStoreListUptimeRate = async (
  dateType: DateType,
  perNumber: number,
  orderType: OrderType
) => {
  const response = await request.get<ServerResponse<{ list: StoreListItem[] }>>(
    `${BASE_PATH}/store_list/uptime/rate/${dateType}`,
    {
      params: { per_number: perNumber, order_type: orderType },
    }
  );
  return response.data.data;
};

// 매장 리스트 - 가동률 + 조리횟수
export const fetchStoreListUptimeRunCount = async (
  dateType: DateType,
  perNumber: number,
  orderType: OrderType
) => {
  const response = await request.get<ServerResponse<{ list: StoreListItem[] }>>(
    `${BASE_PATH}/store_list/uptime/run_count/${dateType}`,
    {
      params: { per_number: perNumber, order_type: orderType },
    }
  );
  return response.data.data;
};

// 매장 리스트 - 가동률 - 전월대비
export const fetchStoreListUptimeComparedMonth = async (
  perNumber: number,
  orderType: OrderType
) => {
  const response = await request.get<ServerResponse<{ list: StoreListItem[] }>>(
    `${BASE_PATH}/store_list/uptime/compared/month`,
    {
      params: { per_number: perNumber, order_type: orderType },
    }
  );
  return response.data.data;
};
