import { Injectable } from "@angular/core";
import { AnswerTypes } from "src/app/models/answer-types.model";
import { question } from "src/app/models/question.model";
import { baseScriptViewmodel } from "./baseScript.viewmodel";

@Injectable({
    providedIn: 'root'
  })
  export class TutorialScriptViewModel implements baseScriptViewmodel {

    public questionList: question[] = [
      {
          prompt: "What is your name?",
          answerType: AnswerTypes.freeResponse,
          answer: undefined,
          next: () => {
            this.name = this.currentQuestion.answer!;

            this.questionList = this.questionList.concat({
              prompt: `Your name is ${this.name}, is that correct?`,
              answerType: AnswerTypes.multiChoice,
              answerChoices: ["Yes", "No"],
              answer: undefined,
              next: () => {
                if (this.currentQuestion.answer == "No") {
                  this.questionList = this.questionList.concat(this.negativeBranch);
              } else {
                  this.questionList = this.questionList.concat(this.positiveBranch);
                  this.finished = true;
              }
              this.increaseIndex();
              }
            });

            this.increaseIndex();
          }
      }
    ];

    private negativeBranch: question = {
      prompt: "Then let's do it again.",
      answerType: AnswerTypes.noResponse,
      next: () => {
        this.questionList = this.questionList.slice(0,1); //remove negative branch and previously generated question 2
        this.questionIndex = 0;
        this.currentQuestion = this.questionList[0]; //redo the first question
      }
    };

    private positiveBranch: question = {
      prompt: "Perfect. And now we've used all question types and branching. You're done!",
      answerType: AnswerTypes.noResponse,
      next: () => {} //finished, no need to do anything
    };

    public name: string = ""; //will be set in question 0, used to label the data
    public finished = false;
    public currentQuestion: question = this.questionList[0];
    private questionIndex: number = 0;

    public nextQuestion() {
      this.currentQuestion.next();
    }

    private increaseIndex() {
      this.questionIndex++;
      this.currentQuestion = this.questionList[this.questionIndex];
    }

}