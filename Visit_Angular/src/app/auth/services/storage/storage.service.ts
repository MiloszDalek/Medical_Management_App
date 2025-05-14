import { Injectable } from '@angular/core';

const TOKEN = 'token';
const USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static isDoctorLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'DOCTOR';
  }

  static isPatientLoggedIn(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'PATIENT';
  }

  static hasToken(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    return true;
  }

  static getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    //return JSON.parse(localStorage.getItem(USER));
    const userData = localStorage.getItem(USER);
    return userData ? JSON.parse(userData) : null;
  }


  static getUserId(): string {
    const user = this.getUser();
    if (user == null) { return ''; }
    return user.id;
  }

  static getUserRole(): string {
    const user = this.getUser();
    if (user == null) { return ''; }
    return user.role;
  }

  static signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

}
