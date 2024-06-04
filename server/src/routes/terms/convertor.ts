import TermDto from "../../../../shared/src/@types/api/TermDto";
import Term from "../../@types/domain/Term";
import {generateId} from "../../utils/generateId";
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
        generateId(), // todo: take from dto but objectId
        generateId(),
        dto.expression,
        dto.expressionImage,
        dto.translation,
        dto.translationImage);
}