import express, { Router, Request, Response, NextFunction } from "express";
import { Authentication } from "../models/authentication";
import appConfig from '../../appConfig';
import { JWTService } from "../../services/jwtService";
import { AuthResult } from "../models/authResult";
import moment from "moment";

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

export default router;