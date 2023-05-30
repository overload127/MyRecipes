import { useEffect, useState } from 'react';
import { ConfigProvider, theme, Layout, Card, Button } from 'antd';
import { ToastContainer, Slide } from 'react-toastify';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { checkAuth } from 'store/reducers/ActionCreators';

import LayoutAreaExtratop from 'components/LayoutAreaExtratop/LayoutAreaExtratop';
import MySettingDrawer, { TypeItemColorList, colorList } from 'components/MySettingDrawer/MySettingDrawer';
import AppRoutes from './AppRoutes';
// import { ThemeColor } from 'ThemeColor';

// import style from './MainApp.module.scss';

const { defaultAlgorithm, darkAlgorithm, compactAlgorithm } = theme;

const { Content, Footer } = Layout;

function App(): JSX.Element {
  const { isFirstAuth } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isCompact, setIsCompact] = useState<boolean>(false);
  const [colorPrimary, setColorPrimary] = useState<TypeItemColorList>('techBlue');

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isFirstAuth) {
    return <div>Загрузка приложения ...</div>;
  }

  const currentAlgo = [isDarkMode ? darkAlgorithm : defaultAlgorithm];
  if (isCompact) {
    currentAlgo.push(compactAlgorithm);
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colorList[colorPrimary],
        },
        algorithm: currentAlgo,
      }}
    >
      <Layout>
        <LayoutAreaExtratop />
        {/* <Header /> */}
        <Content>
          <Layout>
            {/* <ProgressBar /> */}
            {/* <SwitchBreadcrumb /> */}
            <span>Темная тема</span>
            <Card style={{ width: 'max-content' }}>
              <Button>Change Theme to {isDarkMode ? 'Light' : 'Dark'}</Button>
            </Card>
            <AppRoutes />
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2023</Footer>
      </Layout>
      <MySettingDrawer
        isDarkMode={isDarkMode}
        isCompact={isCompact}
        colorPrimary={colorPrimary}
        setIsDarkMode={setIsDarkMode}
        setIsCompact={setIsCompact}
        setColorPrimary={setColorPrimary}
      />
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
    </ConfigProvider>
  );
}

export default App;
