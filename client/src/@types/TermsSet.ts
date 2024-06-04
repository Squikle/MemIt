import TermsSetDto from "@shared/@types/dto/TermsSetDto";

type TermsSet = {
    id: string,
    name: string,
    termsCount?: number
}
export default TermsSet;

export function toDto(termsSet: TermsSet): TermsSetDto {
    return {
        id: termsSet.id,
        name: termsSet.name
    }
}

export function toDomain(dto: TermsSetDto): TermsSet {
    return {
        id: dto.id,
        name: dto.name,
        termsCount: dto.termsCount
    }
}