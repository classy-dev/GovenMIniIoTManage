import React from 'react';
import { useRouter } from 'next/router';

interface RoutingOptions {
  passQuery?: boolean;
  count?: number;
}

const useBack = (options?: RoutingOptions) => {
  const router = useRouter();

  const opt = options ?? { count: 1, passQuery: false };

  const back = React.useCallback(
    (passQuery: boolean = false) => {
      const [pathname, search] = router.asPath.split('?');
      const split = pathname.split('/').filter(value => value);
      const path = split.slice(0, split.length - (opt.count || 1)).join('/');

      router.push({
        pathname: `/${path}`,
        search: opt.passQuery || passQuery ? search : undefined,
      });
      
    },
    [router]
  );

  return back;
};

export default useBack;
