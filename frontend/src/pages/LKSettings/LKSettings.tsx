import { useContext, useState } from 'react';
import { Layout, Col, Row, theme, Menu, Typography, Grid } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { ThemeContext } from 'context/Theme';
import BaseTab from './BaseTab/BaseTab';
import Security from './Security/Security';
import SocialNetworkForm from './SocialNetworkForm/SocialNetworkForm';

import style from './LKSettings.module.scss';

type UrlConstAccountType = {
  [key: string]: {
    url: string;
    label: string;
    component: () => JSX.Element;
  };
};

const urlConstTree: UrlConstAccountType = {
  BASE_TAB: {
    url: 'BASE_TAB',
    label: 'Базовые настройки',
    component: BaseTab,
  },
  SECURITY_TAB: {
    url: 'SECURITY_TAB',
    label: 'Настройки безопасности',
    component: Security,
  },
  SOCIAL_NETWORK: {
    url: 'SOCIAL_NETWORK',
    label: 'Привязка соцсетей',
    component: SocialNetworkForm,
  },
};

type TypeUrlConstTree = keyof typeof urlConstTree & string;

const menuItems: MenuProps['items'] = Object.keys(urlConstTree).map((item) => ({
  key: urlConstTree[item].url,
  label: urlConstTree[item].label,
}));

const { Text } = Typography;
const { useBreakpoint } = Grid;

function LKSettings(): JSX.Element {
  const [currentTab, setCurrentTab] = useState<TypeUrlConstTree>('BASE_TAB');
  const { isDarkMode } = useContext(ThemeContext);
  const {
    token: { colorBgContainer, colorBorder },
  } = theme.useToken();
  const handleClick = ({ key }: { key: string }) => {
    if (currentTab !== key) {
      setCurrentTab(key as TypeUrlConstTree);
    }
  };
  const currentNameItem = Object.keys(urlConstTree).find((item) => item === currentTab) as TypeUrlConstTree;
  const CurrenBody = urlConstTree[currentNameItem].component;
  const screens = useBreakpoint();
  return (
    <Layout className={style.wrap} style={{ background: colorBgContainer }}>
      <Row className={style.container}>
        <Col xs={24} md={6} style={{ borderRightColor: colorBorder }}>
          <Menu
            theme={isDarkMode ? 'dark' : 'light'}
            mode={screens.md ? 'inline' : 'horizontal'}
            defaultSelectedKeys={['BASE_TAB']}
            selectedKeys={[currentTab]}
            items={menuItems}
            onClick={handleClick}
          />
        </Col>

        <Col xs={24} md={18}>
          <div className={style.content}>
            <Text className={style.title}>{urlConstTree[currentNameItem].label}</Text>
            <CurrenBody />
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default LKSettings;
