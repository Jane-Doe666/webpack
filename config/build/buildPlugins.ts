import { Configuration } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BuildOptions } from "./types/type";

export function buildPlugins({
	mode,
	paths,
}: BuildOptions): Configuration["plugins"] {
	const isProd = mode === "production";
	const isDev = mode === "development";

	const plugins: Configuration["plugins"] = [
		new HtmlWebpackPlugin({
			// template: path.resolve(__dirname, "src", "index.html"),
			template: paths.html,
			filename: "index.html",
		}),
	];

	if (isProd) {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: "css/[name].[contenthash:8].css",
				chunkFilename: "css/[name].[contenthash:8].css",
			})
		);
	}

	return plugins;
}
