import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryGestorService {

  private API_URL = environment.Homework.apiUrl;

  constructor(private _http: HttpClient) { }

  public getCategories(): Observable<any>{
    return this._http.get<any>(this.API_URL + '/api/v1/get/categories/all');
  }
}
