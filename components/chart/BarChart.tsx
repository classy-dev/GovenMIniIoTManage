import React, { useMemo } from 'react';
import { Bar, Line } from '@visx/shape';
import { Group } from '@visx/group';

import { GradientTealBlue } from '@visx/gradient';
import { weekOnTimeAvgData, weekStoreCountData } from '@/data/dashboard';
import { scaleBand, scaleLinear } from '@visx/scale';
import { useParentSize } from '@visx/responsive';
import ResponsiveContainer from './ResponsiveContainer';
import { AxisBottom, AxisLeft } from '@visx/axis';
import dayjs from 'dayjs';

const verticalMargin = 120;

export type BarsProps = {
  className?: string;
  events?: boolean;
  margin?: { top: number; left: number; right: number; bottom: number };
};

type BarChartData = {
  date: Date;
  value: number;
};

type Colors = Record<number, string>;
// accessors
const getDate = (d: BarChartData) => d.date;
const getValue = (d: BarChartData) => d.value;
const getColor = (d: BarChartData, colors: Colors) => {
  const value = getValue(d);

  return (
    Object.entries(colors)
      .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
      .find(([num]) => parseInt(num) <= value)?.[1] ?? '#fff'
  );
};

const STAND_VALUE = 100;

export const StoreCountChart = ({
  className,
  events,
  margin = {
    top: 16,
    left: 24,
    bottom: 16,
    right: 0,
  },
}: BarsProps) => {
  const { parentRef, width, height } = useParentSize();
  // bounds

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const data = weekStoreCountData;
  const colors = {
    0: '#D9D9D9',
    30: '#A9ACFF',
    130: '#171C8F',
  };

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<Date>({
        range: [0, innerWidth],
        round: true,
        domain: weekStoreCountData.map(getDate),
        paddingInner: 0.5,
        paddingOuter: 0,
      }),
    [innerWidth]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [innerHeight, 0],
        round: true,
        domain: [0, Math.max(...weekStoreCountData.map(getValue), 180)],
      }),
    [innerHeight]
  );

  const guideY = useMemo(() => yScale(STAND_VALUE), [yScale]);

  if (width < 10)
    return <ResponsiveContainer ref={parentRef} className={className ?? ''} />;

  return (
    <ResponsiveContainer ref={parentRef} className={className ?? ''}>
      <svg width={width} height={height}>
        <Group top={margin.top} left={margin.left}>
          {data.map((d, i) => {
            const date = getDate(d);
            const val = getValue(d);
            const barWidth = xScale.bandwidth();
            const barHeight = innerHeight - (yScale(val) ?? 0);
            const barX = xScale(date);
            const barY = innerHeight - barHeight;
            const color = getColor(d, colors);

            return (
              <Bar
                key={`bar-${i}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={color}
                rx={6}
                onClick={() => {
                  if (events)
                    alert(`clicked: ${JSON.stringify(Object.values(d))}`);
                }}
              />
            );
          })}

          <AxisBottom
            scale={xScale}
            left={0}
            top={innerHeight - 8}
            hideAxisLine
            hideTicks
            tickFormat={d => dayjs(d).format('MM/DD')}
            tickLabelProps={{
              fill: '#8E8E8E',
              fontSize: 10,
              textAnchor: 'middle',
              fontFamily: 'GmarketSans',
              dx: -1,
            }}
          />
          <AxisLeft
            scale={yScale}
            left={0}
            hideAxisLine
            hideTicks
            hideZero
            tickLabelProps={{
              fill: '#8E8E8E',
              fontSize: 10,
              textAnchor: 'middle',
              fontFamily: 'GmarketSans',
            }}
            tickValues={[100]}
            tickLength={12}
          />
          <Line
            from={{
              x: 0,
              y: guideY,
            }}
            to={{
              x: innerWidth,
              y: guideY,
            }}
            stroke="#D8D8D8"
            strokeWidth={1}
            strokeDasharray="4 4"
            pointerEvents="none"
          />
        </Group>
      </svg>
    </ResponsiveContainer>
  );
};

export const OnTimeAvgChart = ({
  className,
  events,
  margin = {
    top: 16,
    left: 24,
    bottom: 16,
    right: 0,
  },
}: BarsProps) => {
  const { parentRef, width, height } = useParentSize();

  // bounds
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const colors = {
    0: '#D9D9D9',
    30: '#FFE0C1',
    150: '#FA4616',
  };
  const data = weekOnTimeAvgData;

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<Date>({
        range: [0, innerWidth],
        round: true,
        domain: data.map(getDate),
        paddingInner: 0.5,
        paddingOuter: 0,
      }),
    [innerWidth]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [innerHeight, 0],
        round: true,
        domain: [0, Math.max(...data.map(getValue), 180)],
      }),
    [innerHeight]
  );

  const guideY = useMemo(() => yScale(STAND_VALUE), [yScale]);

  if (width < 10)
    return <ResponsiveContainer ref={parentRef} className={className ?? ''} />;

  return (
    <ResponsiveContainer ref={parentRef} className={className ?? ''}>
      <svg width={width} height={height}>
        <Group top={margin.top} left={margin.left}>
          {data.map((d, i) => {
            const letter = getDate(d);
            const barWidth = xScale.bandwidth();
            const barHeight = innerHeight - (yScale(getValue(d)) ?? 0);
            const barX = xScale(letter);
            const barY = innerHeight - barHeight;
            const color = getColor(d, colors);

            return (
              <Bar
                key={`bar-${letter}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={color}
                rx={6}
                onClick={() => {
                  if (events)
                    alert(`clicked: ${JSON.stringify(Object.values(d))}`);
                }}
              />
            );
          })}
          <AxisBottom
            scale={xScale}
            left={0}
            top={innerHeight - 8}
            hideAxisLine
            hideTicks
            tickFormat={d => dayjs(d).format('MM/DD')}
            tickLabelProps={{
              fill: '#8E8E8E',
              fontSize: 10,
              textAnchor: 'middle',
              fontFamily: 'GmarketSans',
              dx: -1,
            }}
          />
          <AxisLeft
            scale={yScale}
            left={0}
            hideAxisLine
            hideTicks
            hideZero
            tickLabelProps={{
              fill: '#8E8E8E',
              fontSize: 10,
              textAnchor: 'middle',
              fontFamily: 'GmarketSans',
            }}
            tickValues={[100]}
            tickLength={12}
          />
          <Line
            from={{
              x: 0,
              y: guideY,
            }}
            to={{
              x: innerWidth,
              y: guideY,
            }}
            stroke="#D8D8D8"
            strokeWidth={1}
            strokeDasharray="4 4"
            pointerEvents="none"
          />
        </Group>
      </svg>
    </ResponsiveContainer>
  );
};
