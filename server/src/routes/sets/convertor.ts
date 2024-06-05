import TermsSet, {TermsSetAccess} from "../../@types/domain/TermsSet";
import TermsSetDto from "@shared/@types/dto/TermsSetDto";
import TermsSetAccessDto from "@shared/@types/dto/TermsSetAccessDto";

export function toDto(termsSet: TermsSet): TermsSetDto {
    return {
        id: termsSet.id,
        name: termsSet.name,
        termsCount: termsSet.termsCount || 0,
        access: termsSet.access.map(x => accessToDto(x))
    }
}

function accessToDto(termsSetAccess: TermsSetAccess): TermsSetAccessDto {
    return {
        access: termsSetAccess.access,
        userId: termsSetAccess.userId,
    }
}

export function toDomain(dto: TermsSetDto, userId: string): TermsSet {
    const newSet = TermsSet.createNew(dto.name);
    const access = TermsSetAccess.createNew(userId, newSet.id, "ReadWrite");
    newSet.withAccess([access]);
    return newSet;
}