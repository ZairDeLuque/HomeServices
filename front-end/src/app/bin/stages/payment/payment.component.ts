import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import * as Notiflix from 'notiflix';
import { Title } from '@angular/platform-browser';
import { ServicesGestorService } from '../../services/api/services-gestor.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [MessageService]
})
export class PaymentComponent implements OnInit{
    protected nameString: string = '';
    protected ofterString: string = '';
    
    protected priceA: number = 0;
    protected priceB: number = 0;
    protected priceC: number = 0;

    protected shopper: string;
    protected id: string = '';

    protected ownerBySend: string = ''

    protected multiple: number = 1;

    whatUUID(): string {
        if(localStorage.getItem('uu0x0')){
            return localStorage.getItem('uu0x0')!;
        }
        else{
            return sessionStorage.getItem('uu0x0')!; 
        }
    }

    formatIDPayments(data: string): string{
        const formatted = data.replace(/-/g, '');
        const resolved = formatted.substring(0, 4);

        return resolved.toUpperCase();
    }

    constructor(private _route: ActivatedRoute, private _title: Title, private _services: ServicesGestorService){
        this.shopper = this.whatUUID();

        this._route.queryParams.subscribe(params => {
            if(params['multiple'] != undefined){
                this.multiple = params['multiple'];
            }
        })
    }

    ngOnInit(): void {
        Notiflix.Loading.remove();

        const json = {
            _uuid: this._route.snapshot.params['id']
        }

        this._services.getPaymentInfo(json).subscribe((res: any) => {
            this.ownerBySend = res.extras[0].owner0x1;
            this.id = this.formatIDPayments(res.extras[0].uuid0x0);
            this.nameString = res.name;
            this.ofterString = res.ofterby;

            this.priceA = res.extras[0].price0x5;
            
            if(res.extras[0].priceB0x9 > 0){
                this.priceB = res.extras[0].priceB0x9;
            }

            this.priceC = ((res.extras[0].price0x5 * this.multiple) * 0.08)
            
        }, error => {
            console.error(error);
        })

        this._title.setTitle('Confirmación de pago | HomeServices®️')
    }
}
