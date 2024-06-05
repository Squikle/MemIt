import {generateId} from "@shared/utils";
import AccessLevel from "../../../../shared/src/@types/domain/AccessLevel";

export class TermsSetAccess {
    id: string;
    userId: string;
    termsSetId: string;
    access: AccessLevel;

    constructor(id: string, userId: string, termsSetId: string, access: AccessLevel) {
        this.id = id;
        this.userId = userId;
        this.termsSetId = termsSetId;
        this.access = access;
    }

    public static createNew(userId: string, termsSetId: string, access: AccessLevel) {
        return new this(generateId(), userId, termsSetId, access);
    }

    public static createFromExisting(id: string, userId: string, termsSetId: string, access: AccessLevel) {
        return new this(id, userId, termsSetId, access);
    }
}

class TermsSet {
    id: string;
    name: string;
    termsCount?: number;
    access: TermsSetAccess[];

    constructor(id: string, name: string, termsCount: number, access: TermsSetAccess[]) {
        this.id = id;
        this.name = name;
        this.termsCount = termsCount;
        this.access = access;
    }

    public static createNew(name: string)
    {
        return new this(generateId(), name, 0, []);
    }

    public static createFromExisting(id: string, name: string, termsCount: number, access: TermsSetAccess[])
    {
        return new this(id, name, termsCount, access);
    }

    public withAccess(access: TermsSetAccess[]) {
        this.access = access
    }
}
export default TermsSet;