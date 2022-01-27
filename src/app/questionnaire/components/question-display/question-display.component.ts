import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AnswerTypes } from 'src/app/models/answer-types.model';
import { question } from 'src/app/models/question.model';
import { baseScriptViewmodel } from '../../viewmodels/baseScript.viewmodel';
import { ScriptDisplayComponent } from './script-display/script-display.component';

@Component({
  selector: 'question-display-component',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.scss']
})


export class QuestionDisplayComponent implements OnInit {

  @Input() viewModel!: baseScriptViewmodel;
  @ViewChild(ScriptDisplayComponent) scriptDisplay!: ScriptDisplayComponent;


  public currentQuestion!: question;
  public isDisabled: boolean = true; //whether a question has been answered properly
  public answerTypes = AnswerTypes;
  public finished = false; //for UI updating

  public ngOnInit() {
    this.currentQuestion = this.viewModel.currentQuestion;
  }

  public onContinueClicked() {
    this.scriptDisplay.updateScript(this.currentQuestion);

    this.viewModel.next();
    this.currentQuestion = this.viewModel.currentQuestion;

    if (!this.viewModel.finished) {
      this.isValid(this.currentQuestion.answerType, this.currentQuestion.answer);
    } else {
      this.finishQuiz();
    }
  }  


   public isValid(answerType: AnswerTypes, answer?: any): void {
       if (answerType === AnswerTypes.freeResponse) {
          if (answer?.length && answer.length > 0) { //we know answser is a string in this case so can check its lengths
              this.isDisabled = false;
              return;
          }
       }
       else if (answerType === AnswerTypes.multiChoice) {
         if (answer !== null) { //an answer is selected
           this.isDisabled = false;
           return;
          }
       }
       else if (answerType === AnswerTypes.noResponse)  {
         this.isDisabled = false; //enable the continue button immediately
         return;
       }
       this.isDisabled = true; //if we haven't returned yet, the answer isn't valid
   }

   public finishQuiz(): void {
     this.scriptDisplay.finish();
     this.finished = true;

     // Send results to questionnaire owner
     // ideal method is to save results to a database controlled by the questionnaire owner
     // alterante is to export as a file that the user sends to the questionnaire owner
     // this time, we are just printing to the console
     let finalScript = this.scriptDisplay.script;
     console.log(finalScript);
   }

}
