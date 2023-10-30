import { Injectable } from '@angular/core';
import { Observable ,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedService {
  isSessionLogged(): Observable<boolean>{
    if(localStorage.getItem('uu0x0')){
      const currentKey = localStorage.getItem('ac0x1') === 'true';

      return of(currentKey);
    }
    else{
      const currentKey = sessionStorage.getItem('ac0x1') === 'true';

      return of(currentKey);
    }
  }

}
