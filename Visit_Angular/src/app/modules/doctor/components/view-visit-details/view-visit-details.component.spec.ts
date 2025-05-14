import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVisitDetailsComponent } from './view-visit-details.component';

describe('ViewVisitDetailsComponent', () => {
  let component: ViewVisitDetailsComponent;
  let fixture: ComponentFixture<ViewVisitDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewVisitDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewVisitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
