import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const Register = lazy(() => import("../pages/auth/register"));
const Login = lazy(() => import("../pages/auth/login"));
const ForgotPassword = lazy(() => import("../pages/auth/forgotPass"));
const Welcome = lazy(() => import("../pages/welcome"));
const LayoutUser = lazy(() => import("../components/layouts/index"));
const AllLesson = lazy(() => import("../pages/all-lesson"));
const Lesson1 = lazy(() => import("../pages/lesson1"));
const Lesson2 = lazy(() => import("../pages/lesson2"));
const Lesson3 = lazy(() => import("../pages/lesson3"));
const Lesson4 = lazy(() => import("../pages/lesson4"));
const Lesson5 = lazy(() => import("../pages/lesson5"));
const Lesson7 = lazy(() => import("../pages/lesson7"));
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
        <ProtectedRoute>
          <Welcome />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    element: (
      <ProtectedRoute>
        <LayoutUser />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/lesson",
        element: (
          <Suspense>
            <AllLesson />
          </Suspense>
        ),
      },
      {
        path: "/lesson/1",
        element: (
          <Suspense>
            <Lesson1 />
          </Suspense>
        ),
      },
      {
        path: "/lesson/2",
        element: (
          <Suspense>
            <Lesson2 />
          </Suspense>
        ),
      },
      {
        path: "/lesson/3",
        element: (
          <Suspense>
            <Lesson3 />
          </Suspense>
        ),
      },
      {
        path: "/lesson/4",
        element: (
          <Suspense>
            <Lesson4 />
          </Suspense>
        ),
      },
      {
        path: "/lesson/5",
        element: (
          <Suspense>
            <Lesson5 />
          </Suspense>
        ),
      },
      {
        path: "/lesson/7",
        element: (
          <Suspense>
            <Lesson7 />
          </Suspense>
        ),
      },
    ],
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
