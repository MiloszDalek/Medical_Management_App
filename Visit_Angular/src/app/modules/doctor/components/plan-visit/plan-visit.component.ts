import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DoctorService} from "../../services/doctor.service";
import {parseTemplate} from "@angular/compiler";

@Component({
  selector: 'app-plan-visit',
  templateUrl: './plan-visit.component.html',
  styleUrl: './plan-visit.component.scss'
})
export class PlanVisitComponent {

  visitForm!: FormGroup;
  listOfPatients: any = [];
  listOfPriorities: any = ["ROUTINE", "URGENT", "EMERGENCY"];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private doctorService: DoctorService
  ) { }

  ngOnInit(): void {
    this.visitForm = this.fb.group({
      patientId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      description: [null, [Validators.required]],
      priority: [null, [Validators.required]],
    });

    this.getAllUsers();
  }

  getAllUsers() {
    this.doctorService.getAllUsers().subscribe(res => {
      this.listOfPatients = res;
    })
  }

  planVisit(): void {
    if (this.visitForm.valid) {
      this.doctorService.planVisit(this.visitForm.value).subscribe((res) => {
        console.log(res);
        if (res.id != null) {
          this.snackBar.open('Visit planned successfully', 'Close', {
            duration: 5000
          });
          this.router.navigateByUrl('/doctor/dashboard');
        } else {
          this.snackBar.open(res.message, 'ERROR', {
            duration: 5000
          });
        }
      })
    } else {
      for (const i in this.visitForm.controls) {
        this.visitForm.controls[i].markAsDirty();
        this.visitForm.controls[i].updateValueAndValidity();
      }
    }
  }

  // protected readonly parseTemplate = parseTemplate;
}
