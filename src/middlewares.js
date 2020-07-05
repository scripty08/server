export const registerScsDevMiddlewares = async (app) => {

    const webpackModule = await import('webpack');
    const webpackDevMiddlewareModule = await import('webpack-dev-middleware');
    const webpackHotMiddlewareModule = await import('webpack-hot-middleware');

    const webpack = webpackModule.default;
    const webpackDevMiddleware = webpackDevMiddlewareModule.default;
    const webpackHotMiddleware = webpackHotMiddlewareModule.default;

    const path = '../../../../webpack.config.dev.cjs';
    const webpackConfig = await import(path);
    const config = webpackConfig.default;
    const compiler = webpack(config);

    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: '/dist/',
            watchOptions: webpackConfig.watchOptions,
            writeToDisk: false
        })
    );

    app.use(webpackHotMiddleware(compiler));
};

export const ignoreFaviconMiddleware = (req, res, next) =>
    req.originalUrl === '/favicon.ico' ? res.status(204).send() : next();
