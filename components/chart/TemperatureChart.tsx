import React, { useMemo } from 'react';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { curveBasis } from '@visx/curve';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
import { useParentSize } from '@visx/responsive';
import { scaleLinear, scalePoint, scaleTime } from '@visx/scale';
import { AreaClosed, LinePath, Bar, Line } from '@visx/shape';
import { withTooltip, Tooltip } from '@visx/tooltip';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import { extent, bisector, max } from '@visx/vendor/d3-array';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import ResponsiveContainer from './ResponsiveContainer';

interface Props {
  className?: string;
  margin?: { top: number; right: number; bottom: number; left: number };

  data: {
    datetime: string;
    temp: number;
  }[];
  currentTemperature: number;
  currentTime: Date;
}

const TooltipStyle = styled.div`
  position: relative;
  white-space: nowrap;
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  time {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: #a0a0a0;
  }

  .temperature {
    font-size: 2.2rem;
    font-weight: bold;
    color: #fff;
  }
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
  display_time?: string;
};

const getTemperature = (d: ChartData) => d.temp;
const getTime = (d: ChartData) => d.datetime;
const bisectDate = bisector<ChartData, string>(d => d.datetime).left;
const toDateString = (date: Date) => dayjs(date).format('YYYY-MM-DD HH:mm:ss');

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
    margin = { top: 120, right: 36, bottom: 24, left: 30 },
    currentTemperature,
    currentTime,
    data,
  }: Props & WithTooltipProvidedProps<ChartData>) => {
    const { parentRef, width, height } = useParentSize();

    // Round current time to nearest 5 minutes
    // const currentDateTime = roundToNearestFiveMinutes(currentTime);
    const nextDateTime = getNextFiveMinutes(currentTime);

    // Filter data to only show up to the current time and add current temperature as next tick
    const extendedData = useMemo(
      () => data.filter(d => new Date(`${d.datetime}`).getMinutes() % 5 === 0),
      [data]
    );

    // Transform data to temperature differences
    const transformedData = useMemo(
      () =>
        extendedData.length === 0
          ? []
          : [
              ...extendedData,
              {
                datetime: toDateString(nextDateTime),
                display_time: toDateString(currentTime),
                temp: currentTemperature,
              },
            ],

      [extendedData, currentTemperature]
    );

    // bounds
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const safetooltipLeft = Math.max(Math.min(tooltipLeft, innerWidth - 1), 1);

    // Calculate min and max temperature differences
    const yMin = 0;
    const yMax = max(transformedData, getTemperature) ?? 0;

    // scales
    const timeScale = useMemo(
      () =>
        scaleTime({
          range: [0, innerWidth],
          domain: extent(transformedData, d => new Date(`${d.datetime}`)) as [
            Date,
            Date,
          ],
        }),
      [innerWidth, transformedData]
    );

    const axiosScale = useMemo(
      () =>
        scalePoint({
          range: [0, innerWidth],
          domain: extent(transformedData, getTime) as [string, string],
        }),
      [innerWidth, transformedData]
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

    const guideY = useMemo(() => temperatureScale(230), [temperatureScale]);

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

      const index = bisectDate(transformedData, toDateString(x0), 1);
      const d0 = transformedData[index - 1];
      const d = d0;

      if (d) {
        showTooltip({
          tooltipData: d,
          tooltipLeft: margin.left + timeScale(new Date(d.datetime)),
          tooltipTop: temperatureScale(getTemperature(d)),
        });
      } else {
        hideTooltip();
      }
    };

    if (width < 10 || Number.isNaN(currentTemperature) || !currentTime)
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
            key={tooltipData?.datetime}
            top={margin.top - 65}
            left={safetooltipLeft}
            applyPositionStyle
            style={{
              boxShadow: 'none',
              boxSizing: 'border-box',
              borderRadius: '0.8rem',
              padding: '1.1rem 2.2rem',
              background: '#3f3f3f',
              transform: 'translate(calc(-50% - 1rem) , -50%)',
            }}
          >
            <TooltipStyle>
              <time>
                {dayjs(
                  tooltipData?.display_time
                    ? tooltipData.display_time
                    : getTime(tooltipData ?? {})
                ).format('YYYY.MM.DD HH:mm')}
              </time>
              <span className="temperature">
                {getTemperature(tooltipData ?? {})}
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
              stroke="rgba(226, 226, 226, 1)"
              tickStroke="#170b0b"
              tickLabelProps={(v, i) => ({
                fill: 'rgba(193, 193, 193, 1)',
                fontSize: 12,
                textAnchor: 'middle',
                fontFamily: 'GmarketSans',
              })}
              hideTicks
              tickLength={1}
              tickFormat={v =>
                v === toDateString(nextDateTime) ? 'now' : '-24H'
              }
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
              x={d => timeScale(new Date(`${getTime(d)}`)) ?? 0}
              y={d => temperatureScale(getTemperature(d)) ?? 0}
              yScale={temperatureScale}
              fill="url(#area-gradient)"
              curve={curveBasis}
            />
            <LinePath<(typeof transformedData)[number]>
              data={transformedData}
              x={d => timeScale(new Date(`${getTime(d)}`)) ?? 0}
              y={d => temperatureScale(getTemperature(d)) ?? 0}
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

          <rect
            x={0}
            y={0}
            fill="transparent"
            width={innerWidth + margin.left + margin.right}
            height={innerHeight + margin.top + margin.bottom}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
        </svg>
      </ResponsiveContainer>
    );
  }
);
