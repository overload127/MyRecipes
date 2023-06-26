import { useMemo } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { useAppSelector } from 'hooks/redux';
// import { QuestionCircleOutlined } from '@ant-design/icons';

import UseUrlConst, { PermissionType, UrlConstType } from 'settings/urlConst';
import style from './CustomHeaderV1.module.scss';

const { SubMenu } = Menu;
const { Header } = Layout;

interface IPropsRenderMenu {
  urlTree: UrlConstType;
  isAuth: boolean;
  urlPrefix: string;
}

function renderMenu({ urlTree, isAuth, urlPrefix = '' }: IPropsRenderMenu): JSX.Element[] {
  if (!urlTree) {
    return [];
  }

  const renderTree: JSX.Element[] = [];

  Object.keys(urlTree).forEach((key) => {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    let currentElement = <></>;
    if (urlTree[key].menu !== null) {
      const localMenuTree = renderMenu({
        urlTree: urlTree[key].menu as UrlConstType,
        isAuth,
        urlPrefix: urlPrefix + urlTree[key].url,
      });

      if (urlTree[key].icon !== null) {
        currentElement = (
          <SubMenu key={urlPrefix + urlTree[key].url} icon={urlTree[key].icon} title={urlTree[key].title}>
            {localMenuTree}
          </SubMenu>
        );
      } else {
        currentElement = (
          <SubMenu key={urlPrefix + urlTree[key].url} title={urlTree[key].title}>
            {localMenuTree}
          </SubMenu>
        );
      }
    } else {
      currentElement = (
        <Menu.Item key={urlPrefix + urlTree[key].url}>
          <Link to={urlPrefix + urlTree[key].url}>{urlTree[key].title}</Link>
        </Menu.Item>
      );
    }

    if (isAuth) {
      if (urlTree[key].permission === PermissionType.PUBLIC || urlTree[key].permission === PermissionType.PRIVATE) {
        renderTree.push(currentElement);
      }
    } else if (urlTree[key].permission === PermissionType.PUBLIC || urlTree[key].permission === PermissionType.GUEST) {
      renderTree.push(currentElement);
    }
  });

  return renderTree;
}

/*
 * Рисует header с кнопками из urlConst
 */
function CustomHeaderV1() {
  const { isAnonym } = useAppSelector((state) => state.authReducer.user);
  const location = useLocation();
  const urlConst = UseUrlConst();

  const currentMenu = useMemo(() => renderMenu({ urlTree: urlConst, isAuth: !isAnonym, urlPrefix: '' }), [isAnonym]);

  return (
    <Header className="header">
      <NavLink className={style.logo} to="/">
        My<span>Recipes</span>
      </NavLink>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']} selectedKeys={[location.pathname]}>
        {currentMenu}
      </Menu>
    </Header>
  );
}

export default CustomHeaderV1;
