import { AnswerTypes } from "./answer-types.model";

export class question {
    prompt: string = ""; //question texts
    answerType: AnswerTypes = AnswerTypes.freeResponse; //defaults to free response
    answerChoices?: string[]; //if multiple choice, choices
    answer?: string;

    next(): void {}
}

export class scriptItem {
    prompt: string = ""; //question texts
    answer?: string = ""; //text representation of answer
}