import App from "../App";
import Lists from "../components/view/Lists";

const routes = {
	boards: {
		path: "/",
		name: "Boards",
		component: App,
	},
	lists: { 
		path: '/board/:id', 
		name: "Lists",
		component: Lists,
	}
}

export default routes;