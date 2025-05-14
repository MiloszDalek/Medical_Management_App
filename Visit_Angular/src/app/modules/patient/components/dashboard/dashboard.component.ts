import { Component } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {PatientService} from "../../services/patient.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  listOfVisits: any = [];

  constructor(
    private snackBar: MatSnackBar,
    private patientService: PatientService
  ) {
    this.getVisitsByPatientId();
  }

  getVisitsByPatientId() {
    this.patientService.getVisitsByPatientId().subscribe(res => {
      this.listOfVisits = res;
    })
  }

  updateStatus(id: number, status: string) {
    this.patientService.updateStatus(id, status).subscribe((res) => {
      if (res.id != null) {
        this.snackBar.open('Visit updated successfully', 'Close', { duration: 5000 });
        this.getVisitsByPatientId();
      } else {
        this.snackBar.open(res.message, 'ERROR', { duration: 5000 });
      }
    })
  }

}
