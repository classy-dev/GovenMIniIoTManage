import React, { useMemo, useRef, useState } from 'react';
import Pie, { ProvidedProps, PieArcDatum } from '@visx/shape/lib/shapes/Pie';
import { scaleOrdinal } from '@visx/scale';
import { Group } from '@visx/group';
import { GradientPinkBlue } from '@visx/gradient';

import { animated, useTransition, useSpring, to } from '@react-spring/web';
import { useParentSize } from '@visx/responsive';

// accessor functions
const names = ['on', 'off'];
// color scales
const getColorSpace = scaleOrdinal({
  domain: names,
  range: ['#FA4616', 'rgba(255, 184, 165, 0.4)'],
});

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

export type PieData = {
  label: string;
  value: number;
};

export type PieProps = {
  className?: string;
  margin?: typeof defaultMargin;
  data: PieData[];
  animate?: boolean;
};

export default function PieChart({
  className,
  margin = defaultMargin,
  data,
  animate = true,
}: PieProps) {
  const { parentRef, width, height } = useParentSize({ debounceTime: 150 });
  const prevCount = useRef(0);

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const donutThickness = 10;

  // Calculate progress percentage
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const onValue = data.find(item => item.label === 'on')?.value || 0;
  const progressPercentage = Math.round((onValue / totalValue) * 100);

  // Animate the progress percentage
  const { number } = useSpring({
    from: { number: prevCount.current },
    number: progressPercentage,
    onResolve: () => (prevCount.current = progressPercentage),
  });

  return (
    <div ref={parentRef} className={className ?? ''}>
      <svg width={width} height={height}>
        <GradientPinkBlue id="visx-pie-gradient" />
        <Group top={centerY + margin.top} left={centerX + margin.left}>
          <Pie
            data={data}
            outerRadius={radius}
            innerRadius={radius - donutThickness}
            pieValue={data => data.value}
            padAngle={0.005}
            cornerRadius={8}
            pieSort={(a, b) => (a.label === 'on' ? 1 : 0)}
          >
            {pie => (
              <AnimatedPie<(typeof data)[0]>
                {...pie}
                animate={animate}
                getKey={arc => arc.data.label}
                onClickDatum={({ data: { label } }) => {}}
                getColor={arc => getColorSpace(arc.data.label)}
              />
            )}
          </Pie>
          <text
            fill="#FA4616"
            x={0}
            y={0}
            className=""
            textAnchor="middle"
            fontWeight="bold"
            pointerEvents="none"
          >
            <animated.tspan
              className="text-[2.4rem] md:text-[4.2rem]"
              alignmentBaseline="middle"
              textAnchor={'middle'}
            >
              {number.to(n => `${n.toFixed(0)}`)}
            </animated.tspan>
            <tspan
              className="text-[1.4rem] md:text-[1.6rem]"
              dx="0.1em"
              dy="1em"
              alignmentBaseline="baseline"
            >
              %
            </tspan>
          </text>
        </Group>
      </svg>
    </div>
  );
}

// react-spring transition definitions
type AnimatedStyles = { startAngle: number; endAngle: number; opacity: number };

const fromLeaveTransition = ({ endAngle }: PieArcDatum<any>) => ({
  // enter from 360° if end angle is > 180°
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0,
});
const enterUpdateTransition = ({ startAngle, endAngle }: PieArcDatum<any>) => ({
  startAngle,
  endAngle,
  opacity: 1,
});

type AnimatedPieProps<Datum> = ProvidedProps<Datum> & {
  animate?: boolean;
  getKey: (d: PieArcDatum<Datum>) => string;
  getColor: (d: PieArcDatum<Datum>) => string;
  onClickDatum: (d: PieArcDatum<Datum>) => void;
  delay?: number;
};

function AnimatedPie<Datum>({
  animate,
  arcs,
  path,
  getKey,
  getColor,
  onClickDatum,
}: AnimatedPieProps<Datum>) {
  const transitions = useTransition<PieArcDatum<Datum>, AnimatedStyles>(arcs, {
    from: animate ? fromLeaveTransition : enterUpdateTransition,
    enter: enterUpdateTransition,
    update: enterUpdateTransition,
    leave: animate ? fromLeaveTransition : enterUpdateTransition,
    keys: getKey,
  });
  return transitions((props, arc, { key }) => {
    const [centroidX, centroidY] = path.centroid(arc);
    const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;

    return (
      <g key={key}>
        <animated.path
          // compute interpolated path d attribute from intermediate angle values
          d={to([props.startAngle, props.endAngle], (startAngle, endAngle) =>
            path({
              ...arc,
              startAngle,
              endAngle,
            })
          )}
          fill={getColor(arc)}
          onClick={() => onClickDatum(arc)}
          onTouchStart={() => onClickDatum(arc)}
        />
        {/* {hasSpaceForLabel && (
          <animated.g style={{ opacity: props.opacity }}>
            <text
              fill="white"
              x={centroidX}
              y={centroidY}
              dy=".33em"
              fontSize={9}
              textAnchor="middle"
              pointerEvents="none"
            >
              {getKey(arc)}
            </text>
          </animated.g>
        )} */}
      </g>
    );
  });
}
