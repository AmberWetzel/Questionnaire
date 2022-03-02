# Questionnaire

This is an independant project by Amber Wetzel for the purpose of practicing software development and to serve as an example of her programming and source control knowledge/habits for potential employeers/collaborators.
This project is a work in progress, and likely to go through much revision and refactoring as Amber's skills improve and new discoveries are made (in terms of project vision, best practicies, available libraries, etc). At current, it is merely at a proof-of-concept stage, and missing many parts that Amber considers important for quality software development (such as unit tests).

## Project Vision

The questionnaire project began as an attempt to convert a python program made by her friend (July Spector-Bishop) into angular (with the original author's permission). The original (Memory_Monk_Exam.py) is a script that asks the user various questions through a terminal window, and ultimately saves the questions and their answers to an excel sheet on the user's computer. This script was created to be used in a game of DnD (Dungeons & Dragons), which Amber participated in - July (the DM) had each player fill out the "exam" on their own computers, and then email her the produced excel sheets.

The angular version of this project originally intended simply to replicate the original python application with the addition of a user interface (as opposed to the less accessible terminal prompt), but the process of generalizing functionality for reusability ultimately led it to become a more general "questionnaire" project, which the Memory Monk Exam is then implimented in. In other words, it's a more basic Survey Monkey.
The change from a simple python application to a web project offers new opportunities for the program as well: for example, rather than produce an excel file at the end of the questionnaire and require the end user to send that file to the questionnaire's owner, the program could instead save the questionnaire results to a database owned by the owner, allowing them to view the results instantly without any action by the end user. This feature is planned to be added post-MVP.



This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
