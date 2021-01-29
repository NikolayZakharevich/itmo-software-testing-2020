import createRouter from "router5";

export const ROUTE_NAME_MAIN = 'main'
export const ROUTE_NAME_LOGIN = 'login'
export const ROUTE_NAME_REGISTER = 'register'

const routes = [
    {name: ROUTE_NAME_MAIN, path: '/'},
    {name: ROUTE_NAME_LOGIN, path: '/login'},
    {name: ROUTE_NAME_REGISTER, path: '/register'},
]

export const router = createRouter(routes, {
    defaultRoute: ROUTE_NAME_MAIN
})

export const navigateTo = routeName => {
    return router.navigate(routeName);
}

