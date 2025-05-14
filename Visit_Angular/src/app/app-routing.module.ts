import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/components/login/login.component";
import {SignupComponent} from "./auth/components/signup/signup.component";
import {HomeComponent} from "./pages/home/home.component";

const routes: Routes = [
  { path:"login",component: LoginComponent },
  { path:"signup",component: SignupComponent },
  { path:"doctor", loadChildren: () => import("./modules/doctor/doctor.module").then(e => e.DoctorModule)},
  { path:"patient", loadChildren: () => import("./modules/patient/patient.module").then(e => e.PatientModule)},
  { path:"home", component: HomeComponent },
  { path:"", component: HomeComponent },
  { path:"**", redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
