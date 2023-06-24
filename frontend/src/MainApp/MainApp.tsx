import { Layout } from 'antd';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppSelector } from 'hooks/redux';
import LayoutAreaExtraTop from 'components/LayoutAreaExtraTop/LayoutAreaExtraTop';
import CustomSettingDrawer from 'components/CustomSettingDrawer/CustomSettingDrawer';
import Sidebar from 'components/Sidebar/Sidebar';
import CustomHeaderV2 from 'components/CustomHeaderV2/CustomHeaderV2';
import AppRoutes from './AppRoutes';

import style from './MainApp.module.scss';

const { Content, Footer } = Layout;

function App(): JSX.Element {
  const { isInitUser } = useAppSelector((state) => state.authReducer);
  if (!isInitUser) {
    return <div>Загрузка приложения ...</div>;
  }
  return (
    <>
      <Layout className={style.mainContainer}>
        <LayoutAreaExtraTop />
        <Layout className={style.wrap}>
          <Sidebar />
          <Layout>
            <Content className={style.container}>
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
