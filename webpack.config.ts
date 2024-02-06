import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import "webpack-dev-server";

type Mode = "production" | "development";

interface EnvVariables {
	mode: Mode;
}

export default (env: EnvVariables) => {
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
		devServer: {
			watchFiles: path.resolve(__dirname, "src"),
			port: 9000,
		},
	};

	return config;
};
