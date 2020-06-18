import express from 'express';
import { ignoreFaviconMiddleware } from './index/middlewares';
import { Router } from './Router';
import bodyParser from 'body-parser';
import queryParser from 'express-query-parser';
import { getConnection } from './mongo';
import { Logger } from '../logger';
import prerender from 'prerender-node';
import compression from 'compression';

export class Server {
    constructor() {
        this.create();
    }

    start(port = 3000) {
        this.server.listen(port, async () => {
            Logger.info(`server listening on port ${port}!`);
        });
    }

    addController(controller) {
        this.router.addController(controller);
    }

    use(requestHandler) {
        this.server.use(requestHandler);
    }

    create() {
        getConnection();
        this.server = express();

        prerender.set('prerenderServiceUrl', process.env.PRERENDER_URL);
        prerender.set('host', process.env.HOST);
        prerender.set( 'protocol', 'https' );

        this.server.use(compression());
        this.server.use(bodyParser.json());
        this.server.use(queryParser({ parseNull: true, parseBoolean: true }));
        this.server.use('/dist', express.static('public/dist'));
        this.server.use('/files', express.static('public/files'));
        this.server.use(ignoreFaviconMiddleware);
        this.server.use(prerender);
        this.router = new Router(this.server);
    }
}
