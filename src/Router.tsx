import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFound from "./layouts/NotFound";
import User from "./pages/user/User";
import Login from "./pages/auth/Login";
import FreeBoard from "./pages/board/freeBoard/FreeBoard";
import Vendor from "./pages/code/vendor/Vendor";
import Inspection from "./pages/code/inspection/Inspection";
import DashBoard from "./pages/dashBoard/DashBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashBoard",
        element: <DashBoard />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "freeBoard",
        element: <FreeBoard />,
      },
      {
        path: "vendor",
        element: <Vendor />,
      },
      {
        path: "inspection",
        element: <Inspection />,
      },
    ],
    errorElement: (
      <NotFound />
    ) /* URL에 맞는 컴포넌트의 위치를 찾지 못할 때 NotFound 컴포넌트를 render 한다 */,
  },
]);

export default router;
