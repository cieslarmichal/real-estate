import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/home/home'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
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
