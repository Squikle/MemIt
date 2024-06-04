import User from "../../@types/domain/User";
import UserDto from "@shared/@types/dto/UserDto";

export function toDomain(dto: UserDto): User {
    return new User(dto.email, dto.password);
}