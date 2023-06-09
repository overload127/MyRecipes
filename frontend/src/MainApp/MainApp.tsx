import { useEffect } from 'react';
import { theme, Layout, Card, Button } from 'antd';
import { SearchOutlined, LoginOutlined } from '@ant-design/icons';

import { ToastContainer, Slide } from 'react-toastify';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { checkAuth } from 'store/reducers/auth/ActionCreators';

import LayoutAreaExtraTop from 'components/LayoutAreaExtraTop/LayoutAreaExtraTop';
import CustomSettingDrawer from 'components/CustomSettingDrawer/CustomSettingDrawer';
import Sidebar from 'components/Sidebar/Sidebar';
import AppRoutes from './AppRoutes';

import style from './MainApp.module.scss';

const { Header, Content, Footer } = Layout;

function App(): JSX.Element {
  const { isFirstAuth } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const {
    token: { colorBgContainer, controlHeight },
  } = theme.useToken();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isFirstAuth) {
    return <div>Загрузка приложения ...</div>;
  }

  return (
    <>
      <Layout className={style.layout}>
        <LayoutAreaExtraTop />
        <Layout>
          <Sidebar />
          <Layout>
            <Content>
              <Header
                className={style.header}
                style={{
                  background: colorBgContainer,
                  maxHeight: controlHeight * 2,
                  height: controlHeight * 2,
                }}
              >
                <button type="button">
                  <SearchOutlined />
                </button>
                <button type="button">
                  <LoginOutlined />
                  login
                </button>
              </Header>
              <Layout>
                {/* <ProgressBar /> */}
                {/* <SwitchBreadcrumb /> */}
                <Card style={{ width: 'max-content' }}>
                  <Button>Change Theme to Dark</Button>
                </Card>
                <AppRoutes />
              </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2023</Footer>
          </Layout>
        </Layout>
      </Layout>
      <CustomSettingDrawer />
      <ToastContainer
        position="top-right"
        transition={Slide}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
