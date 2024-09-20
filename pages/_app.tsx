import Navigation from '@/components/Navigation';
import '@/styles/globals.css';
import styled from '@emotion/styled';
import { AppPropsWithLayout } from 'next';

import type { AppProps } from 'next/app';
import Script from 'next/script';
import { ReactNode, useCallback, useMemo } from 'react';

const LayoutWrapper = styled.div`
  max-width: 102.4rem;
`;

const Layout = ({ children }: React.PropsWithChildren) => (
  <LayoutWrapper className="mx-auto text-center font-sans bg-white min-h-[100vh]">
    <Navigation />
    {children}
  </LayoutWrapper>
);

export default function App({ Component, pageProps }: AppPropsWithLayout) {
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
          {/* <Script defer strategy="afterInteractive">
            {`
              function handleAndroidKeyboard() {
                const metaViewport = document.querySelector('meta[name=viewport]');
                const originalContent = metaViewport.getAttribute('content');
                const originalHeight = window.visualViewport.height;

                window.visualViewport.addEventListener('resize', () => {
                  if (window.visualViewport.height < originalHeight) {
                    // 키보드가 올라왔을 때
                    metaViewport.setAttribute('content', originalContent + ', height=' + window.visualViewport.height + 'px');
                  } else {
                    // 키보드가 내려갔을 때
                    metaViewport.setAttribute('content', originalContent);
                  }
                  
                  // 스크롤 컨테이너의 높이 조정
                  const scrollContainer = document.querySelector('#__next');
                  scrollContainer.style.height = window.visualViewport.height + 'px';
                });
              }
              handleAndroidKeyboard();
              // 페이지 로드 시 함수 실행
              window.addEventListener('load', handleAndroidKeyboard);
            `}
          </Script> */}
        </>
      )}
      {renderPage}
    </>
  );
}
