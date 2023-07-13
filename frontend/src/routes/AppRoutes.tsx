import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import withSuspense from 'utils/withSuspense';
import RequireAuth from 'utils/RequireAuth/RequireAuth';
import Home from 'pages/Home/Home';
import Shawarma from 'pages/Shawarma/Shawarma';
import Page404 from 'pages/Page404/Page404';

const AccountRoutes = lazy(() => import('routes/AccountRoutes'));
const Recipes = lazy(() => import('pages/Recipes/Recipes'));
const Recipe = lazy(() => import('components/Recipe/Recipe'));

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path="shawarma/" element={<Shawarma />} />
        <Route path="account/*" element={withSuspense(AccountRoutes)} />
      </Route>

      <Route path="recipe/*" element={withSuspense(Recipe)} />
      <Route path="recipes/*" element={withSuspense(Recipes)} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default AppRoutes;
