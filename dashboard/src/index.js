import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { SideNav } from "./Components/SideNav/SideNav";
import { TopBar } from "./Components/TopBar/TopBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseDetailsPage from "./CourseDetailsPage"; 




const router = createBrowserRouter([
	{
		path: "/",
		element: <App />
	},
	{
		path: "/course-details/:courseId",
		element: <CourseDetailsPage />
	}
]);



ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<div className="Layout">
			<SideNav />
			<div className="Layout1">
				<TopBar />
				<RouterProvider router={router} />
			</div>
		</div>
	</React.StrictMode>
);

reportWebVitals();
