class Term {
    id: string;
    expression?: string;
    expressionImage?: string;
    translation?: string;
    translationImage?: string;
    setId: string;

    constructor(id: string, setId: string) {
        this.id = id;
        this.setId = setId;
    }
}
export default Term;