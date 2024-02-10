import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
export function buildLoaders(options) {
    var isDev = options.mode === "development";
    var cssLoaderModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:5]", // именование классов
            },
        },
    };
    var scssLoader = {
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
    var imagesLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
    };
    var svgLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
            {
                loader: "@svgr/webpack", // плагин для работы с svg
                options: {
                    icon: true,
                    svgConfig: {
                        plugins: [
                            { name: "convertColors", params: { currentColor: true } }, //
                        ],
                    },
                },
            },
        ],
    };
    var tsLoader = {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [
            {
                loader: "ts-loader",
                options: {
                    getCustomTransformers: function () { return ({
                        // обновление стр без перезагрузки
                        before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                    }); },
                    transpileOnly: isDev, // не будет делать проверку типов во время компиляции в режиме разработки. ускоряет сборку
                },
            },
        ],
    };
    return [scssLoader, imagesLoader, svgLoader, tsLoader];
}
