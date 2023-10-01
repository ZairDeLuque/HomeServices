import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveFormsService {

  //Stage 1
  private formDataSubject = new BehaviorSubject<FormGroup | null>(null);

  setFormData(packet: FormGroup){
    this.formDataSubject.next(packet);
  }

  getFormData(){
    return this.formDataSubject.asObservable();
  }

  //Stage 2

  private formInfoSubject = new BehaviorSubject<FormGroup | null>(null);

  setFormInfo(packet: FormGroup){
    this.formInfoSubject.next(packet);
  }

  getFormInfo(){
    return this.formInfoSubject.asObservable();
  }
}
