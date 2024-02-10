import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LazyAbout } from "./pages/about/About.lazy";
import { Suspense } from "react";
import { LazyShop } from "./pages/shop/Shop.lazy";
var router = createBrowserRouter([
    {
        path: "/",
        element: _jsx(App, {}),
        children: [
            {
                path: "/about",
                // element: <About />,
                element: (_jsx(Suspense, { fallback: "Loading...", children: _jsx(LazyAbout, {}) })),
            },
            {
                path: "shop",
                // element: <Shop />,
                element: (_jsx(Suspense, { fallback: "Loading...", children: _jsx(LazyShop, {}) })),
            },
        ],
    },
]);
var root = document.getElementById("root");
if (!root) {
    throw new Error("root not found");
}
var container = createRoot(root);
container.render(_jsx(RouterProvider, { router: router }));
