import { theme } from 'antd';
import Icon, { HomeOutlined, UserOutlined } from '@ant-design/icons';
import Kebab from './icon/kebab';

export enum PermissionType {
  PUBLIC = 'publicItem',
  GUEST = 'guestItem',
  PRIVATE = 'privateItem',
}

export type UrlConstType = {
  [key: string]: {
    url: string;
    title: string;
    permission: string;
    icon: JSX.Element | null;
    useInSidebar: boolean;
    menu: UrlConstType | null;
  };
};

const { useToken } = theme;

function UseUrlConst(): UrlConstType {
  const { token } = useToken();
  return {
    PAGE_HOME: {
      url: '/',
      title: 'Главная',
      permission: PermissionType.PUBLIC,
      icon: <HomeOutlined style={{ fontSize: token.fontSize * 1.42 }} />,
      useInSidebar: true,
      menu: null,
    },
    PAGE_SHAWARMA: {
      url: '/shawarma',
      title: 'Шаверма',
      permission: PermissionType.PUBLIC,
      icon: <Icon component={Kebab} style={{ fontSize: token.fontSize * 1.42 }} />,
      useInSidebar: true,
      menu: null,
    },
    WRAPPER_LK: {
      url: '/account',
      title: 'Аккаунт',
      permission: PermissionType.PRIVATE,
      icon: <UserOutlined style={{ fontSize: token.fontSize * 1.42 }} />,
      useInSidebar: true,
      menu: {
        PAGE_LK_PROFILE: {
          url: '/center',
          title: 'Профиль',
          permission: PermissionType.PRIVATE,
          icon: null,
          useInSidebar: true,
          menu: null,
        },
        PAGE_LK_SETTINGS: {
          url: '/settings',
          title: 'Настройки',
          permission: PermissionType.PRIVATE,
          icon: null,
          useInSidebar: true,
          menu: null,
        },
      },
    },
    PAGE_LOGIN: {
      url: '/login',
      title: 'Вход',
      permission: PermissionType.GUEST,
      icon: null,
      useInSidebar: false,
      menu: null,
    },
    BUTTON_LOGOUT: {
      url: '',
      title: 'Выход',
      permission: PermissionType.PRIVATE,
      icon: null,
      useInSidebar: false,
      menu: null,
    },
  };
}

export default UseUrlConst;
