import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedService {

  constructor(private _http: HttpClient){}

  isSessionLogged(): Observable<boolean>{
    if(localStorage.getItem('uu0x0')){
      const currentKey = localStorage.getItem('act0x1') === 'true';

      return of(currentKey);
    }
    else{
      const currentKey = sessionStorage.getItem('act0x1') === 'true';

      return of(currentKey);
    }
  }

  isVerifySession(data: any): Observable<any>{
    return this._http.post('http://localhost:3000/api/v1/get/verifyAccounts', data);
  }
}
