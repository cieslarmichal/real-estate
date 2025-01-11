import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/home/home';
import Layout from './components/layout/layout';
import { listingPageLoader } from './api/listingPageLoader';
import ListingPage from './routes/listing/listingPage';
import User from './routes/user/user';
import { userPageLoader } from './api/userPageLoader';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/listings/:id',
          element: <ListingPage />,
          loader: listingPageLoader,
        },
        {
          path: '/profiles/:id',
          element: <User />,
          loader: userPageLoader,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
