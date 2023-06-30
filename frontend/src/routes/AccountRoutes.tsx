import { Routes, Route, Navigate } from 'react-router-dom';
import store from 'store/store';
import { getDataProfile } from 'store/reducers/user/ActionCreators';
import LKProfile from 'pages/LKProfile/LKProfile';
import LKSettings from 'pages/LKSettings/LKSettings';
import Page404 from 'pages/Page404/Page404';

store.dispatch(getDataProfile());

function AccountRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="center/" element={<LKProfile />} />
      <Route path="settings/*" element={<LKSettings />} />
      <Route path="/" element={<Navigate to="center/" replace />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default AccountRoutes;
