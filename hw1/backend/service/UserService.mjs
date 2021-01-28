import {User} from "../models/User.mjs";

let _nextUserId = 0;

export class UserService {

    /**
     * @param {string} name
     * @param {string} surname
     * @param {int} floor
     * @param {int} cabinet
     * @param {int} level
     * @param {string} photoUrl
     */
    createUser(name, surname, floor, cabinet, level, photoUrl) {
        return new User(++_nextUserId, name, surname, floor, cabinet, level, photoUrl);
    }
}