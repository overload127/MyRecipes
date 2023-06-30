import { Layout } from 'antd';

import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppSelector } from 'hooks/redux';
import LayoutAreaExtraTop from 'components/LayoutAreaExtraTop/LayoutAreaExtraTop';
import CustomSettingDrawer from 'components/CustomSettingDrawer/CustomSettingDrawer';
import Sidebar from 'components/Sidebar/Sidebar';
import CustomHeaderV2 from 'components/CustomHeaderV2/CustomHeaderV2';
import AppRoutes from '../routes/AppRoutes';

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
            <CustomHeaderV2 />
            <Content className={style.container}>
              <div className={style.content}>
                <AppRoutes />
              </div>
              <Footer className={style.footer}>©2023</Footer>
            </Content>
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
