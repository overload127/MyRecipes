import { Routes, Route, Navigate } from 'react-router-dom';
// import { useAppSelector } from 'hooks/redux';
import LKProfile from 'pages/LKProfile/LKProfile';
import LKSettings from 'pages/LKSettings/LKSettings';
import Page404 from 'pages/Page404/Page404';

function AccountRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="center/" element={<LKProfile />} />
      <Route path="settings/" element={<LKSettings />} />
      <Route path="/" element={<Navigate to="center/" replace />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default AccountRoutes;
