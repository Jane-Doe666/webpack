import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import "webpack-dev-server";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

type Mode = "production" | "development";

interface EnvVariables {
	mode: Mode;
	port: number;
}

export default (env: EnvVariables) => {
	const isDev = env.mode === "development";

	const config: webpack.Configuration = {
		mode: env.mode ?? "development",
		entry: path.resolve(__dirname, "src", "index.js"),

		output: {
			path: path.resolve(__dirname, "build"),
			filename: "[name].[contenthash:8].js",
			clean: true,
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, "src", "index.html"),
				filename: "index.html",
			}),
		],
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: "ts-loader",
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			extensions: [".tsx", ".ts", ".js"],
		},
		devtool: isDev ? "inline-source-map" : undefined,
		devServer: isDev
			? {
					port: env.port ?? 8080,
					open: true,
			  }
			: undefined,
	};

	return config;
};
