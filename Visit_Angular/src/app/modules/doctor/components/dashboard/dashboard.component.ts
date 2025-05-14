import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DoctorService} from "../../services/doctor.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  listOfVisits: any = [];
  searchVisitForm!: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private doctorService: DoctorService
  ) {
    this.searchVisitForm = this.fb.group({
      title: [null]
    })
    this.getAllVisits();
  }

  searchVisits() {
    this.listOfVisits = [];
    const title = this.searchVisitForm.get('title')!.value;
    if (title) {
      this.doctorService.searchVisits(title).subscribe(res => {
        this.listOfVisits = res;
      })
    }
    else {
      this.getAllVisits();
    }
  }

  getAllVisits() {
    this.doctorService.getAllVisits().subscribe(res => {
      this.listOfVisits = res;
    })
  }

  deleteVisit(id: number): void {
    this.doctorService.deleteVisit(id).subscribe((res) => {
      this.snackBar.open('Visit deleted successfully', 'Close', { duration: 5000 });
      this.getAllVisits();
    })
  }
}
