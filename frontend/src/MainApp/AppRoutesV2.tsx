import { Routes, Route } from 'react-router-dom';
import RequireAuth from 'utils/RequireAuth/RequireAuth';
import UseUrlConst, { PermissionType, UrlConstType } from 'settings/urlConst';
import Page404 from 'pages/Page404/Page404';

interface IPropsCreateRoutes {
  urlTree: UrlConstType;
  urlPrefix: string;
}

function CreateRoutesFromTree({ urlTree, urlPrefix = '' }: IPropsCreateRoutes): JSX.Element {
  console.log(urlPrefix);
  const routesPublic: JSX.Element[] = [];
  const routesPrivate: JSX.Element[] = [];

  Object.keys(urlTree).forEach((key) => {
    const currentUrl = `${urlPrefix}${urlTree[key].url}`;
    if (urlTree[key].component) {
      const Component: () => JSX.Element = urlTree[key].component as () => JSX.Element;
      switch (urlTree[key].permission) {
        case PermissionType.PUBLIC:
        case PermissionType.GUEST:
          routesPublic.push(<Route path={currentUrl} element={<Component />} />);
          break;
        case PermissionType.PRIVATE: {
          debugger;
          routesPrivate.push(<Route path={currentUrl} element={<Component />} />);
          break;
        }
        default: {
          console.error('Unrecognized access type');
          break;
        }
      }
    }

    // if (urlTree[key].menu) {
    //   const subRoutes = createRoutesFromTree({
    //     urlTree: urlTree[key].menu as UrlConstType,
    //     urlPrefix: urlPrefix + urlTree[key].url,
    //   });
    //   if (subRoutes) routesPublic.push(subRoutes);
    // }
  });

  if (routesPublic.length === 0 && routesPrivate.length === 0) {
    console.log('1111');
    return <></>;
  }
  return (
    <>
      {routesPublic}
      {routesPrivate.length && <Route element={<RequireAuth />}>{routesPrivate}</Route>}
    </>
  );
}

function AppRouteContent(): JSX.Element {
  const urlConst = UseUrlConst();

  const appRoutes = CreateRoutesFromTree({ urlTree: urlConst, urlPrefix: '' });

  return (
    <Routes>
      {appRoutes}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default AppRouteContent;
