import {
  Navigate,
  Outlet
} from 'react-router-dom'
import PATH from './path'

export default function PrivateRoute({children, user, ...rest}) {
  return (
    user ? <Outlet/> : <Navigate to={{
      pathname: PATH.LOGIN,
    }}/>
  )
}
