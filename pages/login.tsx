import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'next';
import { useMutation } from 'react-query';
import { login } from '@/api/auth';
import Spinner from '@/components/icons/Spinner';
import Seo from '@/components/Seo';
import { authStore } from '@/mobx/authStore';

const LoginPage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const loginMutate = useMutation(login);

  useEffect(() => {
    // 로그인되어있을시 대시보드 이동
    if (router.isReady && authStore.isAuthenticated) {
      router.replace('/');
    }
  }, [router.isReady, authStore.isAuthenticated]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = await loginMutate.mutateAsync({
      user_id: userId,
      password,
    });

    authStore.setUserInfo({
      ...data,
      goAuth: data['go-auth'],
    });

    router.replace('/');
    // TODO: Implement login logic
  };

  return (
    <>
      <Seo title="로그인 | GOVEN MINI" description="" image="" url="" />
      <div className="flex h-screen">
        {/* Image Area */}
        <div
          className="hidden md:flex md:w-1/2 bg-orange-50"
          style={{
            backgroundImage: `url(/img_goven.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Image will be added here */}
        </div>

        {/* Login Area */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-16 bg-white leading-none">
          <div className="w-full max-w-[45.4rem] text-center">
            <h1 className="inline-flex">
              <svg
                width="171"
                height="48"
                viewBox="0 0 171 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.6993 21.4328C18.9479 21.4328 19.1637 21.6655 19.1637 21.8981V32.4982C19.1637 32.7979 19.0101 33.0976 18.7907 33.2987C16.9369 34.9984 14.0921 36 11.1267 36C4.44995 36 0 31.2008 0 24C0 16.7992 4.44995 12 11.1267 12C13.4157 12 15.8253 12.7335 17.617 13.9362C17.862 14.0703 17.957 14.3345 17.8949 14.5357L16.3482 19.4374C16.2568 19.6701 16.041 19.7726 15.7595 19.7056C14.4943 18.9721 12.8562 18.5383 11.3095 18.5383C8.46478 18.5383 6.55243 20.7387 6.55243 24.0039C6.55243 27.2691 8.46844 29.5366 11.3095 29.5366C12.454 29.5366 13.2255 29.304 13.5656 28.9017V26.9694H10.7208C10.4429 26.9694 10.2565 26.8354 10.2272 26.6027L9.82499 22.0007C9.79209 21.6655 9.97857 21.4328 10.3186 21.4328H18.6956H18.6993Z"
                  fill="#F14616"
                />
                <path
                  d="M31.2923 36C24.7069 36 20.3191 31.2008 20.3191 24.0315C20.3191 16.8623 24.7106 12 31.2923 12C37.8739 12 42.2654 16.7992 42.2654 24.0315C42.2654 31.2639 37.8776 36 31.2923 36ZM31.2923 18.7355C28.7583 18.7355 27.058 20.8689 27.058 24.0355C27.058 27.2021 28.7583 29.3355 31.2923 29.3355C33.8262 29.3355 35.5265 27.2021 35.5265 24.0355C35.5265 20.8689 33.8262 18.7355 31.2923 18.7355Z"
                  fill="#F14616"
                />
                <path
                  d="M63.1659 12.3975C63.4109 12.3975 63.5682 12.6301 63.4767 12.8628L56.3978 34.9305C56.3356 35.1632 56.087 35.3958 55.842 35.3958H49.0409C48.7923 35.3958 48.5473 35.1632 48.4851 34.9305L41.4098 12.8667C41.3184 12.6341 42.046 12.4014 42.2947 12.4014H48.6131C48.891 12.4014 49.1396 12.6341 49.2018 12.8667L52.4488 26.5664L55.6957 12.8667C55.7579 12.6341 56.0065 12.4014 56.2844 12.4014H63.1769L63.1659 12.3975Z"
                  fill="#F14616"
                />
                <path
                  d="M79.4264 29.3938C79.675 29.3938 79.8908 29.595 79.8908 29.8276V34.9265C79.8908 35.1592 79.675 35.3919 79.4264 35.3919H65.0527C64.837 35.3919 64.6212 35.1277 64.5591 34.8911V12.8628C64.5591 12.5631 64.7127 12.3975 64.9906 12.3975H79.0534C79.3313 12.3975 79.547 12.6301 79.547 12.8628V17.8947C79.547 18.1944 79.3313 18.3955 79.0534 18.3955H70.9872V21.0297H77.5396C77.8175 21.0297 77.9711 21.2624 77.9418 21.4635L77.5104 26.1286C77.4811 26.3298 77.2654 26.5624 76.9838 26.5624H70.9872V29.3938H79.4227H79.4264Z"
                  fill="#F14616"
                />
                <path
                  d="M99.3617 12.3975C99.6395 12.3975 99.826 12.6301 99.826 12.8983V34.9305C99.826 35.1632 99.6395 35.3958 99.3617 35.3958H94.0159C93.8001 35.3958 93.5222 35.2302 93.365 34.962L87.9863 24.5946V34.9265C87.9863 35.1592 87.7998 35.3919 87.5219 35.3919H82.0518C81.8068 35.3919 81.6204 35.1592 81.6204 34.9265V12.8983C81.6204 12.6341 81.8068 12.3975 82.0518 12.3975H87.3976C87.6755 12.3975 87.9863 12.5631 88.107 12.8312L93.4528 23.1986V12.8983C93.4528 12.6341 93.6685 12.3975 93.8842 12.3975H99.3543H99.3617Z"
                  fill="#F14616"
                />
                <path
                  d="M132.95 12.4016C133.195 12.4016 133.382 12.6343 133.382 12.9024V34.9346C133.382 35.1673 133.195 35.4 132.95 35.4H127.231C126.983 35.4 126.767 35.1673 126.767 34.9346V25.1351L123.644 34.9031C123.553 35.1673 123.151 35.4039 122.873 35.4039H119.472C119.195 35.4039 118.792 35.1712 118.701 34.9031L115.578 25.1351V34.9346C115.578 35.1673 115.363 35.4 115.114 35.4H109.399C109.154 35.4 108.967 35.1673 108.967 34.9346V12.9024C108.967 12.6382 109.154 12.4016 109.399 12.4016H115.86C116.262 12.4016 116.726 12.7013 116.913 13.0681L121.18 25.8015L125.443 13.0681C125.63 12.7013 126.094 12.4016 126.497 12.4016H132.958H132.95Z"
                  fill="#F14616"
                />
                <path
                  d="M141.514 12.4016C141.792 12.4016 141.978 12.6343 141.978 12.9024V34.9346C141.978 35.1673 141.792 35.4 141.514 35.4H136.043C135.828 35.4 135.612 35.1673 135.612 34.9346V12.9024C135.612 12.6382 135.828 12.4016 136.043 12.4016H141.514Z"
                  fill="#F14616"
                />
                <path
                  d="M161.942 12.4014C162.22 12.4014 162.407 12.6341 162.407 12.9022V34.9344C162.407 35.1671 162.22 35.3998 161.942 35.3998H156.597C156.381 35.3998 156.103 35.2341 155.946 34.966L150.567 24.5986V34.9305C150.567 35.1632 150.381 35.3958 150.103 35.3958H144.633C144.388 35.3958 144.201 35.1632 144.201 34.9305V12.8983C144.201 12.6341 144.388 12.3975 144.633 12.3975H149.978C150.256 12.3975 150.567 12.5631 150.688 12.8312L156.034 23.1986V12.8983C156.034 12.6341 156.249 12.3975 156.465 12.3975H161.935L161.942 12.4014Z"
                  fill="#F14616"
                />
                <path
                  d="M170.536 12.4016C170.813 12.4016 171 12.6343 171 12.9024V34.9346C171 35.1673 170.813 35.4 170.536 35.4H165.065C164.85 35.4 164.634 35.1673 164.634 34.9346V12.9024C164.634 12.6382 164.85 12.4016 165.065 12.4016H170.536Z"
                  fill="#F14616"
                />
              </svg>
            </h1>
            <h2 className="text-[4.2rem] font-bold mt-[0.8rem] mb-[3rem] md:text-[6.4rem] md:mt-[1.6rem] md:mb-[4rem]">
              LOGIN
            </h2>

            <form
              onSubmit={handleSubmit}
              className="text-left"
              autoComplete="off"
            >
              <div className="mb-[2.8rem]">
                <label
                  htmlFor="userId"
                  className="block text-[1.4rem] font-medium text-gray-700 mb-[0.8rem]"
                >
                  아이디
                </label>
                <input
                  id="userId"
                  type="text"
                  value={userId}
                  onChange={e => setUserId(e.target.value)}
                  className="w-full px-4  rounded-md border h-[4.8rem] border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  autoComplete="username"
                  required
                />
              </div>
              <div className="mb-[3.2rem]">
                <label
                  htmlFor="password"
                  className="block text-[1.4rem] font-medium text-gray-700 mb-[0.8rem]"
                >
                  비밀번호
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4   h-[4.8rem] rounded-md border  border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  autoComplete="current-password"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loginMutate.isLoading}
                className="w-full bg-[#2A2A2A] text-white h-[6.4rem] font-medium rounded-md hover:bg-gray-700 transition-colors disabled:cursor-not-allowed disabled:opacity-75"
              >
                {loginMutate.isLoading ? (
                  <Spinner size={16} className="inline-flex" />
                ) : (
                  '로그인'
                )}
              </button>
            </form>

            <p className="text-[#B9BEC5] text-[1.2rem] mt-[5.6rem]">
              © GOPIZZA. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const Page = observer(LoginPage) as NextPageWithLayout;

Page.getLayout = (page: any) => page;

export default Page;
