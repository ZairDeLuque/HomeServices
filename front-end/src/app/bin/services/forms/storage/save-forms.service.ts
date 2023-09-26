import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveFormsService {

  private formDataSubject = new BehaviorSubject<FormGroup | null>(null);

  setFormData(packet: FormGroup){
    this.formDataSubject.next(packet);
  }

  getFormData(){
    return this.formDataSubject.asObservable();
  }
}
