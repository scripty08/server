import path from 'path';

export const registerScsDevMiddlewares = async (app) => {

    const webpack = await import('webpack');
    const webpackDevMiddleware = await import('webpack-dev-middleware');
    const webpackHotMiddleware = await import('webpack-hot-middleware');

    const rootDir = path.resolve("./");
    const webpackConfig = await import(rootDir + '/webpack.config.dev.cjs');
    const compiler = webpack.default(webpackConfig.default);

    app.use(
        webpackDevMiddleware.default(compiler, {
            publicPath: '/dist/',
            watchOptions: webpackConfig.default.watchOptions,
            writeToDisk: false
        })
    );

    app.use(webpackHotMiddleware.default(compiler));
};

export const ignoreFaviconMiddleware = (req, res, next) =>
    req.originalUrl === '/favicon.ico' ? res.status(204).send() : next();
