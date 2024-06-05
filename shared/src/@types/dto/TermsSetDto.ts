import TermsSetAccessDto from "./TermsSetAccessDto";

type TermsSetDto = {
    id: string,
    name: string,
    termsCount?: number,
    access: TermsSetAccessDto[]
}
export default TermsSetDto;
