import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import App from './App';
import Main from "./pages/main/Main";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'main',
                element: <Main />,
            },
        ],
    },
]);

export default router;