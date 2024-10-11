import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { fetchDeviceTemperatureData } from '@/api/device';

const useDeviceTempData = (id: number) => {
  const [error, setError] = useState<any>(null);

  const router = useRouter();
  const query = useQuery(
    ['device-temperature', id],
    () => fetchDeviceTemperatureData(id),
    {
      enabled: router.isReady && !error,
      refetchInterval: 3000,
      onError: e => setError(e),
    }
  );

  return query;
};

export default useDeviceTempData;
