import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
// import { useAppSelector } from 'hooks/redux';
import withSuspense from 'utils/withSuspense';
import RequireAuth from 'utils/RequireAuth/RequireAuth';
import Home from 'pages/Home/Home';

const Recipes = lazy(() => import('pages/Recipes/Recipes'));
const RTApp = lazy(() => import('apps/RTApp/RTApp'));
const LoginGlobal = lazy(() => import('pages/LoginGlobal/LoginGlobal'));
const Page404 = lazy(() => import('pages/Page404/Page404'));

function AppRoutes(): JSX.Element {
  // const { user } = useAppSelector((state) => state.authReducer);
  return (
    <div>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="app/*" element={withSuspense(RTApp)} />
        </Route>

        <Route path="recipes/*" element={withSuspense(Recipes)} />
        <Route path="login" element={withSuspense(LoginGlobal)} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={withSuspense(Page404)} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
