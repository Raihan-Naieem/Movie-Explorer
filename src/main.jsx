import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { Home } from "./Components/Home";
import { About } from "./Components/About";
import { AppLayout } from "./Layouts/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,

    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
    ],
  },
]);

const root = document.getElementById("root");

createRoot(root).render(<RouterProvider router={router} />);
