import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsManagerService {

  private API_URL = environment.Homework.apiUrl;

  constructor(private readonly _http: HttpClient) { }

  public stripeConfirmation(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/payments/stripe/success', data)
  }
  public stripeDelete(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/payments/stripe/delete', data)
  }
}
