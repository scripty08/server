import express from 'express';

export class Router {

    constructor(server) {
        this.server = server;
    }

    addController(controller) {
        controller.init(this.server, express.Router());
    }
}
