import User from "../../@types/domain/User";
import UserDto from "@shared/@types/dto/UserDto";

export function toDomain(dto: UserDto): User {
    return User.createNew(dto.email, dto.password);
}