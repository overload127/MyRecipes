import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
// import { useAppSelector } from 'hooks/redux';
import withSuspense from 'utils/withSuspense';
import RequireAuth from 'utils/RequireAuth/RequireAuth';
import Home from 'pages/Home/Home';
import LoginGlobal from 'pages/LoginGlobal/LoginGlobal';
import Shawarma from 'pages/Shawarma/Shawarma';
import Page404 from 'pages/Page404/Page404';

const AccountRoutes = lazy(() => import('routes/AccountRoutes'));
const Recipes = lazy(() => import('pages/Recipes/Recipes'));

function AppRoutes(): JSX.Element {
  // const { user } = useAppSelector((state) => state.authReducer);
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path="shawarma/" element={<Shawarma />} />
        <Route path="account/*" element={withSuspense(AccountRoutes)} />
      </Route>

      <Route path="recipes/*" element={withSuspense(Recipes)} />
      <Route path="login" element={<LoginGlobal />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default AppRoutes;
