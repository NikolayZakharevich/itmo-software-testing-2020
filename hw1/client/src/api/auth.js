import Backend from "../Backend";

export const doRegister = ({login, password}) => Backend.request('register', ({login, password}));
export const doLogin = ({login, password}) => Backend.request('login', ({login, password}));