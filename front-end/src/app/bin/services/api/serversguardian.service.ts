import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServersguardianService {

  private apiURL = environment.Homework.apiUrl;

  constructor(private _http: HttpClient) { }

  public isrunning(): Observable<any>{
    return this._http.get<any>(this.apiURL + '/api/v1/get/status');
  }
}
