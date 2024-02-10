import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/type";
import ReactRefreshTypeScript from "react-refresh-typescript";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
	const isDev = options.mode === "development";

	const cssLoaderModules = {
		loader: "css-loader",
		options: {
			modules: {
				localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:5]", // именование классов
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
				// для работы с svg как с react.component и передавать пропс (цвета, размеры) как с иконками
				options: {
					icon: true,
					// работа как с иконками, иначе меняется размер контейнера div внутри которого svg, а не сам svg
					svgConfig: {
						plugins: [
							{ name: "convertColors", params: { currentColor: true } },
							// важно чтобы задавать цвет svg через color, иначе будут работать только fill и stroke (элемент и область)
						],
					},
				},
			},
		],
	};

	const tsLoader = {
		exclude: /node_modules/,
		test: /\.tsx?$/,
		use: [
			{
				loader: "ts-loader",
				options: {
					getCustomTransformers: () => ({
						// обновление стр. без перезагрузки
						before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
					}),
					transpileOnly: isDev,
					// не будет делать проверку типов во время компиляции в режиме разработки. ускоряет сборку
				},
			},
		],
	};

	const babelLoader = {
		// install presets for ts/react
		test: /\.tsx?$/,
		exclude: /node_modules/,
		use: {
			loader: "babel-loader",
			options: {
				presets: [
					"@babel/preset-env",
					"@babel/preset-typescript",
					"@babel/preset-react",
				],
			},
		},
	};

	return [scssLoader, imagesLoader, svgLoader, tsLoader];
}
