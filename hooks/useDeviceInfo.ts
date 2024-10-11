import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { fetchDeviceInfo } from '@/api/device';

const useDeviceInfo = (id: Identifier) => {
  const [error, setError] = useState<any>(null);
  const router = useRouter();
  const query = useQuery(['device-info', id], () => fetchDeviceInfo(id), {
    enabled: router.isReady && !error,
    refetchInterval: 3000,
    onError: e => setError(e),
  });

  return query;
};

export default useDeviceInfo;
