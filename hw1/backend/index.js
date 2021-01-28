import {Application} from "./app.mjs";

import {params} from './config.mjs';


let app = new Application();
app.expressApp.listen(params.port, params.host, function () {
    console.log(`App listening at port ${params.port}`);
});
