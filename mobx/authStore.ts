// stores/authStore.ts
import { makeAutoObservable } from 'mobx';
import Router from 'next/router';

interface UserInfo {
  goAuth: string;
  name: string;
  type: number;
}

const AUTH_STORAGE_KEY = 'authData';

const createAuthStore = () => {
  const store = makeAutoObservable({
    userInfo: null as UserInfo | null,
    isAuthenticated: false,

    setUserInfo(info: UserInfo) {
      store.userInfo = info;
      store.isAuthenticated = !!info?.goAuth;
      store.saveToLocalStorage();
    },

    logout() {
      store.userInfo = null;
      store.isAuthenticated = false;
      localStorage.removeItem(AUTH_STORAGE_KEY);
      Router.push('/login'); // 로그아웃 시 로그인 페이지로 리다이렉트
    },

    setAuthFromResponse(response: {
      'go-auth': string;
      name: string;
      type: number;
    }) {
      store.setUserInfo({
        goAuth: response['go-auth'],
        name: response.name,
        type: response.type,
      });
    },

    saveToLocalStorage() {
      if (store.userInfo) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(store.userInfo));
      }
    },

    loadFromLocalStorage() {
      const storedData = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData) as UserInfo;
          if (!parsedData || !parsedData.goAuth) {
            store.logout();
          } else {
            store.setUserInfo(parsedData);
          }
        } catch (error) {
          console.error('Failed to parse auth data from localStorage:', error);
          store.logout();
        }
      }
    },

    checkAuth() {
      if (!store.isAuthenticated) {
        Router.push('/login');
      }
    },

    get userTypeLabel() {
      if (!store.userInfo) return 'Unknown';
      switch (store.userInfo.type) {
        case 1:
          return '고피자';
        case 2:
          return 'GS';
        default:
          return 'None';
      }
    },
  });

  return store;
};

export const authStore = createAuthStore();

// 앱 시작 시 localStorage에서 데이터 로드
if (typeof window !== 'undefined') {
  authStore.loadFromLocalStorage();
}
