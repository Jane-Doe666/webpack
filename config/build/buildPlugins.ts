import path from "path";
import { Configuration } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BuildOptions } from "./types/type";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

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
			favicon: path.resolve(__dirname, paths.public, "favicon.ico"),
		}),
	];

	if (isProd) {
		plugins.push(
			new MiniCssExtractPlugin({
				// формирует css отдельно в build
				filename: "css/[name].[contenthash:8].css",
				chunkFilename: "css/[name].[contenthash:8].css",
			})
		);
	}

	if (isDev) {
		plugins.push(
			//выносит проверку типов в отдельный процесс, не нагружая сборку. сборка будет проходить быстрее
			new ForkTsCheckerWebpackPlugin()
		);
		plugins.push(
			// обновление страницы полной без перезагрузки + rules
			new ReactRefreshWebpackPlugin()
		);
	}

	if (analyzer) {
		plugins.push(new BundleAnalyzerPlugin()); //npm run build -- --env analyzer=true
	}

	return plugins;
}
