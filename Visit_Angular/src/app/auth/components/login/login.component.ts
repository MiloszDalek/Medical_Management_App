import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {StorageService} from "../../services/storage/storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;

  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        if (res.userId != null) {
          const user = {
            id: res.userId,
            role: res.userRole
          }
          StorageService.saveUser(user);
          StorageService.saveToken(res.jwt);
          if (StorageService.isDoctorLoggedIn()) {
            this.router.navigateByUrl('/doctor/dashboard');
          } else if (StorageService.isPatientLoggedIn()) {
            this.router.navigateByUrl('/patient/dashboard');
          }
          this.snackBar.open('Login successful', 'Close', { duration: 5000 });
        } else {
          this.snackBar
            .open(
              'Bad credentials', 'Close', { duration: 5000, panelClass: 'error-snackbar' }
            )
        }
      },
      (error) => {
        if (error.status === 401 || error.status === 403) {
          this.snackBar.open('Bad credentials', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
        } else {
          this.snackBar.open('Login failed. Please try again.', 'Close', {
            duration: 5000,
            panelClass: 'error-snackbar'
          });
        }
      }
    );
  }
}
