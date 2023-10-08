import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerifyCodeService {

  private apiURL = environment.Homework.apiUrl;

  constructor(private _http: HttpClient) { }

  protected sendNewVerificationCode(data: any): Observable<any>{
    return this._http.post<any>(this.apiURL + '/api/security/verification/mail', data);
  }
}
