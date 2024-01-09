//boilerplate for a express server
import express from 'express';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getUserJobs,createUser, applyToJob, userAppliedJobs } from './controllers.js';
import cors from 'cors';
import { DecodeTokenMiddleware } from './middleware.js';
import bodyParser from 'body-parser';
const port = 8080;

const app = express();
app.use(bodyParser.json());
app.use(cors());
//turn off to test locally

app.use(DecodeTokenMiddleware);


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

app.post('/applyToJob', async (req, res) => {
    try {
        let result = await applyToJob(req.body.userId, req.body.jobId)
        res.send(result);
    } catch (error) {
        console.log(error)
        res.send(error);
    } 
}
)

app.get('/userAppliedJobs/:userid', async (req, res) => {
    //TODO: implement
    try {
        let result = await userAppliedJobs(req.body.userId)
        res.send(result);
    } catch (error) {
        console.log(error)
        res.send(error);
    }
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
}
);

