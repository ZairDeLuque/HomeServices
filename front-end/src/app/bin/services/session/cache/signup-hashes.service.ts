import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupHashesService {
  //Hast - Email
  private hashEmail = new BehaviorSubject<string>('');

  setEmailHash(hash: string){
    this.hashEmail.next(hash);
  }

  getEmailHash(){
    return this.hashEmail.asObservable();
  }

}
