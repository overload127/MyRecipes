import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
// import { useAppSelector } from 'hooks/redux';
import withSuspense from 'utils/withSuspense';
import RequireAuth from 'utils/RequireAuth/RequireAuth';
import Home from 'pages/Home/Home';
import LoginGlobal from 'pages/LoginGlobal/LoginGlobal';

const Recipes = lazy(() => import('pages/Recipes/Recipes'));
const RTApp = lazy(() => import('apps/RTApp/RTApp'));
const Page404 = lazy(() => import('pages/Page404/Page404'));

function AppRoutes(): JSX.Element {
  // const { user } = useAppSelector((state) => state.authReducer);
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path="app/*" element={withSuspense(RTApp)} />
      </Route>

      <Route path="recipes/*" element={withSuspense(Recipes)} />
      <Route path="login" element={<LoginGlobal />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={withSuspense(Page404)} />
    </Routes>
  );
}

export default AppRoutes;
