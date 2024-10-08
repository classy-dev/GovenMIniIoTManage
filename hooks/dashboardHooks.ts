import { useQuery } from 'react-query';
import {
  fetchBasicInfo,
  fetchRunCountGraph,
  fetchUptimeRateGraph,
  fetchUptimeTimeGraph,
  fetchOperationStoreList,
  fetchStoreListUptimeRate,
  fetchStoreListUptimeRunCount,
  fetchStoreListUptimeComparedMonth,
} from '@/api/dashboard';

const REFETCH_DELAY = 4000;

// 개별 훅 생성
export const useBasicInfo = () =>
  useQuery('basic-info', fetchBasicInfo, { refetchInterval: REFETCH_DELAY });

export const useRunCountGraph = (dateType: '7' | '30') =>
  useQuery(['run-count-graph', dateType], () => fetchRunCountGraph(dateType), {
    refetchInterval: REFETCH_DELAY,
  });

export const useUptimeRateGraph = (dateType: '7' | '30') =>
  useQuery(
    ['uptime-rate-graph', dateType],
    () => fetchUptimeRateGraph(dateType),
    { refetchInterval: REFETCH_DELAY }
  );

export const useUptimeTimeGraph = (dateType: '7' | '30') =>
  useQuery(
    ['uptime-time-graph', dateType],
    () => fetchUptimeTimeGraph(dateType),
    { refetchInterval: REFETCH_DELAY }
  );

export const useOperationStoreList = (dateType: '7' | '30') =>
  useQuery(
    ['operation-store-list', dateType],
    () => fetchOperationStoreList(dateType),
    { refetchInterval: REFETCH_DELAY }
  );

export const useStoreListUptimeRate = (
  dateType: '7' | '30',
  perNumber: number,
  orderType: 'asc' | 'desc'
) =>
  useQuery(
    ['store-list-uptime-rate', dateType, perNumber, orderType],
    () => fetchStoreListUptimeRate(dateType, perNumber, orderType),
    { refetchInterval: REFETCH_DELAY }
  );

export const useStoreListUptimeRunCount = (
  dateType: '7' | '30',
  perNumber: number,
  orderType: 'asc' | 'desc'
) =>
  useQuery(
    ['store-list-uptime-run-count', dateType, perNumber, orderType],
    () => fetchStoreListUptimeRunCount(dateType, perNumber, orderType),
    { refetchInterval: REFETCH_DELAY }
  );

export const useStoreListUptimeComparedMonth = (
  perNumber: number,
  orderType: 'asc' | 'desc'
) =>
  useQuery(
    ['store-list-uptime-compared-month', perNumber, orderType],
    () => fetchStoreListUptimeComparedMonth(perNumber, orderType),
    { refetchInterval: REFETCH_DELAY }
  );
