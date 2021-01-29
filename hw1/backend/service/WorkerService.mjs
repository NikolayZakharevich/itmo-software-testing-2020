import {Worker} from "../models/Worker.mjs";

let _nextWorkerId = 0;

export class WorkerService {

    /**
     * @param {string} name
     * @param {string} surname
     * @param {int} floor
     * @param {int} cabinet
     * @param {int} level
     * @param {string} photoUrl
     */
    createWorker(name, surname, floor, cabinet, level, photoUrl) {
        return new Worker(++_nextWorkerId, name, surname, floor, cabinet, level, photoUrl);
    }
}