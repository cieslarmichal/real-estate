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
import LocationMap from './routes/locationMap/locationMap';
import { cityLoader } from './api/cityLoader';
import Register from './routes/register/register';

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
          path: '/listings/locations/:name',
          element: <LocationMap />,
          loader: cityLoader,
        },
        {
          path: '/profiles/:id',
          element: <User />,
          loader: userPageLoader,
        },
        {
          path: '/login',
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/logout',
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
