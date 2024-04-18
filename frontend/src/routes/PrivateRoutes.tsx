import { ReactNode } from "react";
import App from "@/pages";
import Table from "@/pages/table";
import Create from "@/pages/create";

interface IProps {
  path: string;
  element: ReactNode;
}

const privateRoutes: IProps[] = [
  {
    path: "/table",
    element: <Table />,
  },
  {
    path: "/create",
    element: <Create />,
  },
];

export default privateRoutes;
