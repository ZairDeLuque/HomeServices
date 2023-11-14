import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {

  private api_URL = environment.Homework.apiUrl;

  constructor(private _http: HttpClient) { }

  public createNewRoom(data: any): Observable<any>{
    return this._http.post<any>(this.api_URL + '/api/v1/post/messages/rooms/create', data);
  }
}
