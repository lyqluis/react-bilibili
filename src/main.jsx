import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "@/styles"
import "virtual:svg-icons-register"
import { Provider } from "react-redux"
import store from "./store"
import { fetchLoginInfo } from "./store/userSlice.js"

store.dispatch(fetchLoginInfo())

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
	<Provider store={store}>
		<App />
	</Provider>
	// </React.StrictMode>
)
