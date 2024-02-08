import { BuildOptions } from "./types/type";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
	return {
		port: options.port ?? 3000,
		open: true,
		historyApiFallback: true, //routing
	};
}
