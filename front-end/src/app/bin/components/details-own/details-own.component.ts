import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-details-own',
  templateUrl: './details-own.component.html',
  styleUrl: './details-own.component.css'
})
export class DetailsOwnComponent {
  protected information: any;

  protected name: string | undefined;

  constructor(public _dynamic: DynamicDialogRef, private _config: DynamicDialogConfig){
    this.information = this._config.data.data;
    this.name = this._config.data.name;
  }

  padZero(number: number): string {
    return number.toString().padStart(2, '0');
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const day = this.padZero(date.getDate());
    const month = this.padZero(date.getMonth() + 1); 
    const year = this.padZero(date.getFullYear() % 100);
    const formattedDateTime = `${day}/${month}/${year} | ${hours}:${minutes}hrs`;
    return formattedDateTime;
  }
}
