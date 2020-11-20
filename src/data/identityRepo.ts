import { ObjectID } from "mongodb";
import identityModel, { Identity } from "./models/identityModel";

export class IdentityRepo {
    static async getByUsername(username: string): Promise<Identity> {
        return identityModel.findOne({ username: username });
    }
    
    static async get(id: ObjectID): Promise<Identity> {
        return identityModel.findById(id);
    }
    
    static async usernameExists(username: string): Promise<boolean> {
        return identityModel.exists({ username: username });
    }

    static async add(identity: Identity): Promise<Identity> {
        return identity.save();
    }
}