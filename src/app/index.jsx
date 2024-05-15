import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout"
import PrivateRoute from "routers/PrivateRouter"
import LoginPage from "./login"
import { privateRoutes } from "routers/routes"
import PATH from "routers/path"
import { getPermissionPage } from "routers/permission"
import useAuth from "zustands/useAuth"

export default function App() {
  const user = useAuth(auth => auth.user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Navigate to={PATH.FUEL} />} />
            {privateRoutes.map((route, index) => {
              const Page = getPermissionPage(route, user)
              return (
                <Route exact key={`route-${index}`} path={route.path} element={<Page />} />
              )
            })}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function AuthRoute({ path, element, children }) {
  return <Route {...{ path, element }}>{children}</Route>
}
