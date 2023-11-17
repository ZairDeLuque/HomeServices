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
    protected priceD: number = 0;

    constructor(private _route: ActivatedRoute, private _title: Title, private _services: ServicesGestorService){
        
    }

    ngOnInit(): void {
        Notiflix.Loading.remove();

        const json = {
            _uuid: this._route.snapshot.params['id']
        }

        this._services.getPaymentInfo(json).subscribe((res: any) => {
            this.nameString = res.name;
            this.ofterString = res.ofterby;

            this.priceA = res.extras[0].price0x5;
            
            if(res.extras[0].priceB0x9 > 0){
                this.priceB = res.extras[0].priceB0x9;
            }

            this.priceC = (res.extras[0].price0x5 * 0.05)
            
            this.priceD = this.priceA + this.priceB + this.priceC;
        }, error => {
            console.error(error);
        })

        this._title.setTitle('Confirmación de pago | HomeServices®️')
    }
}
