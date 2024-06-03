import TermSetDto from "../../../../shared/src/@types/api/TermSetDto";
import TermSet from "../../@types/TermSet";

export default function toDto(termSet: TermSet): TermSetDto {
    return {
        id: termSet.id,
        name: termSet.name,
        termsCount: termSet.termsCount || 0
    }
}