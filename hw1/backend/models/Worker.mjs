export class Worker {

    /**
     * @param {int} id
     * @param {string} name
     * @param {string} surname
     * @param {int} floor
     * @param {int} cabinet
     * @param {int} level
     * @param {string} photoUrl
     */
    constructor(id, name, surname, floor, cabinet, level, photoUrl) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.floor = floor;
        this.cabinet = cabinet;
        this.level = level;
        this.photoUrl = photoUrl;
    }

    get fullName() {
        return this.name + " " + this.surname;
    }
}