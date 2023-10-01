import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnchangeService {

  private changeValue = new BehaviorSubject<string>('');

  private newChange = new Subject<void>();

  newChange$ = this.newChange.asObservable();

  emitNewChange() {
    this.newChange.next();
  }

  setChangeValue(value: string): void {
    this.changeValue.next(value);
  }

  getValue(): BehaviorSubject<string>{
    return this.changeValue;
  }
}
