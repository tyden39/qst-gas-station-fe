import {
  Navigate,
  Outlet
} from 'react-router-dom'
import PATH from './path'
import useAuth from 'zustands/useAuth'

export default function PrivateRoute({children, ...rest}) {
  const user = useAuth(auth => auth.user)
  return (
    user ? <Outlet/> : <Navigate to={{
      pathname: PATH.LOGIN,
    }}/>
  )
}
