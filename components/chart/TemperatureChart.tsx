import React, { useEffect, useMemo, useState } from 'react';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { useParentSize } from '@visx/responsive';
import { scaleLinear, scalePoint, scaleTime } from '@visx/scale';
import { AreaClosed, LinePath, Bar, Circle } from '@visx/shape';
import { withTooltip, Tooltip, TooltipWithBounds } from '@visx/tooltip';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import { max, extent, bisector, min, mean } from '@visx/vendor/d3-array';
import { Line } from '@visx/shape';
import dayjs from 'dayjs';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
import {
  curveBasis,
  curveLinear,
  curveCardinal,
  curveMonotoneX,
  curveMonotoneY,
  curveNatural,
  curveBundle,
} from '@visx/curve';
import styled from '@emotion/styled';
import ResponsiveContainer from './ResponsiveContainer';

interface Props {
  className?: string;
  margin?: { top: number; right: number; bottom: number; left: number };
  date: string;
  data: {
    time: string;
    temperature: number;
  }[];
  currentTemperature: number;
  currentTime: string;
}

const TooltipStyle = styled.div`
  position: relative;
  white-space: nowrap;
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  time {
    font-size: 1rem;
    margin-bottom: 0.7rem;
    color: #a0a0a0;
  }

  .temperature {
    font-size: 1.6rem;
    font-weight: bold;
    color: #fff;
  }
`;

const AnimatedCircle = styled(Circle)`
  transform-origin: center center;
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.5);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  animation: pulse 2s infinite;
`;

const WaveEffect = ({ cx, cy }: { cx: number; cy: number }) => (
  <g>
    <circle cx={cx} cy={cy} r="6" fill="#FA4616" />
    <circle cx={cx} cy={cy} r="6" fill="none" stroke="#FA4616" strokeWidth="2">
      <animate
        attributeName="r"
        from="6"
        to="15"
        dur="1.5s"
        begin="0s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        from="1"
        to="0"
        dur="1.5s"
        begin="0s"
        repeatCount="indefinite"
      />
    </circle>
  </g>
);

type ChartData = Props['data'][number] & {
  tempDifference?: number;
  display_time?: string;
};

const getTemperature = (d: ChartData) => d.temperature;
const getDiffTemperature = (d: ChartData) => d.tempDifference;
const getTime = (d: ChartData) => d.time;
const bisectDate = bisector<ChartData, string>(d => d.time).left;

const roundToNearestFiveMinutes = (date: Date) => {
  const minutes = 5 * Math.round(date.getMinutes() / 5);
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    minutes,
    0
  );
};

const getNextFiveMinutes = (date: Date) => {
  const nextDate = new Date(date.getTime() + 5 * 60000); // Add 5 minutes
  return roundToNearestFiveMinutes(nextDate);
};

