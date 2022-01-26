import { Component } from "@angular/core";
import { AnswerTypes } from "src/app/models/answer-types.model";
import { question, scriptItem } from "src/app/models/question.model";

@Component({
    selector: 'script-display-component',
    templateUrl: './script-display.component.html',
    styleUrls: ['./script-display.component.scss']
  })
  
  
  export class ScriptDisplayComponent {

    public script: scriptItem[] = [];
    public latestPrompt?: scriptItem;

    public updateScript(answeredQuestion?: question): void {
        if (this.latestPrompt) {
            this.script.push(this.latestPrompt);
        }

        if (answeredQuestion) { //if no, then we are finalizing  the script
          if (answeredQuestion.answerType == AnswerTypes.noResponse) {
            this.latestPrompt = {prompt: answeredQuestion.prompt,}
          }
          else {
            this.latestPrompt = {prompt: answeredQuestion.prompt, answer: answeredQuestion.answer};
          }
        }
    }

    public finish(): void {
      this.updateScript(); //move latest prompt to script
      this.latestPrompt = undefined;
    }
  }  