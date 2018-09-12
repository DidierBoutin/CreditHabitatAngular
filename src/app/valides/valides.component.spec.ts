import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidesComponent } from './valides.component';

describe('ValidesComponent', () => {
  let component: ValidesComponent;
  let fixture: ComponentFixture<ValidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
