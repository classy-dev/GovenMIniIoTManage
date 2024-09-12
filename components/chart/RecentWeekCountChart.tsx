import React, { useMemo, useCallback } from 'react';
import { AreaClosed, Line, Bar, LinePath } from '@visx/shape';
import mockupValue, {
  GroupDateValue,
} from '@visx/mock-data/lib/mocks/groupDateValue';
import { scaleTime, scaleLinear, scaleBand } from '@visx/scale';
import { withTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
import { max, extent, bisector } from '@visx/vendor/d3-array';
import { useParentSize } from '@visx/responsive';
import { AxisBottom } from '@visx/axis';
import dayjs from 'dayjs';

type TooltipData = GroupDateValue;

const stock = mockupValue;
export const background = '#fff';
export const background2 = '#fff';
export const accentColor = 'rgba(250, 70, 22, 0.3)';
export const accentColorDark = '#171C8F';
const tooltipStyles = {
  ...defaultStyles,
  background,
  border: '1px solid white',
  color: '#FA4616',
  lineHeight: 1.2,
};

// accessors
const getDate = (d: GroupDateValue) => new Date(d.date);
const getStockValue = (d: GroupDateValue) => Math.floor(Number(d.value));
const bisectDate = bisector<GroupDateValue, Date>(d => new Date(d.date)).left;

export type AreaProps = {
  className?: string;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export default withTooltip<AreaProps, TooltipData>(
  ({
    className,
    margin = { top: 0, right: 0, bottom: 12, left: 0 },
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  }: AreaProps & WithTooltipProvidedProps<TooltipData>) => {
    const { parentRef, width, height } = useParentSize();

    // bounds
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const safetooltipLeft = Math.max(Math.min(tooltipLeft, innerWidth - 1), 1);
    const safetooltipTop = Math.max(Math.min(tooltipTop, innerHeight), 0);

    const _dateScale = useMemo(
      () =>
        scaleBand<string>({
          domain: stock.map(d => dayjs(d.date).format('MM/DD')),
          range: [0, innerWidth],
        }),
      [innerWidth]
    );

    // scales
    const dateScale = useMemo(
      () =>
        scaleTime({
          range: [margin.left, innerWidth + margin.left],
          domain: extent(stock, getDate) as [Date, Date],
        }),
      [innerWidth, margin.left]
    );

    const stockValueScale = useMemo(
      () =>
        scaleLinear({
          range: [innerHeight + margin.top, margin.top],
          domain: [0, (max(stock, getStockValue) || 0) + innerHeight / 3],
          nice: true,
        }),
      [margin.top, innerHeight]
    );

    // tooltip handler
    const handleTooltip = useCallback(
      (
        event:
          | React.TouchEvent<SVGRectElement>
          | React.MouseEvent<SVGRectElement>
      ) => {
        const { x } = localPoint(event) || { x: 0 };
        const x0 = dateScale.invert(x);
        const index = bisectDate(stock, x0, 1);
        const d0 = stock[index - 1];
        const d1 = stock[index];
        let d = d0;
        if (d1 && getDate(d1)) {
          d =
            x0.valueOf() - getDate(d0).valueOf() >
            getDate(d1).valueOf() - x0.valueOf()
              ? d1
              : d0;
        }
        showTooltip({
          tooltipData: d,
          tooltipLeft: x,
          tooltipTop: stockValueScale(getStockValue(d)),
        });
      },
      [showTooltip, stockValueScale, dateScale]
    );

    if (width < 10) return <div ref={parentRef} className={className ?? ''} />;

    return (
      <div ref={parentRef} className={className ?? ''}>
        <svg width={width} height={height}>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="url(#area-background-gradient)"
            rx={14}
          />
          <LinearGradient
            id="area-gradient"
            from={accentColor}
            to={accentColor}
            toOpacity={0}
          />
          <LinePath<GroupDateValue>
            data={stock}
            x={d => dateScale(getDate(d)) ?? 0}
            y={d => stockValueScale(getStockValue(d)) ?? 0}
            shapeRendering="geometricPrecision"
            strokeWidth={2}
            stroke="#FA4616"
          />
          <AreaClosed<GroupDateValue>
            data={stock}
            x={d => dateScale(getDate(d)) ?? 0}
            y={d => stockValueScale(getStockValue(d)) ?? 0}
            yScale={stockValueScale}
            strokeWidth={0}
            stroke="#FA4616"
            fill="url(#area-gradient)"
          />

          <Bar
            x={margin.left}
            y={margin.top}
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            rx={14}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: safetooltipLeft, y: margin.top }}
                to={{ x: safetooltipLeft, y: innerHeight + margin.top - 12 }}
                stroke={accentColorDark}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="5,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={accentColorDark}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
          <AxisBottom
            left={margin.left}
            top={innerHeight - 12}
            scale={_dateScale}
            stroke={'rgba(226, 226, 226, 1)'}
            strokeWidth={2}
            tickLabelProps={{
              fill: 'rgba(193, 193, 193, 1)',
              fontSize: 11,
              textAnchor: 'middle',
              fontWeight: 400,
              dy: -5,
            }}
            hideTicks
          />
        </svg>

        {tooltipData && (
          <div>
            <TooltipWithBounds
              key={Math.random()}
              top={tooltipTop - 12}
              left={Math.max(Math.min(tooltipLeft, innerWidth), 0)}
              style={tooltipStyles}
            >
              {`${getStockValue(tooltipData)}회 \n`}

              <br />
              {dayjs(getDate(tooltipData)).format('MM/DD')}
            </TooltipWithBounds>
          </div>
        )}
      </div>
    );
  }
);
