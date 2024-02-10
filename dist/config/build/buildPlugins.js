import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
export function buildPlugins(_a) {
    var mode = _a.mode, paths = _a.paths, analyzer = _a.analyzer;
    var isProd = mode === "production";
    var isDev = mode === "development";
    var plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
            filename: "index.html",
        }),
    ];
    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            // формирует css отдельно в build
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css",
        }));
    }
    if (isDev) {
        plugins.push(
        //выносит проверку типов в отдельный процесс. сборка будет проходить быстрее
        new ForkTsCheckerWebpackPlugin());
        plugins.push(
        // обновление страницы полной без перезагрузки + rules
        new ReactRefreshWebpackPlugin());
    }
    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin()); //npm run build -- --env analyzer=true
    }
    return plugins;
}
