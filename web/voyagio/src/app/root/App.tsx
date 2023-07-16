import { Interests } from '/src/pages/Interests';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Main } from '/src/pages/Main/Main';
import { SearchPage } from '/src/pages/Search';
import { AuthPage } from '/src/pages/AuthPage';

import '@fontsource/lato';
import '@fontsource/lato/400.css';
import '@fontsource/lato/400-italic.css';
import { PersonalAccount } from '/src/pages/PersonalAccount';

export type RouterParams = {
  query: string;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/login',
    element: <AuthPage />,
  },
  {
    path: '/signup',
    element: <AuthPage signup />,
  },
  {
    path: '/search',
    element: <SearchPage />,
  },
  {
    path: '/search/:query',
    element: <SearchPage isWithQuery />,
  },
  {
    path: '/account',
    element: <PersonalAccount />,
  },
  {
    path: '/interests',
    element: <Interests />,
  },
  {
    path: '*',
    element: <div>404</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
