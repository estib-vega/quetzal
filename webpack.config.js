const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const baseConfig = {
    target: "web",
    entry: [
        path.resolve(__dirname, "./src/html/index.html"),
        path.resolve(__dirname, "./src/index.ts"),
        path.resolve(__dirname, "./src/css/index.less"),
    ],
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "index.js",
    },
    resolve: {
        plugins: [
            new TsconfigPathsPlugin({
                extensions: [".ts", ".tsx", ".js"],
            }),
        ],
        extensions: [".ts", ".tsx", ".js"],
        fallback: { path: require.resolve("path-browserify") },
    },
    externals: {
        fs: "undefined",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader",
                        options: {
                            strictMath: true,
                            noIeCompat: true,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                ],
            },
            {
                test: /\.(ttf|eot|woff|woff2|otf)(\?v=[^\.]+\.[^\.]+\.[^\.]+)?$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash:8].[ext]",
                    },
                },
            },
            {
                test: /\.(jpe?g|svg|png)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                    },
                },
            },
            {
                test: /\.html$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                    },
                },
            },
        ],
    },
    devServer: {
        allowedHosts: "all",
        port: 5000,
        static: [
            {
                directory: path.join(__dirname, "./build"),
                watch: true,
            },
            {
                directory: path.join(__dirname, "./src"),
                watch: true,
            },
        ],
    },
};

module.exports = [
    { ...baseConfig, name: "development", mode: "none", devtool: "source-map" },
    { ...baseConfig, name: "production", mode: "production", optimization: { minimize: true } },
];
