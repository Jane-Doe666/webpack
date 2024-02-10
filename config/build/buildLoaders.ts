import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/type";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
	const isDev = options.mode === "development";

	const tsLoader = {
		exclude: /node_modules/,
		test: /\.tsx?$/,
		use: [
			{
				loader: "ts-loader",
				options: {
					transpileOnly: true,
				},
			},
		],
	};

	const cssLoaderModules = {
		loader: "css-loader",
		options: {
			modules: {
				localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:5]",
			},
		},
	};

	const scssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			// Creates `style` nodes from JS strings (MiniCssExtractPlugin create .css in build)
			isDev ? "style-loader" : MiniCssExtractPlugin.loader,
			// Translates CSS into CommonJS
			cssLoaderModules,
			// Compiles Sass to CSS
			"sass-loader",
		],
	};

	const imagesLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: "asset/resource",
	};

	const svgLoader = {
		test: /\.svg$/i,
		issuer: /\.[jt]sx?$/,
		use: [
			{
				loader: "@svgr/webpack",
				options: {
					icon: true,
					svgConfig: {
						plugins: [
							{ name: "convertColors", params: { currentColor: true } },
						],
					},
				},
			},
		],
	};

	return [scssLoader, imagesLoader, svgLoader, tsLoader];
}
