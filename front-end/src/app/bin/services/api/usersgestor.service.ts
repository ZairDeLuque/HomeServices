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

  public createCredentials_Sellers(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/user/sellers/createrequest', data);
  }

  public createCredentials_Sellers_Pics(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/user/sellers/createrequest/photos', data);
  }

  public isAlreadyRequested(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/user/sellers/checkrequest', data);
  }

  public compareCredentials(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/user/comparecredentials', data);
  }

  public obtainUserData(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/user/info/allinformation', data);
  }

  public getLocation(): Observable<any>{
    return this._http.get<any>(this.API_URL + '/api/v1/get/locations/obtainPublicIP');
  }

  public getTinyInformation(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/user/info/smart/show', data);
  }

  public getName(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/user/info/smart/name', data);
  }

  public createSubCredentials(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/user/subcredentials', data);
  }

  public getNotifications(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/user/notifications/get', data);
  }

  public deleteNotifications(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/user/notifications/delete', data);
  }

  public getLengthNotifications(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/user/notifications/length', data);
  }

  public getSubCredentials(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/user/info/smart/sub', data);
  }

  public createReview(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/user/reviews/create', data);
  }

  public getReviews_Profile(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/user/reviews/get/profile', data);
  }

  public getSells(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/user/info/smart/allsells', data);
  }

  public getLocation_2(data: any): Observable<any>{
    return this._http.post<any>(this.API_URL + '/api/v1/post/user/info/smart/location', data);
  }
}
