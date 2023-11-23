import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ServicesGestorService } from 'src/app/bin/services/api/services-gestor.service';
import { UsersgestorService } from 'src/app/bin/services/api/usersgestor.service';

@Component({
  selector: 'app-details-popup',
  templateUrl: './details-popup.component.html',
  styleUrl: './details-popup.component.css'
})
export class DetailsPopupComponent implements OnInit{

  protected servicePacket: any;
  protected subs: any;
  protected invoice: any;
  protected active: boolean = true;
  protected errors: boolean = false;

  constructor(public _dynamic: DynamicDialogRef, private _config: DynamicDialogConfig, private _service: ServicesGestorService, private _users: UsersgestorService){}

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

  getInvoiceInfo(){
    const json = {
      _uuid: this.servicePacket.article0x0,
      _payer: this.servicePacket.shopper0x2
    }

    this._service.invoiceData(json).subscribe((data: any) => {
      if(data.get === true){
        this.invoice = data;
      }
    }, (error: any) => {
      console.log(error);
      this.errors = true;
    });
  }

  formatStringPayment(string: string){
    switch (string){
      case 'MPAGO':
        return 'Mercado Pago';
      case 'PAYPAL':
        return 'PayPal';
      case 'STRIPE':
        return 'Stripe';
      default: 
        return 'Desconocido';
    }
  }

  getSub(){
    const json = {
      _u0x: this.servicePacket.shopper0x2
    }

    this._users.getSubCredentials(json).subscribe((data: any) => {
      if(data.exists === true){
        this.subs = data.result;
        this.active = false;
      }
      else{
        this.errors = true;
      }
    }, (error: any) => {
      console.log(error);
      this.errors = true;
    });
  }

  ngOnInit(): void {
    this.servicePacket = this._config.data.servicePacket;

    this.getInvoiceInfo();
    this.getSub();
  }
}
