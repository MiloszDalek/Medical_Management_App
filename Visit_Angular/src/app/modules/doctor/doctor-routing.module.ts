import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {PlanVisitComponent} from "./components/plan-visit/plan-visit.component";
import {UpdateVisitComponent} from "./components/update-visit/update-visit.component";
import {ViewVisitDetailsComponent} from "./components/view-visit-details/view-visit-details.component";
import {RoleGuard} from "../../guards/role.guard";

const routes: Routes = [
  {
    path: '',
    canActivateChild: [RoleGuard],
    data: { roles: ['DOCTOR'] },
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: "dashboard", component: DashboardComponent},
      {path: "visit", component: PlanVisitComponent},
      {path: "visit/:id/edit", component: UpdateVisitComponent},
      {path: "visit-details/:id", component: ViewVisitDetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
