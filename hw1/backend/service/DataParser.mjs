import fs from 'fs'
import csv from 'csv-parser'
import {WorkerService} from "./WorkerService.mjs";
import {FloorService} from "./FloorService.mjs";
import {CabinetService} from "./CabinetService.mjs";

const DIR_DATA = 'data/';
const DIR_WORKERS = DIR_DATA + 'workers/';
const DIR_FLOORS = DIR_DATA + 'floors/';
const DIR_CABINETS = DIR_DATA + 'cabinets/';

export const FILENAME_WORKERS_LEVEL_1 = DIR_WORKERS + '1_level;cab;surname;name.txt';
export const FILENAME_WORKERS_LEVEL_2 = DIR_WORKERS + '2_level;cab;surname;name.txt';
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
    async parseWorkersFile(fileName, level) {
        const service = new WorkerService();

        const headers = ['cabinet', 'surname', 'name'];
        const fullNameToId = {};
        const cabinetToWorkers = {};

        await this.processCsv(fileName, headers, /** {cabinet: string, surname: string, name: string} */row => {
            const floor = parseInt(row.cabinet.charAt(0), 10);
            const cabinetId = parseInt(row.cabinet, 10);
            const worker = service.createWorker(row.name, row.surname, floor, cabinetId, level, RANDOM_PHOTO_URL);

            fullNameToId[worker.fullName] = worker.id;

            if (cabinetToWorkers[worker.cabinet] && cabinetToWorkers[worker.cabinet][worker.level] !== undefined) {
                cabinetToWorkers[worker.cabinet][worker.level].push(worker.fullName);
            } else {
                cabinetToWorkers[worker.cabinet] = {[worker.level]: []};
            }
        });

        return [fullNameToId, cabinetToWorkers];
    }

    /**
     * @param {string} fileName
     * @param {int} floor
     * @return {Floor}
     */
    async parseFloorFile(fileName, floor) {
        const service = new FloorService();

        const headers = ['id', 'name', 'x', 'y'];
        const cabinetsData = [];

        await this.processCsv(fileName, headers, /** {id: string, name: string, x: string, y: string} */row => {
            const pointX = parseInt(row.x, 10);
            const pointY = parseInt(row.y, 10);
            cabinetsData.push(service.createCabinetData(row.id, row.name, pointX, pointY));
        });

        return service.createFloor(floor, cabinetsData);
    }

    /**
     * @param {string} fileName
     */
    async parseCabinetTablesFile(fileName) {
        const headers = ['id', 'x', 'y'];
        const tableIdToPoints = {};

        await this.processCsv(fileName, headers, /** id: string, x: string, y: string) */row => {
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
    async parseCabinetsFile(fileName) {
        const service = new CabinetService();

        const headers = ['id', 'floor', 'type'];
        const cabinets = [];

        await this.processCsv(fileName, headers, /** id: string, floor: string, type: string) */row => {
            const floor = parseInt(row.floor, 10);
            cabinets.push(service.createCabinet(row.id, floor, 1, 1, row.type, []));
        })
        return cabinets;
    }

    /**
     * @private
     * @param {string} fileName
     * @param {String[]} headers
     * @param {function(object): void} handleRow
     */
    async processCsv(fileName, headers, handleRow) {
        const csvOptions = {
            separator: ';',
            headers
        };
        for await (const chunk of fs.createReadStream(fileName).pipe(csv(csvOptions))) {
            handleRow(chunk)
        }
        console.log(`CSV file "${fileName}" successfully processed`);

    }
}