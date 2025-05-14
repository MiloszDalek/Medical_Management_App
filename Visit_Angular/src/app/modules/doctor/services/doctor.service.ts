import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "../../../auth/services/storage/storage.service";

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(BASIC_URL + `api/doctor/users`, {
      headers: this.createAuthorizationHeader()
    })
  }

  planVisit(visitDto: any): Observable<any> {
    return this.http.post(BASIC_URL + `api/doctor/visit`, visitDto, {
      headers: this.createAuthorizationHeader()
    })
  }

  getAllVisits(): Observable<any> {
    return this.http.get(BASIC_URL + `api/doctor/visits`, {
      headers: this.createAuthorizationHeader()
    })
  }

  deleteVisit(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + `api/doctor/visit/` + id, {
      headers: this.createAuthorizationHeader()
    })
  }

  updateVisit(id: number, visitDto: any): Observable<any> {
    return this.http.put(BASIC_URL + `api/doctor/visit/${id}`, visitDto,{
      headers: this.createAuthorizationHeader()
    })
  }

  searchVisits(title: string): Observable<any> {
    return this.http.get(BASIC_URL + `api/doctor/visits/search/${title}`,{
      headers: this.createAuthorizationHeader()
    })
  }

  getVisitById(id: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/doctor/visit/` + id, {
      headers: this.createAuthorizationHeader()
    })
  }

  createInformation(visitId: number, content: string): Observable<any> {
    const params = {
      visitId: visitId,
      postedBy: StorageService.getUserId(),
      content: content
    };
    return this.http.post(BASIC_URL + `api/doctor/visit/information`, null, {
      params: params,
      headers: this.createAuthorizationHeader()
    })
  }

  getInformationsByVisitId(id: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/doctor/visit/informations/` + id, {
      headers: this.createAuthorizationHeader()
    })
  }

  deleteInformationById(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + `api/doctor/visit/information/delete/` + id,{
      headers: this.createAuthorizationHeader()
    })
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    )
  }

}
