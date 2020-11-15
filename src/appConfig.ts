import Keys from "./keys/keys";
import { DevelopmentKeys } from "./keys/keys.dev";
import { ProductionKeys } from "./keys/keys.prod";

const keys: Keys = process.env.NODE_ENV === 'production' ? ProductionKeys : DevelopmentKeys;

export default {
    envVars: keys,
    constants: {
        JWTAudience: 'https://localhost',
        JWTIssuer: 'https://localhost',
        JWTExpiry: '7d'
    }
};