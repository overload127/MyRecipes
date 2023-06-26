import { Route, Navigate } from 'react-router-dom';

function DefaultUrlWrapper(targetUrl: string): JSX.Element {
  debugger;
  return <Route path="/" element={<Navigate to={targetUrl} />} />;
}

export default DefaultUrlWrapper;
