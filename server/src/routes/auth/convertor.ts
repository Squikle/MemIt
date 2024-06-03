import {UserDto} from "../../@types/dto/UserDto";
import User from "../../@types/domain/User";

export function toDomain(dto: UserDto): User {
    return new User(dto.email, dto.password);
}