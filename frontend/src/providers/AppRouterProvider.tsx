import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "@/pages/error-page";
import AppRouters from "@/routes/AppRoutes";

export function AppRoutesProvider() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <AppRouters />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
