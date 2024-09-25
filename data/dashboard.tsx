import dayjs from 'dayjs';

export interface StoreRankInfo {
  machinery_minigoven_idx: number;
  machinery_name: string;
  installed_store: string;
  prev_week_compare: number;
}

const baseDate = dayjs();

const getWeekDateWithValues = (values: number[]) =>
  values
    .map((value, i) => ({
      date: baseDate.add(i * -1, 'day').toDate(),
      value,
    }))
    .reverse();

export const weekStoreCountData = getWeekDateWithValues([
  170, 140, 125, 97, 85, 50, 30,
]);

export const weekOnTimeAvgData = getWeekDateWithValues([
  40, 180, 8, 75, 130, 150, 85,
]);

export const weekStoreRanking: StoreRankInfo[] = [
  {
    machinery_minigoven_idx: 1095,
    machinery_name: 'GOVEN_MINI_A01',
    installed_store: 'GS25 그라운드블루 49',
    prev_week_compare: 60,
  },
  {
    machinery_minigoven_idx: 346,
    machinery_name: 'GOVEN_MINI_A01',
    installed_store: 'GS25 국군수도병원점',
    prev_week_compare: 45,
  },
  {
    machinery_minigoven_idx: 306,
    machinery_name: 'GOVEN_MINI_A01',
    installed_store: 'GS25 연세암병원점',
    prev_week_compare: 32,
  },
];

export const weekStoreRankingLower: StoreRankInfo[] = [
  {
    machinery_minigoven_idx: 84,
    machinery_name: 'GOVEN_MINI_A01',
    installed_store: 'GS25 화성바이오점',
    prev_week_compare: 2,
  },
  {
    machinery_minigoven_idx: 228,
    machinery_name: 'GOVEN_MINI_A01',
    installed_store: 'GS25 합정성산점',
    prev_week_compare: 0,
  },
  {
    machinery_minigoven_idx: 752,
    machinery_name: 'GOVEN_MINI_A01',
    installed_store: 'GS25고양킨텍스점',
    prev_week_compare: -2,
  },
];

export const weekCountData = [
  {
    date: '2024-09-19T06:19:16.852Z',
    value: 310,
  },
  {
    date: '2024-09-20T06:19:16.852Z',
    value: 200,
  },
  {
    date: '2024-09-21T06:19:16.852Z',
    value: 150,
  },
  {
    date: '2024-09-22T06:19:16.852Z',
    value: 182,
  },
  {
    date: '2024-09-23T06:19:16.852Z',
    value: 183,
  },
  {
    date: '2024-09-24T06:19:16.852Z',
    value: 244,
  },
  {
    date: '2024-09-25T06:19:16.852Z',
    value: 100,
  },
];

export const monthCountData = [
  { date: '2024-08-25T06:19:16.852Z', value: 300 },
  { date: '2024-08-26T06:19:16.852Z', value: 240 },
  { date: '2024-08-27T06:19:16.852Z', value: 280 },
  { date: '2024-08-28T06:19:16.852Z', value: 295 },
  { date: '2024-08-29T06:19:16.852Z', value: 310 },
  { date: '2024-08-30T06:19:16.852Z', value: 225 },
  { date: '2024-08-31T06:19:16.852Z', value: 200 },
  { date: '2024-09-01T06:19:16.852Z', value: 180 },
  { date: '2024-09-02T06:19:16.852Z', value: 150 },
  { date: '2024-09-03T06:19:16.852Z', value: 165 },
  { date: '2024-09-04T06:19:16.852Z', value: 182 },
  { date: '2024-09-05T06:19:16.852Z', value: 190 },
  { date: '2024-09-06T06:19:16.852Z', value: 183 },
  { date: '2024-09-07T06:19:16.852Z', value: 210 },
  { date: '2024-09-08T06:19:16.852Z', value: 244 },
  { date: '2024-09-09T06:19:16.852Z', value: 260 },
  { date: '2024-09-10T06:19:16.852Z', value: 100 },
  { date: '2024-09-11T06:19:16.852Z', value: 120 },
  { date: '2024-09-12T06:19:16.852Z', value: 155 },
  { date: '2024-09-13T06:19:16.852Z', value: 180 },
  { date: '2024-09-14T06:19:16.852Z', value: 200 },
  { date: '2024-09-15T06:19:16.852Z', value: 220 },
  { date: '2024-09-16T06:19:16.852Z', value: 240 },
  { date: '2024-09-17T06:19:16.852Z', value: 260 },
  { date: '2024-09-18T06:19:16.852Z', value: 280 },
  { date: '2024-09-19T06:19:16.852Z', value: 310 },
  { date: '2024-09-20T06:19:16.852Z', value: 200 },
  { date: '2024-09-21T06:19:16.852Z', value: 150 },
  { date: '2024-09-22T06:19:16.852Z', value: 182 },
  { date: '2024-09-23T06:19:16.852Z', value: 183 },
  { date: '2024-09-24T06:19:16.852Z', value: 244 },
  { date: '2024-09-25T06:19:16.852Z', value: 100 },
];
