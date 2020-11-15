import bcrypt from 'bcrypt';

export function hash(str: string, saltSize: number = 8) {
    return bcrypt.hash(str, saltSize);
}