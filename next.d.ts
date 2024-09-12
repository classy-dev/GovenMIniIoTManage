import 'next';
import { NextComponentType } from 'next';
import { AppProps } from 'next/app';

declare module 'next' {
  type NextPageWithLayout = NextComponentType & {
    getLayout?: (page: ReactElement) => ReactNode;
  }

  type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
  }
}