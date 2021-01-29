import Backend from "../Backend";

export const search = query => Backend.request('search', {query});