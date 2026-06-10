import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ServicePage } from "./pages/ServicePage";
import { CityPage } from "./pages/CityPage";
import { Contact } from "./pages/Contact";
import { EpavePage } from "./pages/EpavePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },

      { path: "services/:slug", Component: ServicePage },
      { path: "ferrailleur-:city", Component: CityPage },

      { path: "enlevement-epaves", Component: EpavePage },
      { path: "enlevement-epaves/:ville", Component: EpavePage },

      { path: "contact", Component: Contact },
    ],
  },
]);