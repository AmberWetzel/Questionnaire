import { Component } from "@angular/core";
import { MemoryMonkScriptViewModel } from "../../viewmodels/memory-monk-script.viewmodel";
import {TutorialScriptViewModel } from "../../viewmodels/tutorial.viewmodel";

@Component({
    selector: 'landingComponent',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
  })
  
  
  export class LandingComponent {

    public viewModel: any = null; //TODO: why can I not define this as a baseScriptViewmodel ?

    public onTutorialButtonCLicked(): void {
        this.viewModel = new TutorialScriptViewModel;
    }

    public onTestOfHeartButtonCLicked(): void {
        this.viewModel = new MemoryMonkScriptViewModel;
    }
  }