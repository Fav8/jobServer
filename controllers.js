import e from 'express';
import {getJobList, getUserDetails, createNewUser} from './db.js';

export async function getUserJobs(userId) {
    const users = await getUserDetails(userId);
    if(users.length == 0){
        return "No user found";
    } 
    let userDetails = users[0];
    const jobList = await getJobList(userDetails.seniority, userDetails.hardskill, userDetails.role);
    return jobList;
}

export async function createUser(userId, seniority, hardskill, role) {
    const users = await getUserDetails(userId);
    if(users.length != 0){
        return "User already exists";
    } 
    const result = await createNewUser(userId, seniority, hardskill, role);
    return result;
    
}