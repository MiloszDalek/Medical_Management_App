import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {StorageService} from "../../../auth/services/storage/storage.service";
import {catchError, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient, private router: Router) { }

  getVisitsByPatientId(): Observable<any> {
    return this.http.get(BASIC_URL + `api/patient/visits/${StorageService.getUserId()}`)
  }

  updateStatus(id: number, status: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/patient/visit/${id}/${status}`)
  }
  getVisitById(id: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/patient/visit/` + id).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.router.navigate(['/patient/dashboard']);
          }
          return throwError(() => error);
        })
    )
  }

  createInformation(visitId: number, content: string): Observable<any> {
    const params = {
      visitId: visitId,
      postedBy: StorageService.getUserId(),
      content: content
    };
    return this.http.post(BASIC_URL + `api/patient/visit/information`, null, {
      params: params
    })
  }

  getInformationsByVisitId(id: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/patient/visit/informations/` + id)
  }
  deleteInformationById(id: number) {
    return this.http.delete(BASIC_URL + `api/patient/visit/information/delete/` + id)
  }
}
