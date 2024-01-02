import { privateRoutes } from "./privateRoutes";
import MainLayout from "../../layout/MainLayout";
import ProtectRoute from "./ProtectRoute";
export const getRoutes = () => {
  const allRoute = [];
  privateRoutes.map((router) => {
    router.element = (
      <ProtectRoute route={router}>{router.element}</ProtectRoute>
    );
  });
  return {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: privateRoutes,
  };
};
