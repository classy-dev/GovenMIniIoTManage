import { fetchDeviceInfo } from '@/api/device';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

const useDeviceInfo = (id: Identifier) => {
  const router = useRouter();
  const query = useQuery(['device-info', id], () => fetchDeviceInfo(id), {
    enabled: router.isReady,
    refetchInterval: 3000,
  });

  return query;
};

export default useDeviceInfo;
