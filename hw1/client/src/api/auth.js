import Backend from "../Backend";

export const doRegister = params => Backend.request('register', params, 'POST');
export const doLogin = params => Backend.request('login', params);