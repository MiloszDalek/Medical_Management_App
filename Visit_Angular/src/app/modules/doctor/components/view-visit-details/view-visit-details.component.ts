import { Component } from '@angular/core';
import {DoctorService} from "../../services/doctor.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-view-visit-details',
  templateUrl: './view-visit-details.component.html',
  styleUrl: './view-visit-details.component.scss'
})
export class ViewVisitDetailsComponent {

  visitId: number = this.activatedRoute.snapshot.params["id"];
  visitData: any;
  informations: any;
  informationForm!: FormGroup;
  constructor(private doctorService: DoctorService,
              private matSnackBar: MatSnackBar,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getVisitById();
    this.getInformations();
    this.informationForm = this.fb.group({
      content: [null, Validators.required]
    })
  }

  getVisitById() {
    this.doctorService.getVisitById(this.visitId).subscribe((res) =>{
      this.visitData = res;
    })
  }

  getInformations() {
    this.doctorService.getInformationsByVisitId(this.visitId).subscribe((res) =>{
      this.informations = res;
    })
  }

  publishInformation() {
    this.doctorService.createInformation(this.visitId, this.informationForm.get("content")?.value).subscribe((res)=>{
      if (res.id != null) {
        this.getInformations();
        this.informationForm.reset();
        this.matSnackBar.open("Information posted successfully", "Close", { duration:5000 })
      }
      else {
        this.matSnackBar.open("Something went wrong", "Close", { duration:5000 })
      }
    })
  }

  getInitials(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '?';
  }

  getColorForUser(name: string): string {
    const colors = ['#E57373', '#81C784', '#64B5F6', '#FFD54F', '#BA68C8', '#4DB6AC', '#FF8A65'];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
  }

  deleteInformation(id: number) {
      this.doctorService.deleteInformationById(id).subscribe((res)=>{
        this.matSnackBar.open('Information deleted successfully', 'Close', { duration: 5000 });
        this.getInformations();
      })
  }
}
