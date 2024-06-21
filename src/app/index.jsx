import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import PrivateRoute from "routers/PrivateRouter"
import PATH from "routers/path"
import { getPermissionPage } from "routers/permission"
import { privateRoutes } from "routers/routes"
import useAuth from "zustands/useAuth"
import NotFound from "./404"
import "./index.css"
import Layout from "./layout"
import LoginPage from "./login"
import Providers from "./providers"

export default function App() {
  const [user] = useAuth((state) => [state.user])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Providers />}>
        <Route
          path={PATH.LOGIN}
          element={user ? <Navigate to={PATH.HOME} /> : <LoginPage />}
        />
        <Route element={<Layout />}>
          <Route path={PATH.HOME} element={<Navigate to={PATH.FUEL} />} />
          <Route element={<PrivateRoute {...{ user }} />}>
            {privateRoutes.map((route, index) => {
              const Page = getPermissionPage(route, user)
              return (
                <Route
                  exact
                  key={`route-${index}`}
                  path={route.path}
                  element={<Page />}
                />
              )
            })}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    )
  )

  return <RouterProvider router={router} />
}
