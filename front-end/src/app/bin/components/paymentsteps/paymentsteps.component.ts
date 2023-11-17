import { Component, Input } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-paymentsteps',
  templateUrl: './paymentsteps.component.html',
  styleUrl: './paymentsteps.component.css'
})
export class PaymentstepsComponent {
    public payPalConfig ? : IPayPalConfig;
    public viewCouponCode : boolean = false;

    @Input()
    price?: number;

    constructor() {
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
}
