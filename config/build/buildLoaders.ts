import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/type";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
	const isDev = options.mode === "development";

	const tsxLoader = {
		test: /\.tsx?$/,
		use: "ts-loader",
		exclude: /node_modules/,
	};

	// const cssLoader = {
	// 	test: /\.css$/i,
	// 	use: ["style-loader", "css-loader"],
	// };

	const sassLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			// Creates `style` nodes from JS strings (MiniCssExtractPlugin create css chunck)
			isDev ? "style-loader" : MiniCssExtractPlugin.loader,
			// Translates CSS into CommonJS
			"css-loader",
			// Compiles Sass to CSS
			"sass-loader",
		],
	};

	return [sassLoader, tsxLoader];
}
