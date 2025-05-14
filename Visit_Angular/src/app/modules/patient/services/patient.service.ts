import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../../../auth/services/storage/storage.service";
import {Observable} from "rxjs";

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getVisitsByPatientId(): Observable<any> {
    return this.http.get(BASIC_URL + `api/patient/visits/${StorageService.getUserId()}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  updateStatus(id: number, status: any): Observable<any> {
    return this.http.get(BASIC_URL + `api/patient/visit/${id}/${status}`, {
      headers: this.createAuthorizationHeader()
    })
  }
  getVisitById(id: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/patient/visit/` + id, {
      headers: this.createAuthorizationHeader()
    })
  }

  createInformation(visitId: number, content: string): Observable<any> {
    const params = {
      visitId: visitId,
      postedBy: StorageService.getUserId(),
      content: content
    };
    return this.http.post(BASIC_URL + `api/patient/visit/information`, null, {
      params: params,
      headers: this.createAuthorizationHeader()
    })
  }

  getInformationsByVisitId(id: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/patient/visit/informations/` + id, {
      headers: this.createAuthorizationHeader()
    })
  }
  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    )
  }

  deleteInformationById(id: number) {
    return this.http.delete(BASIC_URL + `api/patient/visit/information/delete/` + id, {
      headers: this.createAuthorizationHeader()
    })
  }
}
