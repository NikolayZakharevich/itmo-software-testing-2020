import Backend from "../Backend";

export const getRoute = (from, to, without_stairs, without_elevator) => Backend.request('route/', {from, to, without_elevator, without_stairs} );