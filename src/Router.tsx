import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import App from "./App";
import Main from "./pages/main/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "main",
        element: <Main />,
      },
    ],
  },
]);

export default router;
