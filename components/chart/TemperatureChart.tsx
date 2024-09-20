import React, { useMemo } from 'react';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { useParentSize } from '@visx/responsive';
import { scaleBand, scaleLinear, scalePoint, scaleTime } from '@visx/scale';
import { AreaClosed, LinePath, Bar } from '@visx/shape';
import { withTooltip, Tooltip, TooltipWithBounds } from '@visx/tooltip';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import { max, extent, bisector } from '@visx/vendor/d3-array';
import { Line } from '@visx/shape';
import dayjs from 'dayjs';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
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

type ChartData = Props['data'][number];

const getTemperature = (d: ChartData) => d.temperature;
const getTime = (d: ChartData) => d.time;
const bisectDate = bisector<ChartData, string>(d => d.time).left;

const sampleData = (data: ChartData[], sampleSize: number): ChartData[] => {
  const step = Math.floor(data.length / sampleSize);
  return data.filter((_, index) => index % step === 0);
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
    data,
    date,
  }: Props & WithTooltipProvidedProps<ChartData>) => {
    const { parentRef, width, height } = useParentSize();

    // Sample the data
    const sampledData = useMemo(
      () => data.filter((v, i) => i % 60 === 0),
      [data]
    );

    // bounds
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const safetooltipLeft = Math.max(Math.min(tooltipLeft, innerWidth - 1), 1);
    const safetooltipTop = Math.max(Math.min(tooltipTop, innerHeight), 0);

    // scales
    const timeScale = useMemo(
      () =>
        scaleTime({
          range: [0, innerWidth],
          domain: extent(sampledData, d => new Date(`${date}T${d.time}`)) as [
            Date,
            Date
          ],
        }),
      [innerWidth, sampledData, date]
    );

    const axiosScale = useMemo(
      () =>
        scalePoint({
          range: [0, innerWidth],
          domain: extent(sampledData, d => d.time) as [string, string],
        }),
      [innerWidth, sampleData]
    );

    const temperatureScale = useMemo(
      () =>
        scaleLinear({
          range: [innerHeight, 0],
          domain: [0, 300],
          nice: true,
        }),
      [innerHeight, sampledData]
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
      const index = bisectDate(sampledData, x0.toTimeString().slice(0, 8), 1);
      const d0 = sampledData[index - 1];
      const d1 = sampledData[index];
      let d = d0;

      showTooltip({
        tooltipData: d,
        tooltipLeft: safeX,
        tooltipTop: temperatureScale(getTemperature(d)),
      });
    };

    if (width < 10)
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
                {dayjs(`${date} ${getTime(tooltipData)}`).format(
                  'YYYY.MM.DD HH:mm'
                )}
              </time>
              <span className="temperature">
                {getTemperature(tooltipData)}
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
              tickFormat={v =>
                dayjs(`${date} ${v}`).hour() === 0 ? '0' : '24H'
              }
            />
            <AxisLeft
              scale={temperatureScale}
              top={0}
              left={0}
              hideAxisLine
              hideTicks
              hideZero
              tickValues={[230, 300]}
              tickLabelProps={{
                fill: '#C1C1C1',
                fontSize: 12,
                dy: 4,
                dx: 4,
                fontWeight: 400,
                fontFamily: 'GmarketSans',
              }}
            />
            <AreaClosed<ChartData>
              data={sampledData}
              x={d => timeScale(new Date(`${date}T${getTime(d)}`)) ?? 0}
              y={d => temperatureScale(getTemperature(d)) ?? 0}
              yScale={temperatureScale}
              fill="url(#area-gradient)"
            />
            <LinePath<ChartData>
              data={sampledData}
              x={d => timeScale(new Date(`${date}T${getTime(d)}`)) ?? 0}
              y={d => temperatureScale(getTemperature(d)) ?? 0}
              stroke="#FA4616"
              strokeWidth={2}
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
          </g>
        </svg>
      </ResponsiveContainer>
    );
  }
);
