import Keys from "./keys";

export const DevelopmentKeys: Keys = {
    ApiHttpPort: 5002,
    IdentityDbConnectionString: 'mongodb://localhost:5003/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&3t.uriVersion=3&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true',
    JWTSigningKey: 'SUPER SECRET FOX'
}