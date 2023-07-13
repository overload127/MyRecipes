import { theme, Layout } from 'antd';
import { headerHeight } from 'settings/valuesConst';
import ButtonSearch from './ButtonSearch/ButtonSearch';
import ButtonAccount from './ButtonAccount/ButtonAccount';

import style from './CustomHeaderV2.module.scss';

const { useToken } = theme;
const { Header } = Layout;

function CustomHeaderV2() {
  const {
    token: { colorBgContainer, controlHeight },
  } = useToken();
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
      <ButtonAccount />
    </Header>
  );
}

export default CustomHeaderV2;
