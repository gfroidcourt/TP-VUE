import express from 'express';
import router from './api/routes';

import cors from 'cors';
import { json } from 'body-parser';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(json());
app.use(router);

app.listen(PORT, (error?: any) => {
    if (!error)
        console.log(`Server is Successfully Running, and App is
                      listening on port `+ PORT)
    else
        console.log("Error occurred, server can't start", error);
});
