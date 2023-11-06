import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import * as Notiflix from 'notiflix';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [MessageService]
})
export class PaymentComponent implements OnInit{
    public payPalConfig ? : IPayPalConfig;
    public viewCouponCode : boolean = false;
    public handleQuery : string = '';

    constructor(private _route: ActivatedRoute, private NG_MSG: MessageService, private _title: Title){
        this.payPalConfig = {
            currency: 'MXN',
            clientId: 'sb',
            createOrderOnClient: (data) => <ICreateOrderRequest> {
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'MXN',
                        value: '49.99',
                        breakdown: {
                            item_total: {
                                currency_code: 'MXN',
                                value: '49.99'
                            }
                        }
                    },
                    items: [{
                        name: 'WorkHome Subscription',
                        quantity: '1',
                        category: 'DIGITAL_GOODS',
                        unit_amount: {
                            currency_code: 'MXN',
                            value: '49.99',
                        },
                    }]
                }]
            },
            advanced: {
                commit: 'true'
            },
            style: {
                label: 'paypal',
                tagline: false,
                layout: 'horizontal',
                fundingicons: true
            },
            onApprove: (data, actions) => {
                Notiflix.Loading.remove();
                console.log('onApprove - transaction was approved, but not authorized', data, actions);         
            },
            onClientAuthorization: (data) => {
                Notiflix.Loading.remove();
                console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            },
            onCancel: (data, actions) => {
                Notiflix.Loading.remove();
                this.NG_MSG.add({severity:'warn', summary:'Cancelado', detail:'El pago ha sido cancelado por el usuario. ID: ' + data.orderID});
            },
            onError: err => {
                Notiflix.Loading.remove();
                console.log('OnError', err);
            },
            onClick: (data, actions) => {
                Notiflix.Loading.dots('Esperando a PayPal...',{
                    clickToClose: false,
                    svgColor: '#a95eff',
                    className: 'font-b',
                    backgroundColor: '#fff',
                    messageColor: '#000'
                })
            }
        };
    }

    ngOnInit(): void {
        this._route.queryParams.subscribe(params => {
            this.handleQuery = params['handle']
        })

        this._title.setTitle('Confirmación de pago | HomeServices®️')
    }

    changeViewCode(){
        this.viewCouponCode = !this.viewCouponCode;
    }
}
