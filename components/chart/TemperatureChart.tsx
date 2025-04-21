import React, { useMemo } from 'react';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { curveLinear } from '@visx/curve';
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
    power_status: string | null;
  }[];
  currentTemperature: number;
  currentTime: Date;
  onLastStateChange?: (timestamp: Date | null, processedData: any[]) => void;
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
    onLastStateChange,
  }: Props & WithTooltipProvidedProps<ChartData>) => {
    const { parentRef, width, height } = useParentSize();

    // Round current time to nearest 5 minutes
    // const currentDateTime = roundToNearestFiveMinutes(currentTime);
    const nextDateTime = getNextFiveMinutes(currentTime);

    // Filter data to only show up to the current time and add current temperature as next tick
    const extendedData = useMemo(() => {
      const groupedData: {
        [key: string]: {
          datetime: string;
          temp: number;
          power_status: string | null;
        }[];
      } = {};

      // 데이터를 3분 단위로 그룹화
      data.forEach(d => {
        const date = new Date(d.datetime);
        const key = `${date.getHours()}:${Math.floor(date.getMinutes() / 3) * 3}`;

        if (!groupedData[key]) {
          groupedData[key] = [];
        }
        groupedData[key].push(d);
      });

      // 각 3분 그룹에서 최고 온도 값 선택하고 타임스탬프로 정렬
      const maxTempByGroup = Object.entries(groupedData)
        .map(([key, group]) => {
          // 그룹에서 최고 온도 값 선택
          const maxTempItem = group.reduce(
            (currentMax, item) =>
              item.temp > currentMax.temp ? item : currentMax,
            group[0]
          );

          return {
            ...maxTempItem,
            sortTimestamp: new Date(maxTempItem.datetime).getTime(), // 정렬용 타임스탬프
          };
        })
        .sort((a, b) => a.sortTimestamp - b.sortTimestamp); // 타임스탬프로 정확히 정렬

      // 온도 값과 전원 상태를 처리하는 로직
      const result = [];
      let lastValidTemp = 0;
      let lastPowerStatus = null; // "ON", "OFF", 또는 null을 저장
      let zeroCounter = 0;
      const MAX_ZERO_COUNT = 20; // 3분 단위로 20개 = 1시간

      // 현재 상태와 마지막 상태 변경 시점 추적을 위한 변수
      let currentState = 'inactive';
      let lastStateChange = null;
      let lastStateChangeIndex = -1;

      for (let i = 0; i < maxTempByGroup.length; i += 1) {
        const current = maxTempByGroup[i];

        // 전원 상태가 null이 아니면 마지막 상태 업데이트
        if (current.power_status !== null) {
          lastPowerStatus = current.power_status;
        }

        // 처리된 온도 값 (전원 OFF이면 0, 아니면 기존 로직대로)
        let processedTemp = 0;

        if (lastPowerStatus === 'OFF') {
          // 전원 상태가 OFF면 항상 온도를 0으로 설정
          processedTemp = 0;
        } else if (current.temp === 0) {
          // 온도가 0이고 전원이 꺼져있지 않은 경우 처리
          zeroCounter += 1;
          // 1시간 이내의 0값은 이전 값 유지 (전원이 OFF가 아닌 경우에만)
          if (zeroCounter <= MAX_ZERO_COUNT && lastValidTemp > 0) {
            processedTemp = lastValidTemp;
          } else {
            // 1시간 초과면 0으로 표시
            processedTemp = 0;
          }
        } else {
          // 유효한 온도가 들어오면 카운터 리셋 및 마지막 유효 온도 업데이트
          zeroCounter = 0;
          lastValidTemp = current.temp;
          processedTemp = current.temp;
        }

        // 현재 상태 (활성/비활성) 결정
        const state = processedTemp > 0 ? 'active' : 'inactive';

        // 상태가 변경된 경우 시점 기록
        if (i === 0) {
          currentState = state;
          lastStateChange = new Date(current.datetime);
          lastStateChangeIndex = 0;
        } else if (state !== currentState) {
          currentState = state;
          lastStateChange = new Date(current.datetime);
          lastStateChangeIndex = i;
        }

        result.push({
          datetime: current.datetime,
          temp: processedTemp,
          power_status: lastPowerStatus,
          original_temp: current.temp, // 원본 온도 값도 저장
        });
      }

      // 콜백을 통해 마지막 상태 변경 시점과 처리된 데이터 전달
      if (onLastStateChange) {
        // 현재 상태가 언제부터 시작됐는지 찾기
        let lastChangePoint = null;

        // 현재 상태 확인 (마지막 데이터 기준)
        if (result.length > 0) {
          const lastItem = result[result.length - 1];
          const lastState = lastItem.temp > 0 ? 'active' : 'inactive';

          // 현재 상태와 같은 첫 번째 연속 항목 찾기 (뒤에서부터)
          let prevState = null;
          for (let i = result.length - 1; i >= 0; i -= 1) {
            const state = result[i].temp > 0 ? 'active' : 'inactive';

            if (i === result.length - 1) {
              prevState = state;
            } else if (state !== prevState && state !== lastState) {
              // 현재 상태가 시작된 지점 찾음
              lastChangePoint = new Date(result[i + 1].datetime);
              break;
            }

            prevState = state;
          }

          // 찾지 못했으면 첫 항목 사용
          if (!lastChangePoint && result.length > 0) {
            lastChangePoint = new Date(result[0].datetime);
          }
        }

        onLastStateChange(lastChangePoint, result);
      }

      return result;
    }, [data, onLastStateChange]);

    // Transform data to temperature differences
    const transformedData = useMemo(
      () =>
        extendedData.length === 0
          ? []
          : [
              ...extendedData,
              {
                datetime: nextDateTime.toISOString(),
                temp: currentTemperature,
                power_status: null,
                display_time: nextDateTime.toISOString(),
              },
            ],
      [extendedData, currentTemperature, nextDateTime]
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
              curve={curveLinear}
            />
            <LinePath<(typeof transformedData)[number]>
              data={transformedData}
              x={d => timeScale(new Date(`${getTime(d)}`)) ?? 0}
              y={d => temperatureScale(getTemperature(d)) ?? 0}
              stroke="#FA4616"
              strokeWidth={2}
              curve={curveLinear}
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
