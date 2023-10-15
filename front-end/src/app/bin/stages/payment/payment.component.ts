import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
    public payPalConfig ? : IPayPalConfig;
    public viewCouponCode : boolean = false;
    public handleQuery : string = '';

    constructor(private _route: ActivatedRoute){
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
                console.log('onApprove - transaction was approved, but not authorized', data, actions);         
            },
            onClientAuthorization: (data) => {
                console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
            },
            onError: err => {
                console.log('OnError', err);
            },
            onClick: (data, actions) => {
                console.log('onClick', data, actions);
            }
        };
    }

    ngOnInit(): void {
        this._route.queryParams.subscribe(params => {
            this.handleQuery = params['handle']
        })
    }

    changeViewCode(){
        this.viewCouponCode = !this.viewCouponCode;
    }
}
