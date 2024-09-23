import { fetchDeviceSettingInfo } from '@/api/device';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

const useDeviceSettingInfo = (id: Identifier) => {
  const router = useRouter();
  const query = useQuery(
    ['device-setting-info', id],
    () => fetchDeviceSettingInfo(id),
    {
      enabled: router.isReady,
    }
  );

  return query;
};

export default useDeviceSettingInfo;
