import { question } from "src/app/models/question.model";


  export interface baseScriptViewmodel {
    //TODO: make abstract class with private questionIndex and default implimentation for name question

    //Variables
    questionList: question[];
    currentQuestion: question;
    finished: boolean;
    name?: string; //not required, but highly reccomended for the standard use case


    //Methods
    next(): void; // this method will increment the index and handle logic such as branching answers

  }