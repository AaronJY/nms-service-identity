export class AuthResult {
    accessToken: string;
    user: string;
    issueDate: Date;
    expiryDate: Date;

    constructor(accessToken: string, user: string, expiryDate: Date) {
        this.accessToken = `Bearer ${accessToken}`;
        this.user = user;
        this.expiryDate = expiryDate;
        this.issueDate = new Date();
    }
}