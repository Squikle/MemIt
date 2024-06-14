import {createHash} from "node:crypto";
import {generateId} from "@shared/utils";

class User {
    id: string;
    email: string;
    password: string;

    constructor(id: string, email: string, password: string) {
        this.id = id;
        this.email = email;
        this.password = this.hashPassword(password);
    }

    public static fromExisting(id: string, email: string, password: string) {
        return new User(id, email, password);
    }

    public static createNew(email: string, password: string) {
        return new User(generateId(), email, password);
    }

    private hashPassword(password: string) {
        return createHash("sha256").update(password).digest("hex");
    }
}
export default User;