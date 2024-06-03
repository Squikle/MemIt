import {createHash} from "node:crypto";
import {generateId} from "../../utils/generateId";

class User {
    id: string;
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.id = generateId();
        this.email = email;
        this.password = this.hashPassword(password);
    }

    private hashPassword(password: string) {
        return createHash("sha256").update(password).digest("hex");
    }
}
export default User;