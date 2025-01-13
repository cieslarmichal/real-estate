import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/home/home';
import Layout from './components/layout/layout';
import { listingPageLoader } from './api/listingPageLoader';
import ListingPage from './routes/listing/listingPage';
import User from './routes/user/user';
import { userPageLoader } from './api/userPageLoader';
import ListPage from './routes/list/listPage';
import AboutPage from './routes/about/aboutPage';

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
          path: '/listings',
          element: <ListPage />,
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
        {
          path: '/about',
          element: <AboutPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
