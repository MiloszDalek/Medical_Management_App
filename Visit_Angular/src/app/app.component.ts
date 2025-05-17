import { Component } from '@angular/core';
import {StorageService} from "./auth/services/storage/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string = 'Visit_Angular';

  isPatientLoggedIn: boolean = StorageService.isPatientLoggedIn();
  isDoctorLoggedIn: boolean = StorageService.isDoctorLoggedIn();


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      this.isPatientLoggedIn = StorageService.isPatientLoggedIn();
      this.isDoctorLoggedIn = StorageService.isDoctorLoggedIn();
    })
  }

  logout() {
    StorageService.signOut();
    this.router.navigateByUrl('/home');
  }

  navigateToHome() {
    this.router.navigateByUrl('/home');
  }
}
