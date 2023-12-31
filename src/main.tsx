import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-datepicker/dist/react-datepicker.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router.js";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* react query */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
