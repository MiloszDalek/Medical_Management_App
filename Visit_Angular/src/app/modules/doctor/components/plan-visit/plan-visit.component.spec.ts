import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanVisitComponent } from './plan-visit.component';

describe('PlanVisitComponent', () => {
  let component: PlanVisitComponent;
  let fixture: ComponentFixture<PlanVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanVisitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
