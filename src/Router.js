import express from 'express';
import mongoose from 'mongoose';

export class Router {

    constructor(server) {
        this.server = server;
    }

    addController(controller) {
        controller.init(this.server, express.Router(), mongoose);
    }
}
