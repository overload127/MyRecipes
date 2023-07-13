import { Routes, Route } from 'react-router-dom';
import LoginGlobal from 'pages/LoginGlobal/LoginGlobal';
import ContentWrapper from 'components/ContentWrapper/ContentWrapper';

function GlobalRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="login" element={<LoginGlobal />} />

      <Route path="*" element={<ContentWrapper />} />
    </Routes>
  );
}

export default GlobalRoutes;
