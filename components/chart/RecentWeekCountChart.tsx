import React, { useMemo, useCallback } from 'react';
import { AreaClosed, Bar, Line, LinePath } from '@visx/shape';

import { scaleLinear, scaleBand } from '@visx/scale';
import { curveBasis, curveLinear } from '@visx/curve';
import { withTooltip } from '@visx/tooltip';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import { LinearGradient } from '@visx/gradient';
import { max, extent, bisector, min } from '@visx/vendor/d3-array';
import { useParentSize } from '@visx/responsive';
import { AxisBottom, AxisLeft } from '@visx/axis';
import dayjs from 'dayjs';
import { getRandomInRange } from '@/util/rangeRandom';
import ResponsiveContainer from './ResponsiveContainer';

// type TooltipData = GroupDateValue;
// const stock = mockupValue;

export const background = '#fff';
export const background2 = '#fff';
export const accentColor = 'rgba(250, 70, 22, 0.3)';
export const accentColorDark = '#171C8F';

const today = dayjs(Date.now());

const mockup = Array.from({ length: 7 }, (v, i) => ({
  date: today.add(i, 'day').toDate(),
  value: i === 0 ? 0 : getRandomInRange(100, 300),
})).reverse();

type ChartData = (typeof mockup)[number];

const getDate = (d: ChartData) => new Date(d.date);
const getValue = (data: ChartData) => data.value;

export type AreaProps = {
  className?: string;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export default ({
  className,
  margin = { top: 36, right: 16, bottom: 16, left: 32 },
}: AreaProps) => {
  const { parentRef, width, height } = useParentSize();

  // bounds
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const XScale = useMemo(
    () =>
      scaleBand({
        domain: mockup.map(getDate),
        range: [0, innerWidth],
        paddingInner: 1,
        paddingOuter: 0,
      }),
    [innerWidth, margin.left]
  );

  const YScale = useMemo(
    () =>
      scaleLinear({
        range: [innerHeight, 0],
        domain: [
          min(mockup, getValue) || 0,
          Math.max(max(mockup, getValue) ?? 0, 230),
        ],
        nice: true,
      }),
    [margin.top, innerHeight]
  );

  const guideY = useMemo(() => YScale(230), [YScale]);

  if (width < 10)
    return <ResponsiveContainer ref={parentRef} className={className ?? ''} />;

  return (
    <ResponsiveContainer ref={parentRef} className={className ?? ''}>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="url(#area-background-gradient)"
          rx={14}
        />
        <g transform={`translate(${margin.left},${margin.top})`}>
          <Line
            from={{
              x: 0,
              y: guideY,
            }}
            to={{
              x: innerWidth,
              y: guideY,
            }}
            stroke="#D08483"
            strokeWidth={1}
            strokeDasharray="4 4"
            pointerEvents="none"
          />
          <LinearGradient
            id="area-gradient"
            from={accentColor}
            to={accentColor}
            toOpacity={0}
          />
          <LinePath<ChartData>
            data={mockup}
            y={d => YScale(getValue(d)) ?? 0}
            x={d => XScale(getDate(d)) ?? 0}
            strokeWidth={2}
            stroke="#FA4616"
            curve={curveLinear}
          />
          <AreaClosed<ChartData>
            data={mockup}
            y={d => YScale(getValue(d)) ?? 0}
            x={d => XScale(getDate(d)) ?? 0}
            yScale={YScale}
            strokeWidth={0}
            stroke="#FA4616"
            fill="url(#area-gradient)"
            curve={curveLinear}
          />
          <AxisBottom
            scale={XScale}
            left={0}
            top={innerHeight}
            strokeWidth={2}
            stroke={'rgba(226, 226, 226, 1)'}
            tickStroke={'#170b0b'}
            tickLabelProps={(v, i, values) => ({
              fill: 'rgba(193, 193, 193, 1)',
              fontSize: 10,
              textAnchor: 'middle',
              fontFamily: 'GmarketSans',
            })}
            hideTicks
            tickLength={5}
            tickFormat={d => dayjs(d).format('MM/DD')}
          />
          <AxisLeft
            scale={YScale}
            top={0}
            left={0}
            hideAxisLine
            hideTicks
            hideZero
            tickValues={[230]}
            tickLabelProps={{
              fill: '#C1C1C1',
              fontSize: 10,
              dy: 4,
              dx: 4,
              fontWeight: 400,
              fontFamily: 'GmarketSans',
            }}
          />
        </g>
      </svg>
    </ResponsiveContainer>
  );
};
