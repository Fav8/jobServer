// export the connection to the mysql database

import mysql from 'mysql';
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

const createNewUser = function (userId, seniority, hardskill, role) {
    if (userId == null || seniority == null || hardskill == null || role == null) {
        return "Missing parameters";
    }
    connection.query(`INSERT INTO users (userId, seniority, hardskill, role) VALUES ("${userId}", "${seniority}", "${hardskill}", "${role}")`, function (error, results, fields) {
        if (error) throw error;
        else {
            return "User inserted";
        }
    });
}



export {checkIfQueryExists, getUserDetails, getJobList, createNewUser};