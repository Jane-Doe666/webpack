import path from "path";
import webpack from "webpack";
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildMode, BuildPaths } from "./config/build/types/type";

interface EnvVariables {
	mode: BuildMode;
	port: number;
	analyzer: boolean;
}

export default (env: EnvVariables) => {
	const paths: BuildPaths = {
		entry: path.resolve(__dirname, "src", "index.tsx"),
		html: path.resolve(__dirname, "src", "index.html"),
		output: path.resolve(__dirname, "build"),
	};

	const config: webpack.Configuration = buildWebpack({
		port: env.port ?? 3000,
		mode: env.mode ?? "development",
		paths: paths,
		analyzer: env.analyzer,
	});

	return config;
};
