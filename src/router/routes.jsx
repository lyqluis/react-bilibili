import Layout from "@/layout/Layout"
import Find from "@/pages/Find"
import Error from "@/pages/Error"
import { lazy, Suspense } from "react"
import Loading from "@/components/Loading"
import PageLayout from "../layout/PageLayout"
import RequireAuth from "../components/RequireAuth"
import { redirect } from "react-router-dom"
import store from "../store"

// lazy load components
const Search = lazy(() => import("@/pages/Search"))
const Shop = lazy(() => import("@/pages/Shop"))
const User = lazy(() => import("@/pages/User"))
const ChannelLayout = lazy(() => import("@/layout/ChannelLayout"))
const Channel = lazy(() => import("@/pages/Channel"))
const AllChannels = lazy(() => import("@/pages/AllChannels"))
const Rank = lazy(() => import("@/pages/Rank"))
const Weekly = lazy(() => import("@/pages/Weekly"))
const MustSee = lazy(() => import("@/pages/MustSee"))
const Login = lazy(() => import("@/pages/Login"))
const ListPage = lazy(() => import("@/pages/ListPage"))
const ShopList = lazy(() => import("@/pages/ShopList"))
const ShopAllCategory = lazy(() => import("@/pages/ShopAllCategory"))
const Product = lazy(() => import("@/pages/Product"))
const Cart = lazy(() => import("@/pages/Cart"))

// page laod
const lazyload = (Component, extraProps) => (props) =>
	(
		<Suspense fallback={<Loading />}>
			<Component
				{...props}
				{...extraProps}
			/>
		</Suspense>
	)

const checkAuth = (Component) => (props) =>
	(
		<RequireAuth>
			<Component {...props} />
		</RequireAuth>
	)

// const checkAuthLoader = async () => {
// const status = store.getState().auth.fetchLoginInfoStatus
// if (status === "idle") {
// 	await store.dispatch(fetchLoginInfo())
// }
// // not login
// // return redirect('/login')
// // is logined
// // return null
// }

const routes = [
	{
		path: "/",
		Component: Layout,
		children: [
			{
				path: "",
				Component: PageLayout,
				children: [
					{ path: "", Component: Find },
					{ path: "rank/:channelName?", Component: lazyload(Rank) },
					{ path: "weekly", Component: lazyload(Weekly) },
					{ path: "ruzhanbikan", Component: lazyload(MustSee) },
				],
			},
			{ path: "search", Component: lazyload(Search) },
			{ path: "shop", Component: lazyload(Shop) },
			{ path: "shop/list", Component: lazyload(ShopList) },
			{ path: "shop/allcategory", Component: lazyload(ShopAllCategory) },
			{ path: "shop/product/:id", Component: lazyload(Product) },
			{ path: "shop/cart", Component: lazyload(Cart) },
			{
				path: "shop/search_result",
				Component: lazyload(ShopList, { isSearchResult: true }),
			},
			{
				path: "user/:userId?/:tabName?",
				Component: checkAuth(lazyload(User)),
				// loader: ({ params }) => {
				// 	// loader happens before global store's dispath fetchLoginInfo
				// 	if (!params?.userId) {
				// 		const id = store.getState().auth.authInfo?.mid
				// 		if (id) return redirect(`/user/${id}`)
				// 	}
				// 	return null
				// },
			},
			{
				path: "user/:userId?/favorite/:fav_id",
				Component: checkAuth(lazyload(ListPage)),
				loader: async () => "loader data",
			},
			{
				path: "channel",
				Component: lazyload(ChannelLayout),
				children: [
					{ path: "", Component: lazyload(AllChannels) },
					{
						path: ":channelName/:childChannelName?",
						Component: lazyload(Channel),
					},
				],
			},
			{ path: "login", Component: lazyload(Login) },
		],
	},
	{ path: "*", Component: Error },
]

export default routes
