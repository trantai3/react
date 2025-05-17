import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Register = lazy(() => import("../pages/auth/register"));
const Login = lazy(() => import("../pages/auth/login"));
const ForgotPassword = lazy(() => import("../pages/auth/forgotPass"));
const Welcome = lazy(() => import("../pages/welcome"));
const router = createBrowserRouter([
  {
    path: "register",
    element: (
      <Suspense>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "login",
    element: (
      <Suspense>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "forgot-password",
    element: (
      <Suspense>
        <ForgotPassword />
      </Suspense>
    ),
  },
  {
    path: "welcome",
    element: (
      <Suspense>
        <Welcome />
      </Suspense>
    ),
  },
]);

const Router = () => {
  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Router;
