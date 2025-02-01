import { withAdminAuth } from '../HOC';

function AuthenticationTestAdmin() {
  return (
    <div>This page can only be accessed if role of logged in user is ADMIN.(Means checking Authorization)</div>
  )
}

export default withAdminAuth(AuthenticationTestAdmin);