import express from 'express';
import bodyParser from 'body-parser';

import {getFloor, initFromFiles} from "./state.mjs";


export class Application {
    constructor() {
        this.expressApp = express();
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
        initFromFiles().then(_ => res.json('ok'));
    }

    getFloorHandler(req, res) {
        const floorId = parseInt(req.params.floorId, 10);
        const filters = (req.query.filters || '').split(',').filter(x => !!x)

        res.json({
            floor: getFloor(floorId, filters)
        });
    }
}
