import type { ReactNode } from "react";
import Login from "@/pages/auth/login";

interface IRoute {
  path: string;
  element: ReactNode;
}

const publicRoutes: IRoute[] = [
  {
    path: "/",
    element: <Login />,
  },
];

export default publicRoutes;
