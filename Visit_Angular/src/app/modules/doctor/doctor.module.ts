import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlanVisitComponent } from './components/plan-visit/plan-visit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {DemoAngularMaterialModule} from "../../DemoAngularMaterialModule";
import { UpdateVisitComponent } from './components/update-visit/update-visit.component';
import { ViewVisitDetailsComponent } from './components/view-visit-details/view-visit-details.component';



@NgModule({
  declarations: [
    DashboardComponent,
    PlanVisitComponent,
    UpdateVisitComponent,
    ViewVisitDetailsComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoAngularMaterialModule
  ]
})
export class DoctorModule { }
