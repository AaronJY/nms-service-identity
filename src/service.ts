import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import appConfig from './appConfig';
import AuthenticationRouter from './api/routers/authenticationRouter';

export class IdentityService {
    private api: express.Express;
    constructor() {
        this.api = express();
        this.api.use(bodyParser.json());
        this.api.use('/api/v1/authentication', AuthenticationRouter);
    }

    async start(): Promise<any> {
        console.log('Starting...');
        console.log(appConfig.envVars);
        console.log(appConfig.constants);

        return this.connectToDatabase()
            .then(() => this.api.listen(
                appConfig.envVars.ApiHttpPort,
                () => console.log(`Identity service now listening on port ${appConfig.envVars.ApiHttpPort}`)
            ))
            .catch(err => console.error(err));
    }

    private async connectToDatabase(): Promise<void> {
        await mongoose.connect(appConfig.envVars.IdentityDbConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`Connected to MongoDB @ ${appConfig.envVars.IdentityDbConnectionString}`);
    }
}