import {generateId} from "../../utils/generateId";

class Term {
    id: string;
    expression?: string;
    expressionImage?: string;
    translation?: string;
    translationImage?: string;
    setId: string;

    constructor(
        id: string,
        setId: string,
        expression?: string,
        expressionImage?: string,
        translation?: string,
        translationImage?: string)
    {
        this.id = id;
        this.setId = setId;
        this.expression = expression;
        this.expressionImage = expressionImage;
        this.translation = translation;
        this.translationImage = translationImage;
    }

    public static createNew(
        setId: string,
        expression?: string,
        expressionImage?: string,
        translation?: string,
        translationImage?: string)
    {
        return new this(generateId(), setId, expression, expressionImage, translation, translationImage);
    }
}
export default Term;