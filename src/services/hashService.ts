import bcrypt from 'bcrypt';

export class HashService {
    static hash(str: string, saltSize: number = 8) {
        return bcrypt.hash(str, saltSize);
    }
}
