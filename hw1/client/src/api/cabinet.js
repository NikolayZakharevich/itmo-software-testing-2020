import Backend from "../Backend";

export const getCabinet = id => Backend.request('cabinet/' + id, {}, );