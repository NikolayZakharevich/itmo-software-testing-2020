import {
    DataParser, FILENAME_CABINET_106,
    FILENAME_FLOOR_1,
    FILENAME_FLOOR_3, FILENAME_OTHER_CABINETS,
    FILENAME_WORKERS_LEVEL_1,
    FILENAME_WORKERS_LEVEL_2
} from "./service/DataParser.mjs";
import {CabinetService} from "./service/CabinetService.mjs";


export let _FLOORS = [];
export let _CABINETS = [];
export let _USERS = [];


function extractWorkerRooms(cabinetToWorkers, floor) {
    const service = new CabinetService();

    const extractedCabinets = []
    for (let cabinetId in cabinetToWorkers) {
        if (!cabinetToWorkers.hasOwnProperty(cabinetId)) {
            continue;
        }
        const cabinets = cabinetToWorkers[cabinetId];
        const levelCount = cabinets.length

        for (const level in Object.keys(cabinets)) {
            extractedCabinets.push(service.createCabinet(cabinetId, floor, level, levelCount, 'worker_room', []))
        }
    }

    return extractedCabinets;
}


async function readFiles() {
    const parser = new DataParser();
    const [
        [fullNameToIdFloor1, cabinetToWorkersFloor1],
        [fullNameToIdFloor2, cabinetToWorkersFloor2],
        floor1,
        floor3,
        tableIdToPointsCabinet106,
        cabinets
    ] = await Promise.all([
        parser.parseWorkersFile(FILENAME_WORKERS_LEVEL_1, 1),
        parser.parseWorkersFile(FILENAME_WORKERS_LEVEL_2, 2),
        parser.parseFloorFile(FILENAME_FLOOR_1, 1),
        parser.parseFloorFile(FILENAME_FLOOR_3, 3),
        parser.parseCabinetTablesFile(FILENAME_CABINET_106),
        parser.parseCabinetsFile(FILENAME_OTHER_CABINETS)
    ])

    return {
        fullNameToIdFloor1,
        cabinetToWorkersFloor1,
        fullNameToIdFloor2,
        cabinetToWorkersFloor2,
        floor1,
        floor3,
        tableIdToPointsCabinet106,
        cabinets
    }
}

export async function initFromFiles() {
    const {
        fullNameToIdFloor1,
        cabinetToWorkersFloor1,
        fullNameToIdFloor2,
        cabinetToWorkersFloor2,
        floor1,
        floor3,
        tableIdToPointsCabinet106,
        cabinets
    } = await readFiles();

    _FLOORS = [floor1, floor3];
    _CABINETS = cabinets;
    _CABINETS.push(
        ...extractWorkerRooms(cabinetToWorkersFloor1, 1),
        ...extractWorkerRooms(cabinetToWorkersFloor2, 2)
    );

}

/**
 * @param {int} id
 * @param {[String]} cabinetFilters
 */
export function getFloor(id, cabinetFilters) {
    const floor = _FLOORS.find(floor => floor.id === id) || null;
    if (!floor) {
        return null;
    }

    if (cabinetFilters.length === 0) {
        return floor;
    }
    return {
        id: floor.id,
        cabinets: Object.values(floor.cabinets)
            .filter(cabinetData => {
                const cabinet = _CABINETS.find(cabinet => cabinet.id === cabinetData.id);
                return !!cabinet && cabinetFilters.includes(cabinet.type)
            })
    };
}

export function saveUser(user) {
    _USERS.push(user);
}

export function findUser(login) {
    return _USERS.find(x => x.login === login)
}