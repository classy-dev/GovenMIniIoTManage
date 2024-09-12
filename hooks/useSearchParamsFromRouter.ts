import React from 'react';
import { useRouter } from 'next/router';

const useSearchParamsFromRouter = (watch?: boolean) => {
  const router = useRouter();
  const search = React.useMemo(
    () => router.asPath?.split('?')?.[1] ?? '',
    [!watch ? !watch : router.asPath]
  );
  const qs = React.useMemo(() => new URLSearchParams(search), [search]);

  const get = React.useCallback(
    (key: string) => qs.get(key) ?? undefined,
    [qs]
  );
  const getAll = React.useCallback(
    (key: string) => qs.getAll(key) ?? undefined,
    [qs]
  );
  const toString = React.useCallback(() => qs.toString(), [qs]);

  const memoizeQs = React.useMemo(
    () => ({
      get,
      getAll,
      toString,
    }),
    [qs]
  );

  return memoizeQs;
};

export default useSearchParamsFromRouter;
