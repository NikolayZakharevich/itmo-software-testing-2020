export class Floor {

    /**
     * @param {int} id
     * @param {CabinetData[]} cabinets
     */
    constructor(id, cabinets) {
        this.id = id;
        this.cabinets = cabinets;
    }
}

export class CabinetData {

    /**
     * @param {string} id
     * @param {string} name
     * @param {int} pointX
     * @param {int} pointY
     */
    constructor(id, name, pointX, pointY) {
        this.id = id;
        this.name = name;
        this.pointX = pointX;
        this.pointY = pointY;
    }

}