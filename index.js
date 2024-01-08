//boilerplate for a express server
import express from 'express';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { checkIfQueryExists } from './db.js';
import { getUserJobs } from './controllers.js';
import cors from 'cors';
import { DecodeTokenMiddleware } from './middleware.js';
const port = 8080;

const app = express();
app.use(cors());
app.use(DecodeTokenMiddleware);



app.get('/test', (req, res) => {
    res.send('Hello World!');
});

app.get('/checkIfQueryExists', (req, res) => {
    res.send(checkIfQueryExists(req.query.seniority, req.query.hardskill, req.query.role));
}
)

app.get('/userJobs/:userid', async (req, res) => {
        try {
            let result = await getUserJobs(req.params.userid)
            res.send(result);
        } catch (error) {
            console.log(error)
            res.send(error);
        }
    }
)

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
}
);

