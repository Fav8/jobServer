import {admin} from './firebase-config.js';

export async function DecodeTokenMiddleware(req, res, next) {
    try {
        let idToken = req.headers.authorization.split(' ')[1]
        let decodedToken = await admin.getAuth().verifyIdToken(idToken)
        if (!decodedToken) {
            res.status(401)
            res.send('Unauthorized')
        } else{
            next()
        }
      } catch (error) {
        console.log(error)
        res.status(401)
      }
}
