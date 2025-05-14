import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DoctorService} from "../../services/doctor.service";


@Component({
  selector: 'app-update-visit',
  templateUrl: './update-visit.component.html',
  styleUrl: './update-visit.component.scss'
})
export class UpdateVisitComponent {

  visitForm!: FormGroup;
  listOfPatients: any = [];
  listOfPriorities: any = ["ROUTINE", "URGENT", "EMERGENCY"];
  listOfVisitStatus: any = ["SCHEDULED", "CONFIRMED", "CANCELLED"];
  id: number = this.activatedRoute.snapshot.params['id'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private doctorService: DoctorService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.visitForm = this.fb.group({
      patientId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      description: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      visitStatus: [null, [Validators.required]]
    });
    this.getAllUsers();
    this.getVisitById();
  }


  getAllUsers() {
    this.doctorService.getAllUsers().subscribe(res => {
      this.listOfPatients = res;
    })
  }

  getVisitById() {
    this.doctorService.getVisitById(this.id).subscribe(res => {
      this.visitForm.patchValue(res);
    })
  }

  updateVisit(): void {
    if (this.visitForm.valid) {
      this.doctorService.updateVisit(this.id, this.visitForm.value).subscribe((res) => {
        if (res.id != null) {
          this.snackBar.open('Task updated successfully', 'Close', {
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

}
