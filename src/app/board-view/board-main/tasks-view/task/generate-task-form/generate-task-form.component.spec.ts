import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTaskFormComponent } from './generate-task-form.component';

describe('GenerateTaskFormComponent', () => {
  let component: GenerateTaskFormComponent;
  let fixture: ComponentFixture<GenerateTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateTaskFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
