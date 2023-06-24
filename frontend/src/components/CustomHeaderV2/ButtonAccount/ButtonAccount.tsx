import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { LoginOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { AppDispatch } from 'store/store';
import { logoutAuth } from 'store/reducers/auth/ActionCreators';

import style from './ButtonAccount.module.scss';

const getItems = (dispatch: AppDispatch): MenuProps['items'] => [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        <UserOutlined /> Профиль
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        <SettingOutlined /> Настройки профиля
      </a>
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
  const { isAnonym } = useAppSelector((state) => state.authReducer.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  if (isAnonym)
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
        <span>Serati Ma</span>
      </Button>
    </Dropdown>
  );
}

export default CustomHeaderV2;
