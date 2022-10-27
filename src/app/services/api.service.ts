import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "@environment/environment";
import {Market} from "@app/models/market";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  // Making get call for getting data
  getData(): Observable<Market[]> {
    return this.http.get<Market[]>(`${environment.API_ENDPOINT}/dataList/`);
  }

  // Making post call for adding data
  postData(body: any): Observable<Market> {
    return this.http.post<Market>(`${environment.API_ENDPOINT}/dataList/`, body);
  }

  // Making put call for updating data record
  putData(body: any, _id: any): Observable<null> {
    return this.http.put<null>(`${environment.API_ENDPOINT}/dataList/${_id}`, body);
  }

  // Making delete call for deleting a data record
  deleteData(_id: any): Observable<null> {
    return this.http.delete<null>(`${environment.API_ENDPOINT}/dataList/${_id}`);
  }
}
