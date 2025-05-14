import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DemoAngularMaterialModule} from "../../DemoAngularMaterialModule";
import { ViewVisitDetailsComponent } from './components/view-visit-details/view-visit-details.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ViewVisitDetailsComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DemoAngularMaterialModule
  ]
})
export class PatientModule { }
