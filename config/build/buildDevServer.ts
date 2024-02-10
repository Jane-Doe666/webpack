import { BuildOptions } from "./types/type";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
	return {
		port: options.port ?? 3000,
		open: true,
		historyApiFallback: true, //routing
		hot: true, // hot module replacement если чистый не чистый js/tsx, а react - то нужен еще плагин (react fast refresh) иначе страница продолжит полностью перезагружаться на каждое изменение, для babel и ts cм.разные плагины
	};
}
