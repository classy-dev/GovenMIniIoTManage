import React, { useMemo } from 'react';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { useParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar, Line } from '@visx/shape';
import { Text } from '@visx/text';
import { descending, max, sort } from '@visx/vendor/d3-array';
import dayjs from 'dayjs';
import ResponsiveContainer from './ResponsiveContainer';

type BarChartData = {
  date: string;
  value: number;
};

export type BarsProps = {
  defaultColor?: string;
  toptierColor?: string;
  className?: string;
  valueFormat?: (val: number) => string;

  data: BarChartData[];
  margin?: { top: number; left: number; right: number; bottom: number };
};

// accessors
const getDate = (d: BarChartData) => d.date;
const getValue = (d: BarChartData) => d.value;

export const BarChart = ({
  defaultColor = '#A9ACFF',
  toptierColor = '#171C8F',
  data,
  className,
  valueFormat = (val: number) => `${val}`,
  margin = {
    top: 24,
    left: 24,
    bottom: 16,
    right: 6,
  },
}: BarsProps) => {
  const { parentRef, width, height } = useParentSize();
  // bounds

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, innerWidth],
        round: true,
        domain: data.map(getDate),
        paddingInner: 0.5,
        paddingOuter: 0,
      }),
    [innerWidth, data]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [innerHeight, 0],
        round: true,
        domain: [0, Math.max(...data.map(getValue))],
      }),
    [innerHeight, data]
  );

  const ranks = useMemo(
    () =>
      sort(data ?? [], (a, b) => descending(getValue(a), getValue(b)))
        .map(getValue)
        .slice(0, 2),
    [data]
  );

  const avg = useMemo(() => (max(data, getValue) ?? 0) / 2, [data]);
  const guideY = useMemo(() => yScale(avg), [yScale]);

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
            const barX = xScale(date) ?? 0;
            const barY = innerHeight - barHeight;
            const color = ranks.find(r => r <= val)
              ? toptierColor
              : defaultColor;

            return (
              <React.Fragment key={i}>
                <Text
                  x={barX + barWidth / 2}
                  y={barY - 6}
                  dominantBaseline="end"
                  textAnchor="middle"
                  fontSize={10}
                  fill="#8E8E8E"
                >
                  {valueFormat(val)}
                </Text>
                <Bar
                  key={`bar-${i}`}
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={color}
                  rx={6}
                  onClick={() => {}}
                />
              </React.Fragment>
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
            tickValues={avg >= 1 ? [avg] : []}
            tickFormat={d => valueFormat(d as number)}
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
