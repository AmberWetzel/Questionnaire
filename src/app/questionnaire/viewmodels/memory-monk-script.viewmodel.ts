import { Injectable } from "@angular/core";
import { AnswerTypes } from "src/app/models/answer-types.model";
import { question, scriptItem } from "src/app/models/question.model";
import { baseScriptViewmodel } from "./baseScript.viewmodel";

@Injectable({
    providedIn: 'root'
  })
  export class MemoryMonkScriptViewModel implements baseScriptViewmodel {

    private questionIndex: number = 0;
    public name: string = ""; //will be set in question 0, used to label the data

    public questionList: question[] = [
      {
          prompt: "What is your name?",
          answerType: AnswerTypes.freeResponse,
          answer: undefined,
          next: () => {}
      },
      {
          prompt: this.name + "The record of past questions and answers is above. Is it correct?",
          answerType: AnswerTypes.multiChoice,
          answerChoices: ["Yes", "No"],
          answer: undefined,
          next: () => {}
      },
  ];

    public currentQuestion: question = this.questionList[0];;
    public finished = false;

    private branchedNegative: boolean = false;
    private positiveBranch: question[] = []; //TODO: create!!
    private negativeBranch: question[] = [{ prompt: "Then let's do it again.", answerType: AnswerTypes.noResponse, next: () => {}}];

      public nextQuestion() {
          switch (this.questionIndex) {
              case 0: //set name
                this.name = this.questionList[0].answer!;
                this.increaseIndex();
              break;
              case 1: //is the name correct
                if (this.currentQuestion.answer == "No") {
                  this.questionList = this.questionList.concat(this.negativeBranch);
                    this.branchedNegative = true;
                    this.increaseIndex();
                    break;
                } else {
                  this.questionList = this.questionList.concat(this.positiveBranch);
                    this.increaseIndex();
                    break;
                }
                
              case 2:
                  if (this.branchedNegative) {
                    this.questionList = this.questionList.slice(0,2); //remove negative branch
                    this.questionIndex = 0;
                    this.currentQuestion = this.questionList[0]; //redo the first question
                    this.branchedNegative = false; //since we have reverted
                    break;
                  } else {
                    this.increaseIndex();
                    break;
                  }

              default:
                  this.increaseIndex();
          }

      }

      private increaseIndex() {
        this.questionIndex++;
        this.currentQuestion = this.questionList[this.questionIndex];
      }

  }