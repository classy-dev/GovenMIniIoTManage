const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1440px',
} as const;

export const mq = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label as keyof typeof breakpoints] = `@media (max-width: ${
    breakpoints[label as keyof typeof breakpoints]
  })`;
  return acc;
}, {} as Record<keyof typeof breakpoints, string>);
