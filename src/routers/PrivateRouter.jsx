import {
  Navigate,
  Outlet
} from 'react-router-dom'
import { AUTH_CONFIG } from './config'
import PATH from './path'

export default function PrivateRoute({children, ...rest}) {
  const user = JSON.parse(localStorage.getItem(AUTH_CONFIG.USER_STORAGE_NAME))

  return (
    user ? <Outlet/> : <Navigate to={{
      pathname: PATH.LOGIN,
    }}/>
  )
}
