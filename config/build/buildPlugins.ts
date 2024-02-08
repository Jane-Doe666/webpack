import { Configuration } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BuildOptions } from "./types/type";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export function buildPlugins({
	mode,
	paths,
	analyzer,
}: BuildOptions): Configuration["plugins"] {
	const isProd = mode === "production";
	const isDev = mode === "development";

	const plugins: Configuration["plugins"] = [
		new HtmlWebpackPlugin({
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

	if (analyzer) {
		plugins.push(new BundleAnalyzerPlugin()); //npm run build -- --env analyzer=true
	}

	return plugins;
}
