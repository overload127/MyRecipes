import { Route, Navigate } from 'react-router-dom';

function LKWrapper(targetUrl: string): JSX.Element {
  debugger;
  return <Route path="/" element={<Navigate to={targetUrl} />} />;
}

export default LKWrapper;
