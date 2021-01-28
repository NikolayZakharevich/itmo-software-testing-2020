import fs from 'fs'
import csv from 'csv-parser'
import {UserService} from "./UserService.mjs";
import {FloorService} from "./FloorService.mjs";
import {CabinetService} from "./CabinetService.mjs";

const DIR_DATA = 'data/';
const DIR_USERS = DIR_DATA + 'users/';
const DIR_FLOORS = DIR_DATA + 'floors/';
const DIR_CABINETS = DIR_DATA + 'cabinets/';

export const FILENAME_USERS_LEVEL_1 = DIR_USERS + '1_level;cab;surname;name.txt';
export const FILENAME_USERS_LEVEL_2 = DIR_USERS + '2_level;cab;surname;name.txt';
export const FILENAME_FLOOR_1 = DIR_FLOORS + '1_floor;id;name;x;y';
export const FILENAME_FLOOR_3 = DIR_FLOORS + '3_floor;id;name;x;y';
export const FILENAME_CABINET_106 = DIR_CABINETS + '106_cabinet';
export const FILENAME_OTHER_CABINETS = DIR_CABINETS + 'other_cabs';


const RANDOM_PHOTO_URL = "https://pngimg.com/uploads/face/face_PNG5669.png";

export class DataParser {

    /**
     * @param {string} fileName
     * @param {int} level
     */
    parseUsersFile(fileName, level) {
        const service = new UserService();

        const headers = ['cabinet', 'surname', 'name'];
        const fullNameToId = {};
        const cabinetToWorkers = {};

        this.processCsv(fileName, headers, /** {cabinet: string, surname: string, name: string} */row => {
            const floor = parseInt(row.cabinet.charAt(0), 10);
            const cabinetId = parseInt(row.cabinet, 10);
            const user = service.createUser(row.name, row.surname, floor, cabinetId, level, RANDOM_PHOTO_URL);

            fullNameToId[user.fullName] = user.id;
            cabinetToWorkers[user.cabinet] = {};
            if (cabinetToWorkers[user.cabinet] && cabinetToWorkers[user.cabinet][user.level]) {
                cabinetToWorkers[user.cabinet][user.level].push(user.fullName);
            } else {
                cabinetToWorkers[user.cabinet] = {[user.level]: []};
            }
        });

        return {fullNameToId, cabinetToWorkers};
    }

    /**
     * @param {string} fileName
     * @param {int} floor
     * @return {Floor}
     */
    parseFloorFile(fileName, floor) {
        const service = new FloorService();

        const headers = ['id', 'name', 'x', 'y'];
        const cabinetsData = [];

        this.processCsv(fileName, headers, /** {id: string, name: string, x: string, y: string} */row => {
            const pointX = parseInt(row.x, 10);
            const pointY = parseInt(row.y, 10);
            cabinetsData.push(service.createCabinetData(row.id, row.name, pointX, pointY));
        });

        return service.createFloor(floor, cabinetsData);
    }

    /**
     * @param {string} fileName
     */
    parseCabinetTablesFile(fileName) {
        const headers = ['id', 'x', 'y'];
        const tableIdToPoints = {};

        this.processCsv(fileName, headers, /** id: string, x: string, y: string) */row => {
            const tableId = parseInt(row.id, 10);
            const pointX = parseInt(row.x, 10);
            const pointY = parseInt(row.y, 10);
            tableIdToPoints[tableId] = {pointX, pointY};
        });

        return tableIdToPoints;
    }

    /**
     * @param {string} fileName
     */
    parseCabinetsFile(fileName) {
        const service = new CabinetService();

        const headers = ['keyCabs', 'floor', 'type'];
        const cabinets = [];

        this.processCsv(fileName, headers, /** id: string, floor: string, type: string) */row => {
            const floor = parseInt(row.floor, 10);
            cabinets.push(service.createCabinet(row.id, floor, 1, 1, row.type, []));
        });

        return cabinets;
    }

    /**
     * @private
     * @param {string} fileName
     * @param {String[]} headers
     * @param {function(object): void} handleRow
     */
    processCsv(fileName, headers, handleRow) {
        const csvOptions = {
            separator: ';',
            headers
        };

        fs.createReadStream(fileName)
            .pipe(csv(csvOptions))
            .on('data', handleRow)
            .on('end', () => {
                console.log(`CSV file "${fileName}" successfully processed`);
            });
    }
}