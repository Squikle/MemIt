import TermDto from "@shared/@types/dto/TermDto";

type Term = {
    id: string;
    expression?: string;
    expressionImage?: string;
    translation?: string;
    translationImage?: string;
    setId: string;
    isNew: boolean;
}
export default Term;

export function toDto(term: Term): TermDto {
    return {
        id: term.id,
        setId: term.setId,
        expression: term.expression,
        expressionImage: term.expressionImage,
        translation: term.translation,
        translationImage: term.translationImage
    }
}

export function toDomain(dto: TermDto): Term {
    return {
        id: dto.id,
        setId: dto.setId,
        expression: dto.expression,
        expressionImage: dto.expressionImage,
        translation: dto.translation,
        translationImage: dto.translationImage,
        isNew: false
    }
}