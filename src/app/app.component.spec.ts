import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QuestionDisplayComponent } from './questionnaire/components/question-display/question-display.component';

describe('QuestionDisplayComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        QuestionDisplayComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(QuestionDisplayComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'Memory-Monk-Test'`, () => {
  //   const fixture = TestBed.createComponent(QuestionDisplayComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('Memory-Monk-Test');
  // });

  it('should render title', () => {
    const fixture = TestBed.createComponent(QuestionDisplayComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('Memory-Monk-Test app is running!');
  });
});
