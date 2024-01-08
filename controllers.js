import {getJobList, getUserDetails, createNewUser, getUserByEmail} from './db.js';
import {admin} from './firebase-config.js';

export async function getUserJobs(email) {
    const users = await getUserByEmail(email);
    if(users.length == 0){
        return "No user found";
    } 
    let userDetails = users[0];
    const jobList = await getJobList(userDetails.seniority, userDetails.hardskill, userDetails.role);
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
        return result;
    } catch (error) {
        console.log(error)
       return error 
    }
}
