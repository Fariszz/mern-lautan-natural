import { Route, Routes } from "react-router-dom";
import privateRoutes from "./PrivateRoutes";
import publicRoutes from "./PublicRoutes";
import RequireAuth from "./RequireAuth";

function AppRouters() {
  return (
    <Routes>
      {publicRoutes.map(({ path, element }) => (
        <Route element={element} key={path} path={path} />
      ))}
      <Route element={<RequireAuth />}>
        {privateRoutes.map(({ path, element }) => (
          <Route element={element} key={path} path={path} />
        ))}
      </Route>
    </Routes>
  );
}

export default AppRouters;
