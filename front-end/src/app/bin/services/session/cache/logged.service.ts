import { Injectable } from '@angular/core';
import { Observable ,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedService {

  isSessionLogged(): Observable<boolean>{
    const currentKey = localStorage.getItem('token') === 'true';

    return of(currentKey);
  }
}
