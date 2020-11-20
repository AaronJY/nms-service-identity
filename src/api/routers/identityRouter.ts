import express, { Router, Request, Response, NextFunction } from "express";
import { Authentication } from "../models/authentication";
import { JWTService } from "../../services/jwtService";
import { AuthResult } from "../models/authResult";
import moment from "moment";
import { NewIdentity } from "../models/newIdentity";
import { IdentityRepo } from "../../data/identityRepo";
import { Identity } from "../../data/models/identityModel";
import { HashService } from "../../services/hashService";
import { Mongoose } from "mongoose";

const router: Router = express.Router();

router.post('/authenticate', (req: Request, resp: Response, next: NextFunction) => {
    const auth = req.body as Authentication;

    // TODO: Read from database
    if (auth.username === 'aaron' && auth.password == "password") {
        const payload: object = {
            sub: auth.username,
            name: 'Aaron Yarborough'
        };
        
        JWTService.create(payload)
            .then(token => {
                const expiryDate = moment().add(7, 'days').toDate(); // TODO: Read from appConfig constant
                return new AuthResult(token, auth.username, expiryDate);
            })
            .then(authResult => resp.status(200).send(authResult))
            .catch(err => next(err));
    } else {
        resp.status(401).send();
    }
});

router.post('/verifyjwt', (req: Request, resp: Response, next: NextFunction) => {
    JWTService.verify((req.body.token as string).substring("Bearer ".length));
    resp.status(200).send();
});

router.post('/register', async (req: Request, resp: Response, next: NextFunction) => {

    try {
        const newIdentity: NewIdentity = req.body;

        if (await IdentityRepo.usernameExists(newIdentity.username)) {
            return resp.send(409).send('Username already exists.');
        }

        const doc = {
            username: newIdentity.username,
            password: await HashService.hash(newIdentity.password)
        };



    } catch (error: any) {
        next(error);
    }
});

export default router;