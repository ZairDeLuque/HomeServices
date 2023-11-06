import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesGestorService {

  private API_URL = environment.Homework.apiUrl;

  constructor(private _http: HttpClient) { }

  public addNewService(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/services/add', data);
  }

  public addPics(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/services/add/photos', data);
  }

  public getServices_inside(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/services/get/serviceinfo', data);
  }
}
