import {
    DataParser, FILENAME_CABINET_106,
    FILENAME_FLOOR_1,
    FILENAME_FLOOR_3, FILENAME_OTHER_CABINETS,
    FILENAME_USERS_LEVEL_1,
    FILENAME_USERS_LEVEL_2
} from "./service/DataParser.mjs";


export let floors = [];

export function initFromFiles() {
    const parser = new DataParser();

    const {fullNameToIdFloor1, cabinetToWorkersFloor1} = parser.parseUsersFile(FILENAME_USERS_LEVEL_1, 1);
    const {fullNameToIdFloor2, cabinetToWorkersFloor2} = parser.parseUsersFile(FILENAME_USERS_LEVEL_2, 2);
    const floor1 = parser.parseFloorFile(FILENAME_FLOOR_1, 1);
    const floor3 = parser.parseFloorFile(FILENAME_FLOOR_3, 3);
    const tableIdToPointsCabinet106 = parser.parseCabinetTablesFile(FILENAME_CABINET_106);
    const cabinets = parser.parseCabinetsFile(FILENAME_OTHER_CABINETS);


    floors = [floor1, floor3];
}