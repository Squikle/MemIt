import {generateId} from "../../utils/generateId";

class TermsSet {
    id: string;
    name: string;
    termsCount?: number;

    constructor(id: string, name: string, termsCount: number) {
        this.id = id;
        this.name = name;
        this.termsCount = termsCount;
    }

    public static createNew(name: string)
    {
        return new this(generateId(), name, 0);
    }

    public static createFromExisting(id: string, name: string)
    {
        return new this(id, name, 0);
    }
}
export default TermsSet;