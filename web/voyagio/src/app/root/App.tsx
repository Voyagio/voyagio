import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Main } from '/src/pages/Main/Main';
import { SearchPage } from '/src/pages/Search';
import { LoginPage } from '/src/pages/LoginPage';

import '@fontsource/lato';
import '@fontsource/lato/400.css';
import '@fontsource/lato/400-italic.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/search',
    element: <SearchPage />,
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
