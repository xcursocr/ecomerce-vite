import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home, Login, ForgotPassword, SignUp, AdminPanel, Allusers, AllProducts, Dashboard, AdminUser, UserPefil, CategoryProduct, ProductDetails, Cart, SearchProduct } from "../pages";

const router = createBrowserRouter([
  /*
   PUBLIC
  */
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "product-category",
        element: <CategoryProduct />
      },
      {
        path: "product/:id",
        element: <ProductDetails />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: "search",
        element: <SearchProduct />
      },

      /*
      USER AUTH
      */

      {
        path: "admin-user",
        element: <AdminUser />,
        children: [
          {
            path: "perfil",
            element: <UserPefil />
          },

        ]
      },

      /*
        ADMIN AUTH
      */
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "all-users",
            element: <Allusers />
          },
          {
            path: "all-products",
            element: <AllProducts />
          }
        ]
      },
    ],
  },
]);

export default router;
