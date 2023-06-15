import { useNavigate } from 'react-router-dom';
import { theme, Layout } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { headerHeight } from 'settings/valuesConst';
import ButtonSearch from './ButtonSearch/ButtonSearch';

import style from './CustomHeaderV2.module.scss';

const { Header } = Layout;

function CustomHeaderV2() {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, controlHeight },
  } = theme.useToken();
  return (
    <Header
      className={style.container}
      style={{
        background: colorBgContainer,
        maxHeight: controlHeight * headerHeight,
        height: controlHeight * headerHeight,
      }}
    >
      <ButtonSearch />
      <button type="button" className={style.button} onClick={() => navigate('/login')}>
        <LoginOutlined className={style.loginIcon} />
        login
      </button>
    </Header>
  );
}

export default CustomHeaderV2;
