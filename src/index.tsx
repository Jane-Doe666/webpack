import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "@/pages/about/About";
import { LazyAbout } from "./pages/about/About.lazy";
import { Suspense } from "react";
import { LazyShop } from "./pages/shop/Shop.lazy";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/about",
				// element: <About />,
				element: (
					<Suspense fallback={"Loading..."}>
						<LazyAbout />
					</Suspense>
				),
			},
			{
				path: "shop",
				// element: <Shop />,
				element: (
					<Suspense fallback={"Loading..."}>
						<LazyShop />
					</Suspense>
				),
			},
		],
	},
]);

const root = document.getElementById("root");

if (!root) {
	throw new Error("root not found");
}

const container = createRoot(root);
container.render(<RouterProvider router={router} />);
