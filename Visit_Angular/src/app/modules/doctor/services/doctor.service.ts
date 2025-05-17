import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "../../../auth/services/storage/storage.service";

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(BASIC_URL + `api/doctor/users`)
  }

  planVisit(visitDto: any): Observable<any> {
    return this.http.post(BASIC_URL + `api/doctor/visit`, visitDto)
  }

  getAllVisits(): Observable<any> {
    return this.http.get(BASIC_URL + `api/doctor/visits`)
  }

  deleteVisit(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + `api/doctor/visit/` + id)
  }

  updateVisit(id: number, visitDto: any): Observable<any> {
    return this.http.put(BASIC_URL + `api/doctor/visit/${id}`, visitDto)
  }

  searchVisits(title: string): Observable<any> {
    return this.http.get(BASIC_URL + `api/doctor/visits/search/${title}`)
  }

  getVisitById(id: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/doctor/visit/` + id)
  }

  createInformation(visitId: number, content: string): Observable<any> {
    const params = {
      visitId: visitId,
      postedBy: StorageService.getUserId(),
      content: content
    };
    return this.http.post(BASIC_URL + `api/doctor/visit/information`, null, {
      params: params
    })
  }

  getInformationsByVisitId(id: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/doctor/visit/informations/` + id)
  }

  deleteInformationById(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + `api/doctor/visit/information/delete/` + id)
  }

  // private createAuthorizationHeader(): HttpHeaders {
  //   return new HttpHeaders().set(
  //     'Authorization', 'Bearer ' + StorageService.getToken()
  //   )
  // }

}
