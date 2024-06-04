import TermsSet from "../../@types/domain/TermsSet";
import TermsSetDto from "../../@types/dto/TermsSetDto";

export function toDto(termSet: TermsSet): TermsSetDto {
    return {
        id: termSet.id,
        name: termSet.name,
        termsCount: termSet.termsCount || 0
    }
}

export function toDomain(dto: TermsSetDto): TermsSet {
    return TermsSet.createFromExisting(dto.id, dto.name);
}