export default withTooltip<Props, ChartData>(
  ({
    className,
    tooltipLeft = 0,
    tooltipTop = 0,
    tooltipData,
    showTooltip,
    hideTooltip,
    margin = { top: 100, right: 10, bottom: 24, left: 30 },
    currentTemperature,
    currentTime,
    data,
    date,
  }: Props & WithTooltipProvidedProps<ChartData>) => {
    const { parentRef, width, height } = useParentSize();
    const [initialTemperature, setInitialTemperature] = useState(-1);

    // Round current time to nearest 5 minutes
    const currentDateTime = roundToNearestFiveMinutes(
      new Date(`${date}T${currentTime}`)
    );
    const nextDateTime = getNextFiveMinutes(currentDateTime);

    // Filter data to only show up to the current time and add current temperature as next tick
    const extendedData = useMemo(() => {
      const filteredData = data.filter(
        d => new Date(`${date}T${d.time}`) <= currentDateTime
      );
      return [...filteredData];
    }, [data, currentDateTime]);

    // Calculate average temperature
    const averageTemperature = useMemo(
      () => mean(data, getTemperature) || 0,
      []
    );

    // Calculate temperature difference
    const calculateTempDifference = (temp: number) =>
      Math.round(temp * (initialTemperature / averageTemperature));

    // Transform data to temperature differences
    const transformedData = useMemo(
      () =>
        extendedData.length === 0
          ? []
          : [
              ...extendedData.map(d => ({
                ...d,
                tempDifference: calculateTempDifference(d.temperature),
              })),
              {
                time: nextDateTime.toTimeString().slice(0, 8),
                display_time: currentTime,
                temperature: currentTemperature,
                tempDifference: currentTemperature,
              },
            ],
      [extendedData, averageTemperature]
    );

    // bounds
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const safetooltipLeft = Math.max(Math.min(tooltipLeft, innerWidth - 1), 1);
    const safetooltipTop = Math.max(Math.min(tooltipTop, innerHeight), 0);

    // Calculate min and max temperature differences

    const maxDiff = max(transformedData, d => d.tempDifference) || 0;
    const yMin = 20;
    const yMax = Math.max(maxDiff);

    useEffect(() => {
      if (!isNaN(currentTemperature) && initialTemperature === -1) {
        setInitialTemperature(currentTemperature);
      }
    }, [currentTemperature, initialTemperature]);

    // scales
    const timeScale = useMemo(
      () =>
        scaleTime({
          range: [0, innerWidth],
          domain: extent(data, d => new Date(`${date}T${d.time}`)) as [
            Date,
            Date
          ],
        }),
      [innerWidth, data, date, currentDateTime]
    );

    const axiosScale = useMemo(
      () =>
        scalePoint({
          range: [0, innerWidth],
          domain: extent(data, d => d.time) as [string, string],
        }),
      [innerWidth, data]
    );

    const temperatureScale = useMemo(
      () =>
        scaleLinear({
          range: [innerHeight, 0],
          domain: [yMin, yMax],
          nice: true,
        }),
      [innerHeight, yMin, yMax]
    );

    const guideY = useMemo(
      () => temperatureScale(calculateTempDifference(230)),
      [temperatureScale, calculateTempDifference]
    );

    // tooltip handler
    const handleTooltip = (
      event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>
    ) => {
      const { x } = localPoint(event) || { x: 0 };
      const safeX = Math.min(
        Math.max(x, margin.left),
        innerWidth + margin.left + 1
      );

      const x0 = timeScale.invert(safeX - margin.left);
      const index = bisectDate(
        transformedData,
        x0.toTimeString().slice(0, 8),
        1
      );
      const d0 = transformedData[index - 1];
      const d1 = transformedData[index];
      let d = d0;

      if (d) {
        showTooltip({
          tooltipData: d,
          tooltipLeft: margin.left + timeScale(new Date(`${date}T${d.time}`)),
          tooltipTop: temperatureScale(
            calculateTempDifference(getTemperature(d))
          ),
        });
      } else {
        hideTooltip();
      }
    };

    if (width < 10 || isNaN(currentTemperature) || !currentTime)
      return (
        <ResponsiveContainer ref={parentRef} className={className ?? ''} />
      );

    return (
      <ResponsiveContainer
        ref={parentRef}
        className={`relative ${className ?? ''}`}
      >
        {tooltipData && (
          <Tooltip
            key={Math.random()}
            top={margin.top - 85}
            left={safetooltipLeft - 65}
            applyPositionStyle
            style={{
              boxShadow: 'none',
              boxSizing: 'border-box',
              borderRadius: '0.6rem',
              padding: '0.8rem 1.6rem',
              background: '#3f3f3f',
            }}
          >
            <TooltipStyle>
              <time>
                {dayjs(
                  `${date} ${
                    tooltipData.display_time
                      ? tooltipData.display_time
                      : getTime(tooltipData)
                  }`
                ).format('YYYY.MM.DD HH:mm')}
              </time>
              <span className="temperature">
                {getDiffTemperature(tooltipData)}
                <span className="unit">°C</span>
              </span>
            </TooltipStyle>
          </Tooltip>
        )}
        <svg width={width} height={height}>
          <LinearGradient
            id="area-gradient"
            from="rgba(250, 70, 22, 0.3)"
            to="rgba(250, 70, 22, 0.3)"
            fromOffset={0.15}
            toOffset={0.65}
            toOpacity={0}
          />
          <g transform={`translate(${margin.left},${margin.top})`}>
            <AxisBottom
              scale={axiosScale}
              left={0}
              top={innerHeight + 2}
              strokeWidth={2}
              stroke={'rgba(226, 226, 226, 1)'}
              tickStroke={'#170b0b'}
              tickLabelProps={(v, i) => ({
                fill: 'rgba(193, 193, 193, 1)',
                fontSize: 12,
                textAnchor: i === 0 ? 'start' : 'end',
                fontFamily: 'GmarketSans',
              })}
              hideTicks
              tickLength={1}
              tickFormat={v => dayjs(`${date} ${v}`).format('HH') + 'H'}
            />
            <AxisLeft
              scale={temperatureScale}
              top={0}
              left={0}
              hideAxisLine
              hideTicks
              hideZero
              tickValues={[yMax]}
              tickLabelProps={{
                fill: '#C1C1C1',
                fontSize: 12,
                dy: 4,
                dx: 4,
                fontWeight: 400,
                fontFamily: 'GmarketSans',
              }}
            />
            <AreaClosed<(typeof transformedData)[number]>
              data={transformedData}
              x={d => timeScale(new Date(`${date}T${d.time}`)) ?? 0}
              y={d => temperatureScale(d.tempDifference) ?? 0}
              yScale={temperatureScale}
              fill="url(#area-gradient)"
              curve={curveBasis}
            />
            <LinePath<(typeof transformedData)[number]>
              data={transformedData}
              x={d => timeScale(new Date(`${date}T${d.time}`)) ?? 0}
              y={d => temperatureScale(d.tempDifference) ?? 0}
              stroke="#FA4616"
              strokeWidth={2}
              curve={curveBasis}
            />
            <Bar
              x={0}
              y={0}
              width={innerWidth}
              height={innerHeight}
              fill="transparent"
              rx={14}
              onTouchStart={handleTooltip}
              onTouchMove={handleTooltip}
              onMouseMove={handleTooltip}
              onMouseLeave={() => hideTooltip()}
            />

            {yMax >= 230 && (
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
                strokeWidth={2}
                strokeDasharray="4 4"
                pointerEvents="none"
              />
            )}

            {tooltipData && (
              <g>
                <Line
                  from={{ x: tooltipLeft - margin.left, y: -20 }}
                  to={{ x: tooltipLeft - margin.left, y: innerHeight }}
                  stroke="#B2B2B2"
                  strokeWidth={1}
                  pointerEvents="none"
                />
                <circle
                  cx={tooltipLeft - margin.left}
                  cy={-20}
                  r={5}
                  fill="#fff"
                  stroke="#B2B2B2"
                  strokeWidth={1}
                  pointerEvents="none"
                />
              </g>
            )}

            <WaveEffect
              cx={timeScale(nextDateTime) ?? 0}
              cy={temperatureScale(currentTemperature) ?? 0}
            />
          </g>
        </svg>
      </ResponsiveContainer>
    );
  }
);
