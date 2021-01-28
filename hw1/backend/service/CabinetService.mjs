import {Cabinet} from "../models/Cabinet.mjs";

export class CabinetService {

    /**
     * @param {string} id
     * @param {int} floor
     * @param {int} level
     * @param {int} levelCount
     * @param {string} type
     * @param {Int32Array} tables
     */
    createCabinet(id, floor, level, levelCount, type, tables) {
        return new Cabinet(id, floor, level, levelCount, type, tables);
    }
}