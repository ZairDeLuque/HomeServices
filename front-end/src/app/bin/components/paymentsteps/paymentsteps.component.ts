import { Component, Input, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import * as Notiflix from 'notiflix';
import { PaymentsManagerService } from '../../services/api/payments-manager.service';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-paymentsteps',
  templateUrl: './paymentsteps.component.html',
  styleUrl: './paymentsteps.component.css',
  providers: [DialogService]
})
export class PaymentstepsComponent implements OnInit{
    public payPalConfig ? : IPayPalConfig;
    public viewCouponCode : boolean = false;

    protected active: boolean = false;
    protected steps: number = 0;

    @Input()
    price?: number;
    
    @Input()
    uuid?: string;

    @Input()
    shopper?: string;

    protected formCurrent: FormGroup;

    constructor(private _payments: PaymentsManagerService, private ar: ActivatedRoute, private _dialog: DialogService, private _builder: FormBuilder) {
        
        this.formCurrent = this._builder.group({
            
        })

        this.active = true;
        this.payPalConfig = {
            currency: 'MXN',
            clientId: 'sb',
            createOrderOnClient: (data) => <ICreateOrderRequest> {
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'MXN',
                        value: this.price?.toString(),
                        breakdown: {
                            item_total: {
                                currency_code: 'MXN',
                                value: this.price?.toString()
                            }
                        }
                    },
                    items: [{
                        name: 'HOMESERVICES-' + this.uuid,
                        quantity: '1',
                        category: 'DIGITAL_GOODS',
                        unit_amount: {
                            currency_code: 'MXN',
                            value: this.price?.toString(),
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
            onClientAuthorization: (data) => {
                Notiflix.Loading.remove();

                const json = {
                    _uitem: this.ar.snapshot.params['id'],
                    _transaction: data.id,
                    _payer: this.shopper,
                    _price: data.purchase_units[0].amount.value
                }

                this._payments.paypalConfirmation(json).subscribe((res: any) => {
                    Notiflix.Loading.dots('Verificando integridad...',{
                        clickToClose: false,
                        svgColor: '#a95eff',
                        className: 'font-b',
                        backgroundColor: '#fff',
                        messageColor: '#000'
                    })

                    if(res.authorized === true){
                        Notiflix.Loading.remove();
                        Notiflix.Notify.success('Tu pago se ha realizado con éxito, en unos momentos te llegará un correo con los detalles de tu compra.');
                    }
                    else{
                        Notiflix.Loading.remove();
                        Notiflix.Notify.failure('PayPal rechazo la solicitud, por favor intenta de nuevo más tarde.');
                    }
                }, (err: any) => {
                    console.error(err);
                    Notiflix.Loading.remove();
                    Notiflix.Notify.failure('Ocurrió un error al verificar la transacción, por favor intenta de nuevo más tarde.');
                });
            },
            onCancel: (data, actions) => {
                Notiflix.Loading.remove();
                Notiflix.Notify.failure('Tu pago se ha cancelado. En breve te enviaremos al inicio de HomeServices®.');
            },
            onError: err => {
                Notiflix.Loading.remove();
                // console.log('OnError', err);
                Notiflix.Notify.failure('PayPal fracaso en la misión de pago, por favor intenta de nuevo más tarde.');
            },
            onClick: (data, actions) => {
                Notiflix.Loading.dots('Esperando a PayPal...',{
                    clickToClose: false,
                    svgColor: '#a95eff',
                    className: 'font-b',
                    backgroundColor: '#fff',
                    messageColor: '#000'
                })
            },
        };
    }

    ngOnInit(): void {
    }

    openPopupMercadoPago() {
        Notiflix.Loading.dots('Esperando a Mercado Pago...',{
            clickToClose: false,
            svgColor: '#a95eff',
            className: 'font-b',
            backgroundColor: '#fff',
            messageColor: '#000'
        })
        
        const json = {
            _uitem: this.ar.snapshot.params['id'],
            _item:"HOMESERVICES-" + this.uuid,
            _price: this.price,
            _qual: 1,
            _payer: this.shopper
        }

        this._payments.mercadopagoCheckout(json).subscribe((res: any) => {
            if(res.authorized == true){
                const popup = window.open(res.important, 'Mercado Pago with HomeServices®', 'width=600,height=800');

                if(popup){
                    const closedPopup = setInterval(() => {
                        if(popup.closed){
                            clearInterval(closedPopup);
                            Notiflix.Loading.remove();
                            
                            const json2 = {
                                id: res.collectorID
                            }

                            this._payments.mercadopagoConfirmation(json2).subscribe((res2: any) => {
                                Notiflix.Loading.dots('Verificando respuesta...',{
                                    clickToClose: false,
                                    svgColor: '#a95eff',
                                    className: 'font-b',
                                    backgroundColor: '#fff',
                                    messageColor: '#000'
                                })

                                if(res2.status == 'approved'){
                                    Notiflix.Loading.remove();
                                    Notiflix.Notify.success('Tu pago se ha realizado con éxito, en unos momentos te llegará un correo con los detalles de tu compra.');
                                }
                                else if(res2.status == 'cancelled'){
                                    Notiflix.Loading.remove();
                                    Notiflix.Notify.failure('Tu pago se ha cancelado. En breve te enviaremos al inicio de HomeServices®.');
                                }
                                else{
                                    Notiflix.Notify.failure('Mercado Pago fracaso en la misión de pago, por favor intenta de nuevo más tarde.');
                                }
                            }, (err2: any) => {
                                console.error(err2)
                                Notiflix.Loading.remove();
                                Notiflix.Notify.failure('Mercado Pago rechazo la solicitud, por favor intenta de nuevo más tarde.');
                            });
                        }
                    }, 1000);
                }
            }
            else{
                Notiflix.Loading.remove();
                Notiflix.Notify.failure('Mercado Pago rechazo la solicitud, por favor intenta de nuevo más tarde.');
            }
        }, (err: any) => {
            console.error(err);
            Notiflix.Loading.remove();
            Notiflix.Notify.failure('Ocurrió un error al crear el link de pago, por favor intenta de nuevo más tarde.');
        });
    }

    openStripePopup(){
        Notiflix.Loading.dots('Esperando a Stripe...',{
            clickToClose: false,
            svgColor: '#a95eff',
            className: 'font-b',
            backgroundColor: '#fff',
            messageColor: '#000'
        })
        
        const json = {
            _uitem: this.ar.snapshot.params['id'],
            _item:"HOMESERVICES-" + this.uuid,
            _price: this.price,
            _qual: 1,
            _payer: this.shopper
        }

        this._payments.stripeCheckout(json).subscribe((res: any) => {
            if(res.authorized == true){
                const popup = window.open(res.session, 'Stripe with HomeServices®', 'width=600,height=800');

                if(popup){
                    const closedPopup = setInterval(() => {
                        if(popup.closed){
                            clearInterval(closedPopup);
                            Notiflix.Loading.remove();
                            
                            const json2 = {
                                id: 'HOMESERVICES-' + this.uuid
                            }

                            this._payments.mercadopagoConfirmation(json2).subscribe((res2: any) => {
                                Notiflix.Loading.dots('Verificando respuesta...',{
                                    clickToClose: false,
                                    svgColor: '#a95eff',
                                    className: 'font-b',
                                    backgroundColor: '#fff',
                                    messageColor: '#000'
                                })

                                if(res2.status == 'approved'){
                                    Notiflix.Loading.remove();
                                    Notiflix.Notify.success('Tu pago se ha realizado con éxito, en unos momentos te llegará un correo con los detalles de tu compra.');
                                }
                                else if(res2.status == 'cancelled'){
                                    Notiflix.Loading.remove();
                                    Notiflix.Notify.failure('Tu pago se ha cancelado. En breve te enviaremos al inicio de HomeServices®.');
                                }
                                else{
                                    Notiflix.Notify.failure('Stripe fracaso en la misión de pago, por favor intenta de nuevo más tarde.');
                                }
                            }, (err2: any) => {
                                console.error(err2)
                                Notiflix.Loading.remove();
                                Notiflix.Notify.failure('Stripe rechazo la solicitud, por favor intenta de nuevo más tarde.');
                            });
                        }
                    }, 1000);
                }
            }
            else{
                Notiflix.Loading.remove();
                Notiflix.Notify.failure('Stripe rechazo la solicitud, por favor intenta de nuevo más tarde.');
            }
        }, (err: any) => {
            console.error(err);
            Notiflix.Loading.remove();
            Notiflix.Notify.failure('Ocurrió un error al crear el link de pago, por favor intenta de nuevo más tarde.');
        });
    }
}
