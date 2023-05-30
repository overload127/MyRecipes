import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';
import withSuspense from 'utils/withSuspense';
import RequireAuth from 'utils/RequireAuth/RequireAuth';

const CMS = lazy(() => import('apps/CMS/CMS'));
const RTApp = lazy(() => import('apps/RTApp/RTApp'));
const LoginGlobal = lazy(() => import('pages/LoginGlobal/LoginGlobal'));
const Page404 = lazy(() => import('pages/Page404/Page404'));

function AppRoutes(): JSX.Element {
  const { user } = useAppSelector((state) => state.authReducer);
  return (
    <div>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="app/*" element={withSuspense(RTApp)} />
        </Route>

        <Route path="blog/*" element={withSuspense(CMS)} />
        <Route path="login" element={withSuspense(LoginGlobal)} />
        {user.isAnonym ? (
          <Route path="/" element={<Navigate to="/blog" replace />} />
        ) : (
          <Route path="/" element={<Navigate to="/app" replace />} />
        )}
        <Route path="*" element={withSuspense(Page404)} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
