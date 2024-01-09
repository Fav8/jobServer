import {getJobList, getUserDetails, createNewUser, getUserByEmail, applyJob, getJobById, getUserAppliedJobs, createNewQuery} from './db.js';
import {admin} from './firebase-config.js';

export async function getUserJobs(userId) {
    const users = await getUserDetails(userId);
    if(users.length == 0){
        return "No user found";
    } 
    let userDetails = users[0];
    const jobList = await getJobList(userDetails.seniority, userDetails.hardskill, userDetails.role, userId);
    return jobList;
}

export async function createUser(email, password, seniority, hardskill, role, name) {
    try {
        const users = await getUserByEmail(email);
        if(users.length != 0){
            return "User already exists";
        }
        const {uid} = await admin.auth().createUser({
            email,
            password,
        });
        const result = await createNewUser(uid, seniority, hardskill, role, email, name);
        const newQuery = await createNewQuery(seniority, hardskill, role);
        return result;
    } catch (error) {
        console.log(error)
       return error 
    }
}

export async function applyToJob(userId, jobId) {
    try {
        const users = await getUserDetails(userId);
        if(users.length == 0){
            return "No user found";
        } 
        let userDetails = users[0];
        const jobList = await getJobById(jobId);
        if(jobList.length == 0){
            return "No jobs found";
        } 
        const result = await applyJob(userId, jobId);
        return result;
    } catch (error) {
        console.log(error)
       return error 
    }
}

export async function userAppliedJobs(userId) {
    try {
        const jobs = await getUserAppliedJobs(userId);
        return jobs;
    } catch (error) {
        console.log(error)
       return error 
    }
}

export async function getUsers() {
    try {
        const users = await getAllUsers();
        return users;
    } catch (error) {
        console.log(error)
       return error 
    }
}