//boilerplate for a express server
import express from 'express';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { checkIfQueryExists } from './db.js';
import { getUserJobs,createUser } from './controllers.js';
import cors from 'cors';
import { DecodeTokenMiddleware } from './middleware.js';
import bodyParser from 'body-parser';
const port = 8080;

const app = express();
app.use(bodyParser.json());
app.use(cors());
//turn off to test locally
//app.use(DecodeTokenMiddleware);



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

app.post('/createUser', async (req, res) => {
    
    try {
        let result = await createUser(req.body.email, req.body.password, req.body.seniority, req.body.hardskill, req.body.role, req.body.name)
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

