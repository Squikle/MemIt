import TermSetDto from "../../../../shared/src/@types/api/TermSetDto";
import TermsSet from "../../@types/domain/TermsSet";

export default function toDto(termSet: TermsSet): TermSetDto {
    return {
        id: termSet.id,
        name: termSet.name,
        termsCount: termSet.termsCount || 0
    }
}