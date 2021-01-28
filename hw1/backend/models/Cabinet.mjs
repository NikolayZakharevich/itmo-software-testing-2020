export class Cabinet {

    /**
     * @param {string} id
     * @param {int} floor
     * @param {int} level
     * @param {int} levelCount
     * @param {string} type
     * @param {Int32Array} tables
     */
    constructor(id, floor, level, levelCount, type, tables) {
        this.id = id;
        this.floor = floor;
        this.level = level;
        this.levelCount = levelCount;
        this.type = type;
        this.tables = tables;
    }
}