import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersgestorService {

  private API_URL = environment.Homework.apiUrl;

  constructor(private _http: HttpClient) { }

  public createCredentials(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/user/createcredentials', data);
  }

  public compareCredentials(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/user/comparecredentials', data);
  }
}
