import {admin} from './firebase-config.js';

export async function DecodeTokenMiddleware(req, res, next) {
    try {
        const idToken = req.headers.authorization.split(' ')[1];
        const decodeValue = admin.auth().verifyIdToken(idToken);
    if (decodeValue) {
        return next();

    }
    else {
        res.status(401).send("Unauthorized");
    }

    } catch (error) {
        res.status(400).send("auth error");
    }
    
}
