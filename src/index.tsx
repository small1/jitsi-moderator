import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { loader as meetingLoader } from "./routes/Meeting";
import Error from "./routes/Error";
import Home from "./routes/Home";
import Meeting from "./routes/Meeting";
import Routes from "./utils/enums/Routes";

const router = createBrowserRouter([
	{
		path: Routes.ROOT,
		element: <App />,
		children: [
			{
				path: Routes.HOME,
				element: <Home />,
			},
			{
				path: Routes.MEETING,
				element: <Meeting />,
				loader: meetingLoader,
			},
		],
		errorElement: <Error />,
	},
]);

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
