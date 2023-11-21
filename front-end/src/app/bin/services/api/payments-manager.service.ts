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

  public stripeCheckout(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/payments/stripe/create-order', data)
  }

  public mercadopagoCheckout(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/payments/mp/create-order', data)
  }

  public mercadopagoConfirmation(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/payments/verify', data)
  }

  public paypalConfirmation(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/payments/paypal/create-order', data)
  }
}
