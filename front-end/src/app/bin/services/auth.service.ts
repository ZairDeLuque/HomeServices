import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.Homework;

  constructor(private http : HttpClient) { }

  public registro(usuario:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/insize/registro`,usuario);
  }

  
}
