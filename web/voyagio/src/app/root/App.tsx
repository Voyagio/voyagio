import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Main } from '/src/pages/Main/Main';
import { SearchPage } from '/src/pages/Search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/login',
    element: <div>Login page should be here</div>,
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
