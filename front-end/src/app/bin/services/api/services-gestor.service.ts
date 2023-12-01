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

  public createCommentary(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/comentary/create', data);
  }
  
  public getCommentarys(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/comentary/get', data);
  }

  public isMyService(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/services/get/mypublish', data);
  }

  public getPaymentInfo(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/services/get/tiny/a', data);
  }

  public getServicesSP(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/services/get/sp/all', data);
  }

  public deleteServicesSP(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/services/get/sp/delete', data);
  }

  public getUncompletedServicesSP(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/services/get/sp/uncomplete', data);
  }

  public purchaseStep1(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/services/purchase/a', data);
  }

  public invoiceData(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/services/purchase/invoice/data', data);
  }

  public getMyOwnServices(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/services/purchase/own', data);
  }

  public cancelService(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/services/purchase/own/cancel', data);
  }

  public getWithUUID(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/services/get/uuid', data);
  }

  public getWithLocation(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/services/get/location', data);
  }

  public getNavContent(): Observable<any>{
    return this._http.get<any>(this.API_URL + '/api/v1/get/services/get/navbar/content');
  }

  public getWithFilter(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/services/get/search', data);
  }

  public nextStep(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/services/get/sp/next', data);
  }

  public cancelSP(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/services/post/sp/cancel', data);
  }

  public invitation(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/services/purchase/invitation/confirm', data);
  }

  public invitation_me(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/services/purchase/invitation/itsme', data);
  }

  public getTopsSells(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/services/get/sp/tops', data);
  }

  public smart(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/services/get/sp/small', data);
  }

  public getTopMain(): Observable<any>{
    return this._http.get<any>(this.API_URL + '/api/v1/post/services/get/topmain');
  }

  public getNewMain(): Observable<any>{
    return this._http.get<any>(this.API_URL + '/api/v1/post/services/get/news');
  }

  public getTodayMain(): Observable<any>{
    return this._http.get<any>(this.API_URL + '/api/v1/post/services/get/today');
  }
}
