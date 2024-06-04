import Term from "../../@types/domain/Term";
import TermDto from "@shared/@types/dto/TermDto";

export function toDto(term: Term): TermDto {
    return {
        setId: term.setId,
        expressionImage: term.expressionImage,
        expression: term.expression,
        translationImage: term.translationImage,
        translation: term.translationImage,
        id: term.id
    }
}
export function toDomain(dto: TermDto): Term {
    return new Term(
        dto.id,
        dto.setId,
        dto.expression,
        dto.expressionImage,
        dto.translation,
        dto.translationImage);
}