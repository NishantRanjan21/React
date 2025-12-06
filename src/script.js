import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";/**We use Router in order to make Aboutus and contact us page*/
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { lazy, Suspense } from "react";
//dynamic Bundling using lazy loading
const Cart = lazy(() => import("./components/Cart"));

const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </Provider>
  )
};

const appRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Body />,
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "/contact",
          element: <Contact />
        },
        {
          path: "/restaurant/:resid",
          element: <RestaurantMenu />
        },
        {
          path: "/Cart",
          element: <Suspense><Cart/></Suspense>
        }
      ],
      errorElement: <Error />,
    },

  ]
)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);


