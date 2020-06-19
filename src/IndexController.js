import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

export class IndexController {

    constructor(config = { title: 'No Title' }) {
        this.config = config;
    }

    async init(server, router) {
        router.get('*', this.indexAction.bind(this));

        if ('development' === process.env.NODE_ENV) {
            const { registerScsDevMiddlewares } = await import('./middlewares');
            await registerScsDevMiddlewares(server);
        }

        server.use(router);
    }

    async indexAction(req, res) {
        const dirname = path.join(path.dirname(decodeURI(new URL(import.meta.url).pathname)));
        const view = fs.readFileSync(path.resolve(dirname, "./app.hbs"), 'utf8');
        const template = handlebars.compile(view);

        let body = template({
            state: JSON.stringify({ loggedIn: false }),
            title: this.config.title
        });

        if (typeof req.user !== 'undefined') {
            body = template({
                state: JSON.stringify({
                    loggedIn: true,
                    ...req.user._doc
                }),
                title: this.config.title
            });
        }

        res.setHeader('Content-Type', 'text/html');
        res.end(body);
    };
}
