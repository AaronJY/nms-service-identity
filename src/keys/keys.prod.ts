import Keys from "./keys";

export const ProductionKeys: Keys = {
    ApiHttpPort: parseInt(process.env.API_HTTP_PORT),
    IdentityDbConnectionString: process.env.IMAGE_DB_CONNECTION_STRING,
    JWTSigningKey: process.env.JWT_SIGNING_KEY
};