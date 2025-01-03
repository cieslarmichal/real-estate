import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/home/home'
import  Layout from './components/layout/layout';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />
}

export default App
