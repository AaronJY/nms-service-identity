import appConfig from '../appConfig';
import * as jsonwebtoken from "jsonwebtoken";

export class JWTService {
    static create(payload: object): Promise<string> {
        return new Promise((resolve, reject: any) => {
            jsonwebtoken.sign(payload, appConfig.envVars.JWTSigningKey, {
                audience: appConfig.constants.JWTAudience,
                expiresIn: appConfig.constants.JWTExpiry,
                issuer: appConfig.constants.JWTIssuer
            }, (err: Error, encoded: string) => {
                err ? reject(err) : resolve(encoded);
            });
        });
    }

    static verify(token: string): boolean {
        console.log(`Verifying ${token}`);
        console.log(jsonwebtoken.verify(token, appConfig.envVars.JWTSigningKey, {
            audience: appConfig.constants.JWTAudience,
            issuer: appConfig.constants.JWTIssuer
        }));

        return true;
    }
}