import Navigation from '@/components/Navigation';
import '@/styles/globals.css';

import React, { useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AppPropsWithLayout } from 'next';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import styled from '@emotion/styled';
import { authStore } from '@/mobx/authStore';

const LayoutWrapper = styled.div`
  max-width: 102.4rem;
`;

dayjs.extend(utc);
dayjs.extend(duration);

const Layout = ({ children }: React.PropsWithChildren) => (
  <LayoutWrapper className="mx-auto text-center font-sans bg-white min-h-[100vh]">
    <Navigation />
    {children}
  </LayoutWrapper>
);

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();
  const { current: queryClient } = React.useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
          onError: e => console.log(e),
        },
      },
      queryCache: new QueryCache(),
      mutationCache: new MutationCache(),
    })
  );

  useEffect(() => {
    if (!router.isReady) return;
    // 클라이언트 사이드에서만 실행 (인증 체크)
    authStore.loadFromLocalStorage();
    authStore.checkAuth();
  }, [router.isReady]);

  const renderPage = useMemo(
    () =>
      Component.getLayout ? (
        Component.getLayout(<Component {...pageProps} />)
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ),
    [Component, pageProps]
  );

  return (
    <>
      {/** GA 설정 */}
      {process.env.NEXT_PUBLIC_ANALYTICS_ID && (
        <>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-script" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}', {});
            `}
          </Script>
        </>
      )}
      <QueryClientProvider client={queryClient}>
        {renderPage}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};

export default App;
