import TermDto from "../../../../shared/src/@types/api/TermDto";
import Term from "../../@types/domain/Term";
export default function toDto(term: Term): TermDto {
    return {
        setId: term.setId,
        expressionImage: term.expressionImage,
        expression: term.expression,
        translationImage: term.translationImage,
        translation: term.translationImage,
        id: term.id
    }
}