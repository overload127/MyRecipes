import { useEffect } from 'react';
import { Layout } from 'antd';

import { ToastContainer, Slide } from 'react-toastify';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { checkAuth } from 'store/reducers/auth/ActionCreators';

import LayoutAreaExtraTop from 'components/LayoutAreaExtraTop/LayoutAreaExtraTop';
import CustomSettingDrawer from 'components/CustomSettingDrawer/CustomSettingDrawer';
import Sidebar from 'components/Sidebar/Sidebar';
import CustomHeaderV2 from 'components/CustomHeaderV2/CustomHeaderV2';
import AppRoutes from './AppRoutes';

import style from './MainApp.module.scss';

const { Content, Footer } = Layout;

function App(): JSX.Element {
  const { isFirstAuth } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

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
            <Content className={style.test}>
              <CustomHeaderV2 />
              <Layout className={style.content}>
                <AppRoutes />
              </Layout>
            </Content>
            <Footer className={style.footer}>©2023</Footer>
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
