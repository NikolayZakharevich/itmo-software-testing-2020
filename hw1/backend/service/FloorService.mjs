import {Floor, CabinetData} from "../models/Floor.mjs";

export class FloorService {

    /**
     * @param {int} floor
     * @param {CabinetData[]} cabinetsData
     */
    createFloor(floor, cabinetsData) {
        return new Floor(floor, cabinetsData);
    }

    /**
     * @param {string} id
     * @param {string} name
     * @param {int} pointX
     * @param {int} pointY
     */
    createCabinetData(id, name, pointX, pointY) {
        return new CabinetData(id, name, pointX, pointY);
    }
}

