// export the connection to the mysql database

import mysql from 'mysql2';
import 'dotenv/config'

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'jobScraper'
});
 

const getUserDetails = (userId) =>{
    if (userId == null) {
        return "Missing parameters";
    }
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT seniority, role, hardskill from users where userId = "${userId}"`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

const getJobList = async function (seniority, hardskill, role) {

    if (seniority == null || hardskill == null || role == null) {
        return "Missing parameters";
    }
    return new Promise((resolve, reject)=>{
            pool.query(`SELECT * from savedJobs where seniority = "${seniority}" AND hardskill = "${hardskill}" AND role = "${role}"`,  (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    }

//methods
const checkIfQueryExists = function (seniority, hardskill, role) {

    if (seniority == null || hardskill == null || role == null) {
        return "Missing parameters";
    }
    connection.query(`SELECT * from jobQueries where seniority = "${seniority}" AND hardskill = "${hardskill}" AND role = "${role}"`, function (error, results, fields) {
        if (error) {
            console.log("error: " + error)
            throw error;
        }
        if (results.length == 0) {
            connection.query(`INSERT INTO jobQueries (seniority, hardskill, role) VALUES ("${seniority}", "${hardskill}", "${role}")`, function (error, results, fields) {
                if (error) throw error;
                else {
                    return "Query inserted";
                }
            });
        } else {
          return "Query already exists";
        }
    });
  }

const createNewUser = function (userId, seniority, hardskill, role, email, name) {
    if (userId == null || seniority == null || hardskill == null || role == null || email == null || name == null) {
        return "Missing parameters";
    }
    return new Promise((resolve, reject)=>{
        pool.query(`INSERT INTO users (userId, seniority, hardskill, role, email, name) VALUES ("${userId}", "${seniority}", "${hardskill}", "${role}", "${email}", "${name}")`, function (error, elements) {
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const getUserByEmail = function (email) {
    
    return new Promise((resolve, reject)=>{
        
        pool.query(`SELECT * from users where email = "${email}"`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            if (email == null) {
                return reject("Missing parameters");
            }
            return resolve(elements);
        });
    });
}

const applyJob = function (userId, jobId) {
    if (userId == null || jobId == null) {
        return "Missing parameters";
    }
    return new Promise((resolve, reject)=>{
        pool.query(`INSERT INTO userAppliedJobs (userId, jobId) VALUES ("${userId}", "${jobId}")`, function (error, elements) {
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}

const getJobById = function (jobId) {

    if (jobId == null) {
        return "Missing parameters";
    }
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT * from savedJobs where jobId = "${jobId}"`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });

}

export {checkIfQueryExists, getUserDetails, getJobList, createNewUser, getUserByEmail ,applyJob, getJobById};