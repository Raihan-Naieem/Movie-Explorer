import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { Home } from "./Components/Home";
import { AppLayout } from "./Layouts/AppLayout";
import { Shows } from "./Components/Shows";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,

    children: [
      { index: true, Component: Home },
      { path: "shows", Component: Shows },
    ],
  },
]);

const root = document.getElementById("root");

createRoot(root).render(<RouterProvider router={router} />);
