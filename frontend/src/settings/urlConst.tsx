import { theme } from 'antd';
import Icon, { HomeOutlined } from '@ant-design/icons';
// import Kebab from './icon/kebab-icon.svg';
import Kebab from './icon/kebab';
import PageHome from '../pages/Home/Home';

// import PageWiki from '../pages/Wiki/Wiki';
// import PageWikiTP from '../pages/WikiTechCard/WikiTechCardContainer';
// import PageWikiStation from '../pages/WikiStation/WikiStationContainer';
// import PageWikiUserProfile from '../pages/WikiUserProfile/WikiUserProfileContainer';
// import PageWikiDeviceForWork from '../pages/WikiDeviceForWork/WikiDeviceForWorkContainer';
// import PageWikiOkolotok from '../pages/WikiOkolotok/WikiOkolotokContainer';

// import PageServices from '../pages/Services/Services';
// import PageActionsWorks from '../pages/ActionsWorks/ActionsWorks';
// import PageLK from '../pages/LK/LK';
// import PageAddTP from '../pages/AddTP/AddTP';
// import PageUserStat from '../pages/UserStat/UserStat';
// import PageDisplayTP from '../pages/DisplayTP/DisplayTPContainer';
// import PageDisplayOkolotokTP from '../pages/DisplayOkolotokTP/DisplayOkolotokTPContainer';

// import Priv from '../pages/Private/Private';
// import Pub from '../pages/Public/Public';

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
    button: boolean;
    actionButton: (() => void) | null;
    component: (() => JSX.Element) | null;
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
      button: false,
      actionButton: null,
      component: PageHome,
      icon: <HomeOutlined style={{ fontSize: token.fontSize * 1.42 }} />,
      useInSidebar: true,
      menu: null,
    },
    PAGE_RECIPES: {
      url: '/shawarma',
      title: 'Шаверма',
      permission: PermissionType.PUBLIC,
      button: false,
      actionButton: null,
      component: PageHome,
      icon: <Icon component={Kebab} style={{ fontSize: token.fontSize * 1.42 }} />,
      useInSidebar: true,
      menu: null,
    },
    // PAGE_SERVICES: {
    //   url: '/services',
    //   title: 'Сервисы',
    //   permission: PermissionType.PRIVATE,
    //   exact: true,
    //   component: PageServices,
    //   icon: null,
    //   menu: {
    //     PAGE_TP_WORKS: {
    //       url: '/tp_works',
    //       title: 'Записи ТП',
    //       permission: PermissionType.PRIVATE,
    //       exact: true,
    //       component: PageActionsWorks,
    //       icon: null,
    //       menu: {
    //         PAGE_ADD_TP: {
    //           url: '/add',
    //           title: 'Добавить ТП',
    //           permission: PermissionType.PRIVATE,
    //           exact: true,
    //           component: PageAddTP,
    //           menu: null,
    //         },
    //         DISPLAY_TP: {
    //           url: '/display_request',
    //           title: 'Конструктор запросов',
    //           permission: PermissionType.PRIVATE,
    //           exact: true,
    //           component: PageDisplayTP,
    //           menu: null,
    //         },
    //       },
    //     },
    //     PAGE_WIKI: {
    //       url: '/wiki',
    //       title: 'Wiki',
    //       permission: PermissionType.PRIVATE,
    //       exact: true,
    //       component: PageWiki,
    //       icon: <QuestionCircleOutlined />,
    //       menu: {
    //         PAGE_WIKI_USERPROFILE: {
    //           url: '/profile',
    //           title: 'Сотрудники',
    //           permission: PermissionType.PRIVATE,
    //           exact: true,
    //           component: PageWikiUserProfile,
    //           icon: null,
    //           menu: null,
    //         },
    //         PAGE_WIKI_DEVICE_FOR_WORK: {
    //           url: '/device',
    //           title: 'Инструменты',
    //           permission: PermissionType.PRIVATE,
    //           exact: true,
    //           component: PageWikiDeviceForWork,
    //           icon: null,
    //           menu: null,
    //         },
    //         PAGE_WIKI_OKOLOTOK: {
    //           url: '/okolotok',
    //           title: 'Околотки',
    //           permission: PermissionType.PRIVATE,
    //           exact: true,
    //           component: PageWikiOkolotok,
    //           icon: null,
    //           menu: null,
    //         },
    //         PAGE_WIKI_TP: {
    //           url: '/tp',
    //           title: 'ТП',
    //           permission: PermissionType.PRIVATE,
    //           exact: true,
    //           component: PageWikiTP,
    //           icon: null,
    //           menu: null,
    //         },
    //         PAGE_WIKI_STATION: {
    //           url: '/station',
    //           title: 'Станции',
    //           permission: PermissionType.PRIVATE,
    //           exact: true,
    //           component: PageWikiStation,
    //           icon: null,
    //           menu: null,
    //         },
    //       },
    //     },
    //   },
    //   PAGE_USER_LK: {
    //     url: '/lk',
    //     title: 'Личный кабинет',
    //     permission: PermissionType.PRIVATE,
    //     exact: true,
    //     component: PageLK,
    //     icon: null,
    //     menu: {
    //       PAGE_USER_STAT: {
    //         url: '/stat',
    //         title: 'Статистика',
    //         permission: PermissionType.PRIVATE,
    //         exact: true,
    //         component: PageUserStat,
    //         menu: null,
    //       },
    //       DISPLAY_TP: {
    //         url: '/works',
    //         title: 'Техпроцессы по Вашему околотку',
    //         permission: PermissionType.PRIVATE,
    //         exact: true,
    //         component: PageDisplayOkolotokTP,
    //         menu: null,
    //       },
    //     },
    //   },
    // },

    // PAGE_LOGIN: {
    //   url: '/login',
    //   title: 'Вход',
    //   permission: PermissionType.GUEST,
    //   button: false,
    //   actionButton: null,
    //   component: PageLogin,
    //   icon: null,
    //   useInSidebar: false,
    //   menu: null,
    // },
    BUTTON_LOGOUT: {
      url: '',
      title: 'Выход',
      permission: PermissionType.PRIVATE,
      button: true,
      actionButton: () => {
        console.log('logout');
      },
      component: null,
      icon: null,
      useInSidebar: false,
      menu: null,
    },

    // PAGE_PUBLIC: {
    //   url: '/public',
    //   title: 'Public',
    //   permission: PermissionType.PUBLIC,
    //   exact: true,
    //   component: Pub,
    //   icon: null,
    //   menu: null,
    // },
    // PAGE_PRIVATE: {
    //   url: '/private',
    //   title: 'Private',
    //   permission: PermissionType.PRIVATE,
    //   exact: true,
    //   component: Priv,
    //   icon: null,
    //   menu: null,
    // },
  };
}

export default UseUrlConst;
