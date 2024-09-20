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
      date: baseDate.add(i * -1 - 1, 'day').toDate(),
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
