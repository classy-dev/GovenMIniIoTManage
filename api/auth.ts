import request from './request';

export const login = async ({ user_id = '', password = '' }) => {
  const res = await request.post<
    ServerResponse<{
      'go-auth': string;
      name: string;
      type: number;
    }>
  >('/mc/v2/iot/govenmini/login', {
    user_id,
    password,
  });

  return res.data.data;
};
