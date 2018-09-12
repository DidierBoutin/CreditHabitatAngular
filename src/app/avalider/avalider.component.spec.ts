import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliderComponent } from './avalider.component';

describe('AvaliderComponent', () => {
  let component: AvaliderComponent;
  let fixture: ComponentFixture<AvaliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvaliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
