import Backend from "../Backend";

export const getFloor = id => Backend.request('floor/' + id, {}, );
export const getFloorWithFilters = (id, filters) => Backend.request('floor/' + id, {filters});