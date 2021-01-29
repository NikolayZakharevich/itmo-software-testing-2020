import express from 'express';
import bodyParser from 'body-parser';

import {getFloor, initFromFiles} from "./state.mjs";
import {UserService} from "./service/UserService.js";


export class Application {
    constructor() {
        this.expressApp = express();
        this.attachRoutes();
    }

    attachRoutes() {
        let app = this.expressApp;
        let jsonParser = bodyParser.json();

        app.post('/register', jsonParser, this.registerHandler.bind(this));
        app.get('/login', jsonParser, this.loginHandler.bind(this));

        app.get('/init', this.initHandler.bind(this));
        app.post('/init', jsonParser, this.initHandler.bind(this));
        app.get('/floor/:floorId', this.getFloorHandler.bind(this));
    }

    registerHandler(req, res) {
        const {login, password} = req.body;
        new UserService().createUser(login, password)
            .then(r => res.status(200).send(r))
            .catch(r => res.status(400).send(r))
    }

    loginHandler(req, res) {
        const {login, password} = req.body;
        new UserService().checkPassword(login, password)
            .then(r => res.status(200).send(r))
            .catch(r => res.status(400).send(r))
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
