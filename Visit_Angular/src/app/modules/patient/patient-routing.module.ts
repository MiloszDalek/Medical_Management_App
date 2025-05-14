import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ViewVisitDetailsComponent} from "./components/view-visit-details/view-visit-details.component";

const routes: Routes = [
  {path: "dashboard", component: DashboardComponent},
  {path: "visit-details/:id", component: ViewVisitDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
