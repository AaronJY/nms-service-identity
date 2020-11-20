import mongoose, { Schema, Document } from 'mongoose';

export interface Identity extends Document {
    username: string;
    password: string;
    createDate: Date;
}

const IdentitySchema: Schema = new Schema({
    username: { tyepe: String, required: true },
    password: { tyepe: String, required: true },
    createDate: { type: Date, required: true, default: Date()},
}, { collection: 'identities' });

export default mongoose.model<Identity>('MediaItem', IdentitySchema);