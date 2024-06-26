import { ObjectId } from "bson"


export function generateId() {
    return new ObjectId().toString();
}

export function toObjectId(id: string) {
    return new ObjectId(id);
}