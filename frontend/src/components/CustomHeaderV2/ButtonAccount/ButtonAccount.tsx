import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { LoginOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { AppDispatch } from 'store/store';
import { logoutAuth } from 'store/reducers/auth/ActionCreators';

import style from './ButtonAccount.module.scss';

const getItems = (dispatch: AppDispatch): MenuProps['items'] => [
  {
    key: '1',
    label: (
      <Link to="/account/center">
        <UserOutlined /> Профиль
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link to="/account/settings">
        <SettingOutlined /> Настройки профиля
      </Link>
    ),
  },
  {
    key: '3',
    label: (
      <span onClick={() => dispatch(logoutAuth())} onKeyUp={() => dispatch(logoutAuth())} role="button" tabIndex={0}>
        <LogoutOutlined /> Выход
      </span>
    ),
  },
];

function CustomHeaderV2() {
  const { user } = useAppSelector((state) => state.authReducer);
  const { firstName } = useAppSelector((state) => state.userReducer.profile);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  if (user.isAnonym)
    return (
      <button type="button" className={style.container} onClick={() => navigate('/login')}>
        <LoginOutlined className={style.loginIcon} />
        <span>login</span>
      </button>
    );

  const items = getItems(dispatch);
  return (
    <Dropdown menu={{ items }} placement="bottomLeft" className={style.container}>
      <Button>
        <span className={style.wrapperImage}>
          <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="avatar" />
        </span>
        <span>{firstName || user.name || 'безымянный'}</span>
      </Button>
    </Dropdown>
  );
}

export default CustomHeaderV2;
