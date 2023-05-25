import Layout from "@/layout/Layout"
import Find from "@/pages/Find"
import Error from "@/pages/Error"
import { lazy, Suspense } from "react"
import Loading from "@/components/Loading"
import PageLayout from "../layout/PageLayout"
import RequireAuth from "../components/RequireAuth"

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

// page laod
const lazyload = (Component) => (props) =>
	(
		<Suspense fallback={<Loading />}>
			<Component {...props} />
		</Suspense>
	)

const checkAuth = (Component) => (props) =>
	(
		<RequireAuth>
			<Component {...props} />
		</RequireAuth>
	)

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
			{
				path: "user/:userId?/:tabName?",
				Component: checkAuth(lazyload(User)),
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
