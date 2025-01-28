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
import Login from './routes/login/login';
import Logout from './routes/logout/logout';
import PrivateRoute from './auth/privateRoute';
import AddListingPage from './routes/addListing/addListing';
import AdminLayout from './admin/components/adminLayout/adminLayout';
import AdminRoute from './auth/adminRoute';
import AdminUsersList from './admin/routes/adminUsersList/adminUsersList';

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
          path: '/listings/add',
          element: (
            <PrivateRoute>
              <AddListingPage />
            </PrivateRoute>
          ),
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
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/logout',
          element: (
            <PrivateRoute>
              <Logout />
            </PrivateRoute>
          ),
        },
        {
          path: '/about',
          element: <AboutPage />,
        },
      ],
    },
    {
      path: '/',
      element: <AdminLayout />,
      children: [
        {
          path: '/admin/users',
          element: (
            <AdminRoute>
              <AdminUsersList />
            </AdminRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
