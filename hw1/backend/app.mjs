import express from 'express';
import bodyParser from 'body-parser';

import {floors, initFromFiles} from "./state.mjs";


export class Application {
    constructor() {
        this.expressApp = express();
        this.manager = new ChatRoomManager();
        this.attachRoutes();
    }

    attachRoutes() {
        let app = this.expressApp;
        let jsonParser = bodyParser.json();

        app.get('/init', this.initHandler.bind(this));
        app.post('/init', jsonParser, this.initHandler.bind(this));
        app.get('/floor/:floorId', this.getFloorHandler.bind(this));
    }

    initHandler(req, res) {
        initFromFiles();

        const response = 'ok';
        res.json({response});
    }

    getFloorHandler(req, res) {
        const floorId = parseInt(req.params.floorId, 10);
        const floor = floors.find(floor => floor.id === floorId) || null;
        const response = {floor};
        res.json({response});
    }
}
