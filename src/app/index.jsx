import { useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import PrivateRoute from "routers/PrivateRouter"
import { AUTH_CONFIG } from "routers/config"
import PATH from "routers/path"
import { getPermissionPage } from "routers/permission"
import { privateRoutes } from "routers/routes"
import useAuth from "zustands/useAuth"
import Layout from "./layout"
import LoginPage from "./login"
import Providers from "./providers"

export default function App() {
  const user = JSON.parse(localStorage.getItem(AUTH_CONFIG.USER_STORAGE_NAME))
  const [userGlobal, setUser] = useAuth(auth => [auth.user, auth.setUser, auth.loading])

  useEffect(() => {
    if (!userGlobal && user) setUser(user)
  }, [setUser, user, userGlobal])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Providers />}>
          <Route path={PATH.LOGIN} element={user ? <Navigate to={PATH.HOME} /> : <LoginPage />} />
          <Route element={<Layout />}>
            <Route element={<PrivateRoute />}>
              {privateRoutes.map((route, index) => {
                const Page = getPermissionPage(route, user)
                return (
                  <Route exact key={`route-${index}`} path={route.path} element={<Page />} />
                )
              })}
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
