import { useMemo, useContext, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, theme, Space, Button, Typography } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useAppSelector } from 'hooks/redux';
import { ThemeContext } from 'context/Theme';
import UseUrlConst, { PermissionType, UrlConstType } from 'settings/urlConst';
import { headerHeight } from 'settings/valuesConst';
import style from './Sidebar.module.scss';

const { Header, Sider } = Layout;
const { Title } = Typography;
type MenuItem = Required<MenuProps>['items'][number];

interface IPropsRenderMenu {
  urlTree: UrlConstType;
  isAuth: boolean;
  urlPrefix: string;
}

function createItemFromTree({ urlTree, isAuth, urlPrefix = '' }: IPropsRenderMenu): MenuItem[] {
  if (!urlTree) {
    return [];
  }

  const items: MenuItem[] = [];

  Object.keys(urlTree).forEach((key) => {
    if (
      urlTree[key].useInSidebar &&
      ((isAuth &&
        (urlTree[key].permission === PermissionType.PUBLIC || urlTree[key].permission === PermissionType.PRIVATE)) ||
        (!isAuth &&
          (urlTree[key].permission === PermissionType.PUBLIC || urlTree[key].permission === PermissionType.GUEST)))
    ) {
      if (urlTree[key].menu !== null) {
        const currentItem: MenuItem = {
          key: urlPrefix + urlTree[key].url,
          icon: urlTree[key].icon,
          children: createItemFromTree({
            urlTree: urlTree[key].menu as UrlConstType,
            isAuth,
            urlPrefix: urlPrefix + urlTree[key].url,
          }),
          label: urlTree[key].title,
        };
        items.push(currentItem);
      } else {
        const currentItem: MenuItem = {
          key: urlPrefix + urlTree[key].url,
          icon: urlTree[key].icon,
          label: urlTree[key].title,
        };
        items.push(currentItem);
      }
    }
  });

  return items;
}

/*
 * Рисует сайдбар с кнопками из urlConst
 */
function Sidebar() {
  const { isAnonym } = useAppSelector((state) => state.authReducer.user);
  const [collapsed, setCollapsed] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const urlConst = UseUrlConst();
  const {
    token: { colorBgContainer, colorPrimary, controlHeight, boxShadow },
  } = theme.useToken();
  const items = useMemo(
    () => createItemFromTree({ urlTree: urlConst, isAuth: !isAnonym, urlPrefix: '' }),
    [isAnonym, urlConst],
  );

  const handleClick = ({ key }: { key: string }) => {
    if (location.pathname !== key) {
      navigate(key);
    }
  };
  return (
    <Sider
      className={style.container}
      style={{ background: colorBgContainer, boxShadow }}
      collapsible
      collapsed={collapsed}
      trigger={
        <Space className={style.trigger} style={{ background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: colorPrimary,
              width: controlHeight * 1.5,
              height: controlHeight * 1.5,
            }}
          />
        </Space>
      }
    >
      <Header
        style={{
          background: colorBgContainer,
          maxHeight: controlHeight * headerHeight,
          height: controlHeight * headerHeight,
          padding: controlHeight * 0.15,
        }}
        className={style.topLeftSpace}
      >
        <Title level={5} className={style.logo}>
          <NavLink to="/" className={style.content}>
            <img src="/logo.png" alt="Несколько ромбов" />
            {!collapsed && (
              <p>
                My<span>Recipes</span>
              </p>
            )}
          </NavLink>
        </Title>
      </Header>
      <Menu
        theme={isDarkMode ? 'dark' : 'light'}
        mode="inline"
        defaultSelectedKeys={['/']}
        selectedKeys={[location.pathname]}
        items={items}
        onClick={handleClick}
      />
    </Sider>
  );
}

export default Sidebar;
