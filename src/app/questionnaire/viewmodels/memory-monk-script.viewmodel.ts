import { Injectable } from "@angular/core";
import { AnswerTypes } from "src/app/models/answer-types.model";
import { question } from "src/app/models/question.model";
import { baseScriptViewmodel } from "./baseScript.viewmodel";

@Injectable({
    providedIn: 'root'
  })
  export class MemoryMonkScriptViewModel implements baseScriptViewmodel {

    private questionIndex: number = 0;
    public finished = false;
    public name: string = ""; //will be set in question 5, used to label the data

    private anything_answer!: boolean;
    private contradiction = false;


    public questionList: question[] = [
      {
          prompt: "This script was written by July Spector-Bishop and adapted with permission by Amber Wetzel. Others are free to use or adapt this program for their own DnD groups or other personal use with credit.",
          answerType: AnswerTypes.noResponse,
          next: () => { this.increaseIndex(); }
      },
      {
          prompt: "With that said, get into character, and onto the Dnd...",
          answerType: AnswerTypes.noResponse,
          next: () => { this.increaseIndex(); }
      },
      {
        prompt: "...",
        answerType: AnswerTypes.noResponse,
        next: () => { this.increaseIndex(); }
      },
      {
        prompt: "As soon as you touch the sphere you can no longer sense anything, you are in a blank black space.  A voice asks you...",
        answerType: AnswerTypes.noResponse,
        next: () => { this.increaseIndex(); }
      },
      {
        prompt: `"What is your name?"`,
        answerType: AnswerTypes.freeResponse,
        answer: undefined,
        next: () => {
          this.name = this.currentQuestion.answer!;

          this.questionList = this.questionList.concat({
              prompt: `"Your name is ${this.name}?"`,
              answerType: AnswerTypes.multiChoice,
              answerChoices: ["Yes", "No"],
              answer: undefined,
              next: () => {
                if (this.currentQuestion.answer == "No") {
                  this.questionList[(this.questionIndex-1)].prompt = `"Then correct yourself. What is your name?"`;
                  this.questionList = this.questionList.slice(0,this.questionIndex);
                  this.questionIndex--;
                  this.currentQuestion = this.questionList[this.questionIndex];
              } else {
                  this.questionList = this.questionList.concat({
                    prompt: `"Hello, ${this.name}."`,
                    answerType: AnswerTypes.noResponse,
                    next: () => {
                      this.questionList = this.questionList.concat(this.baseQuestionsContinued);
                      this.increaseIndex();
                    }
                  });
                  this.increaseIndex();
                }
              }
            });
            this.increaseIndex();
          }
      },
    ];

    private baseQuestionsContinued: question[] = [
      {
        prompt: `"What is your quest?"`,
        answerType: AnswerTypes.freeResponse,
        answer: undefined,
        next: () => { this.increaseIndex(); }
      },
      {
        prompt: `"What is your favorite color?"`,
        answerType: AnswerTypes.freeResponse,
        answer: undefined,
        next: () => { this.increaseIndex(); }
      },
      {
        prompt: `"What's the name of the person who matters most to you in the entire world?"`,
        answerType: AnswerTypes.freeResponse,
        answer: undefined,
        next: () => { this.increaseIndex(); }
      },
      {
        prompt: `"What do you know is true without a doubt?"`,
        answerType: AnswerTypes.freeResponse,
        answer: undefined,
        next: () => { this.increaseIndex(); }
      },
      {
        prompt: `"Are you sure?"`,
        answerType: AnswerTypes.freeResponse,
        answer: undefined,
        next: () => { this.increaseIndex(); }
      },
      {
        prompt: `"What do you really know about the quest you mentioned earlier?"`,
        answerType: AnswerTypes.freeResponse,
        answer: undefined,
        next: () => { this.increaseIndex(); }
      },
      {
        prompt: `"Are you willing to do anything to succeed on your quest?"`,
        answerType: AnswerTypes.multiChoice,
        answerChoices: ["Yes", "No"],
        answer: undefined,
        next: () => {
          if (this.currentQuestion.answer == "Yes") {
            this.anything_answer = true;
            this.questionList = this.questionList.concat({
              prompt: `"Even hurt the person you care for most?"`,
              answerType: AnswerTypes.multiChoice,
              answerChoices: ["Yes", "No"],
              answer: undefined,
              next: () => {
                if (this.currentQuestion.answer == "No") {
                  this.contradiction = true;
                  this.questionList = this.questionList.concat({
                    prompt: `"Hmmmm your answers are contradictory, you seem unsure of where you stand..."`,
                    answerType: AnswerTypes.noResponse,
                    next: () => {
                        this.questionList = this.questionList.concat(this.dietyQuestion);
                        this.increaseIndex();
                    }
                  });
                } else {
                  this.questionList = this.questionList.concat(this.dietyQuestion);
                }
              this.increaseIndex();
              }
            });
          } else {
            this.anything_answer = false;
            this.questionList = this.questionList.concat(this.dietyQuestion);
          }
          this.increaseIndex();
         }
      },
    ];

    private dietyQuestion: question[] = [
      {
        prompt: `"Is there a deity who you follow?"`,
        answerType: AnswerTypes.multiChoice,
        answerChoices: ["Yes", "No"],
        answer: undefined,
        next: () => {
          if (this.currentQuestion.answer == "Yes") {
            this.questionList = this.questionList.concat(this.religionQuestions);
          } else {
            if (this.contradiction || !this.anything_answer) {
              this.questionList = this.questionList.concat({
                prompt: `"If you aren't willing to do anything for your goals, and aren't commited to following a deity, then what do you even stand for?"`,
                answerType: AnswerTypes.freeResponse,
                answer: undefined,
                next: () => {
                  this.questionList = this.questionList.concat(this.conclusion);
                  this.increaseIndex();
                }
              });
            } else {
              this.questionList = this.questionList.concat({
                prompt: `"As a mere mortal, where do you get off having such strong convictions?"`,
                answerType: AnswerTypes.freeResponse,
                answer: undefined,
                next: () => {
                  this.questionList = this.questionList.concat(this.conclusion);
                  this.increaseIndex();
                }
              });
            }
          }
          this.increaseIndex();
        }
      },
    ];

    private religionQuestions: question[] = [
      {
        prompt: `"Do you trust them? Why or why not?"`,
        answerType: AnswerTypes.freeResponse,
        answer: undefined,
        next: () => { this.increaseIndex(); }
      },
      {
        prompt: `"Do you beleive you have a moral obligation to obey them?"`,
        answerType: AnswerTypes.multiChoice,
        answerChoices: ["Yes", "No"],
        answer: undefined,
        next: () => {
          if (this.currentQuestion.answer == "Yes") {
            if (this.contradiction || !this.anything_answer) {
              this.questionList = this.questionList.concat({
                prompt: `"If you beleive you should follow your deity but aren't willing to do anything for them in this quest then what good are you as a follower?"`,
                answerType: AnswerTypes.freeResponse,
                answer: undefined,
                next: () => {
                  this.questionList = this.questionList.concat(this.conclusion);
                  this.increaseIndex();
                }
              });
            } else {
              this.questionList = this.questionList.concat({
                prompt: `"What if your deity told you to hurt the person you cared for most?"`,
                answerType: AnswerTypes.freeResponse,
                answer: undefined,
                next: () => {
                    this.questionList = this.questionList.concat(this.conclusion);
                    this.increaseIndex();
                }
              });
            }
          } else {
            this.questionList = this.questionList.concat(this.notObligatedBranch);
          }
          this.increaseIndex();
        }
      },
    ];

    private notObligatedBranch: question[] = [
      {
        prompt: `"What good are you as a follower then?"`,
        answerType: AnswerTypes.noResponse,
        next: () => {
          if (this.contradiction || !this.anything_answer) {
            this.questionList = this.questionList.concat({
              prompt: `"If you aren't willing to do anything for your goals, and aren't willing to follow your diety, then what do you even stand for?"`,
              answerType: AnswerTypes.freeResponse,
              answer: undefined,
              next: () => {
                  this.questionList = this.questionList.concat(this.conclusion);
                  this.increaseIndex();
              }
            });
          } else {
            this.questionList = this.questionList.concat({
              prompt: `"Hmmm seems like you are willing to do anything for your quest, but you aren't willing to do anything for your deity. Doesn't that imply that you think you know better than them? Doesn't that mean you are more confident in your own judgement than the judgement of a cosmic being you supposedly follow?"`,
              answerType: AnswerTypes.freeResponse,
              answer: undefined,
              next: () => {
                  this.questionList = this.questionList.concat(this.conclusion);
                  this.increaseIndex();
              }
            });
          }
          this.increaseIndex();
        }
      },
    ];

    private conclusion: question[] = [
      {
        prompt: `"Care to revise any of your answers having thought about it more?"`,
        answerType: AnswerTypes.freeResponse,
        answer: undefined,
        next: () => {
          this.increaseIndex();
        }
      },
      {
        prompt: `"Interesting..."`,
        answerType: AnswerTypes.noResponse,
        next: () => {
          this.increaseIndex();
        }
      },
      {
        prompt: `The blackness fades and you can see the room again. This portion of the test is finished.`,
        answerType: AnswerTypes.noResponse,
        next: () => {
          this.finished = true;
        }
      },
    ];

    public currentQuestion: question = this.questionList[0];

    public nextQuestion() {
      this.currentQuestion.next();
    }

    private increaseIndex() {
      this.questionIndex++;
      this.currentQuestion = this.questionList[this.questionIndex];
    }
  }