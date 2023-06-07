import { useSelector } from "react-redux"
import { selectAuthState } from "../store/authSlice"
import { Navigate, useLocation } from "react-router-dom"

const RequireAuth = ({ children }) => {
	const isLoggedIn = useSelector(selectAuthState("isLoggedIn"))
	const location = useLocation()

	// fetchLoginInfo has not got data yet
	if (isLoggedIn === null) {
		return <>loading to get login info</>
	}

	if (isLoggedIn) return children

	// Redirect them to the /login page, but save the current location they were
	// trying to go to when they were redirected. This allows us to send them
	// along to that page after they login, which is a nicer user experience
	// than dropping them off on the home page.
	return (
		<Navigate
			to='/login'
			state={{ from: location }}
			replace
		/>
	)
}

export default RequireAuth
