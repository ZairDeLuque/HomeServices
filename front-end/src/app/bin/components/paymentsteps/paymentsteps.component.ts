import { Component, Input, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import * as Notiflix from 'notiflix';
import { PaymentsManagerService } from '../../services/api/payments-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesGestorService } from '../../services/api/services-gestor.service';

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

    @Input()
    owner?: string;

    @Input()
    multiple?: number;

    protected formCurrent: FormGroup;

    constructor(private _payments: PaymentsManagerService, private ar: ActivatedRoute, private _dialog: DialogService, private _builder: FormBuilder, private _services: ServicesGestorService, private rt: Router) {

        this.formCurrent = this._builder.group({
            fA0x: ['', Validators.required],
            fB0x: ['', Validators.required],
            fC0x: ['', Validators.required],
            fD0x: ['', Validators.required],
            fE0x: ['', Validators.required],
            fF0x: ['', Validators.required],
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
            onClientAuthorization: async (data) => {
                const dataAuth = await this.sendAllData();

                if(dataAuth === true){
                    Notiflix.Loading.remove();

                    const json = {
                        _uitem: this.ar.snapshot.params['id'],
                        _transaction: data.id,
                        _payer: this.shopper,
                        _price: data.purchase_units[0].amount.value,
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
                            Notiflix.Notify.success('Tu pago se ha realizado con éxito, en unos momentos comenzará el proceso de contratación.', {
                                position: 'center-bottom'
                            });
                            this.rt.navigateByUrl('/')
                        }
                        else{
                            Notiflix.Loading.remove();
                            Notiflix.Notify.failure('PayPal rechazo la solicitud, por favor intenta de nuevo más tarde.', {
                                position: 'center-bottom'
                            });
                        }
                    }, (err: any) => {
                        console.error(err);
                        Notiflix.Loading.remove();
                        Notiflix.Notify.failure('Ocurrió un error al verificar la transacción, por favor intenta de nuevo más tarde.', {
                            position: 'center-bottom'
                        });
                    });
                }
                else{
                    Notiflix.Notify.failure('Ocurrió un error al enviar datos sobre la compra, por favor intenta de nuevo más tarde.', {
                        position: 'center-bottom'
                    });
                }
            },
            onCancel: (data, actions) => {
                Notiflix.Loading.remove();
                Notiflix.Notify.failure('Haz cancelado tu pago, ¿Cambiaras de parecer o de método de pago?.', {
                    position: 'center-bottom'
                });
            },
            onError: err => {
                Notiflix.Loading.remove();
                // console.log('OnError', err);
                Notiflix.Notify.failure('PayPal fracaso en la misión de pago, por favor intenta de nuevo más tarde.', {
                    position: 'center-bottom'
                });
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

    onSubmit(){
        if(this.formCurrent.valid){
            this.active = false;
            this.steps = 1;

            this.runOnce(() => {
                this.active = true;
            }, 1000)
        }
        else{
            Notiflix.Notify.failure('Por favor completa todos los campos.', {
                position: 'center-bottom'
            });
        }
    }

    runOnce(callback: () => void, delay: number) {
        let timer: string | number | NodeJS.Timeout | null | undefined;
        
        function reset() {
            if (timer) {
            clearTimeout(timer);
            timer = null;
            }
        }
        
        reset();
        timer = setTimeout(() => {
            callback();
            reset();
        }, delay);
    }

    sendAllData(): Promise<boolean>{
        return new Promise((res, rej) => {
            Notiflix.Loading.dots('Enviando datos...',{
                clickToClose: false,
                svgColor: '#a95eff',
                className: 'font-b',
                backgroundColor: '#fff',
                messageColor: '#000'
            })
    
            const json = {
                a0x: this.ar.snapshot.params['id'],
                o0x: this.owner,
                s0x: this.shopper,
                sp0x: this.price,
                fA0x: this.formCurrent.controls['fA0x'].value,
                fB0x: this.formCurrent.controls['fB0x'].value,
                fC0x: this.formCurrent.controls['fC0x'].value,
                fD0x: this.formCurrent.controls['fD0x'].value,
                fE0x: this.formCurrent.controls['fE0x'].value,
                fF0x: this.formCurrent.controls['fF0x'].value,
                _multiple: this.multiple
            }
    
            this._services.purchaseStep1(json).subscribe((result: any) => {
                if(result.success === true){
                    Notiflix.Loading.remove();
                    res(true);
                }
            }, (err: any) => {
                console.error(err);
                Notiflix.Notify.failure('Ocurrió un error al enviar datos sobre la compra, por favor intenta de nuevo más tarde.', {
                    position: 'center-bottom'
                });
                Notiflix.Loading.remove();
                rej(false);
            });
        })
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
            _payer: this.shopper,
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

                            this._payments.mercadopagoConfirmation(json2).subscribe(async (res2: any) => {
                                Notiflix.Loading.dots('Verificando respuesta...',{
                                    clickToClose: false,
                                    svgColor: '#a95eff',
                                    className: 'font-b',
                                    backgroundColor: '#fff',
                                    messageColor: '#000'
                                })

                                if(res2.status == 'approved'){
                                    Notiflix.Loading.remove();

                                    const data = await this.sendAllData();

                                    if(data === true){
                                        Notiflix.Notify.success('Tu pago se ha realizado con éxito, en unos momentos comenzará el proceso de contratación.', {
                                            position: 'center-bottom'
                                        });
                                        this.rt.navigateByUrl('/')
                                    }
                                    else{
                                        Notiflix.Notify.failure('Ocurrió un error al enviar datos sobre la compra, por favor intenta de nuevo más tarde.', {
                                            position: 'center-bottom'
                                        });
                                    }
                                }
                                else if(res2.status == 'cancelled'){
                                    Notiflix.Loading.remove();
                                    Notiflix.Notify.failure('Tu pago se ha cancelado. En breve te enviaremos al inicio de HomeServices®.', {
                                        position: 'center-bottom'
                                    });
                                    this.runOnce(() => {
                                        this.rt.navigateByUrl('/')
                                    }, 2000)
                                }
                                else{
                                    Notiflix.Notify.failure('Mercado Pago fracaso en la misión de pago, por favor intenta de nuevo más tarde.', {
                                        position: 'center-bottom'
                                    });
                                }
                            }, (err2: any) => {
                                console.error(err2)
                                Notiflix.Loading.remove();
                                Notiflix.Notify.failure('Mercado Pago rechazo la solicitud, por favor intenta de nuevo más tarde.', {
                                    position: 'center-bottom'
                                });
                            });
                        }
                    }, 1000);
                }
            }
            else{
                Notiflix.Loading.remove();
                Notiflix.Notify.failure('Mercado Pago rechazo la solicitud, por favor intenta de nuevo más tarde.', {
                    position: 'center-bottom'
                });
            }
        }, (err: any) => {
            console.error(err);
            Notiflix.Loading.remove();
            Notiflix.Notify.failure('Ocurrió un error al crear el link de pago, por favor intenta de nuevo más tarde.', {
                position: 'center-bottom'
            });
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
            _payer: this.shopper,
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

                            this._payments.mercadopagoConfirmation(json2).subscribe(async (res2: any) => {
                                Notiflix.Loading.dots('Verificando respuesta...',{
                                    clickToClose: false,
                                    svgColor: '#a95eff',
                                    className: 'font-b',
                                    backgroundColor: '#fff',
                                    messageColor: '#000'
                                })

                                if(res2.status == 'approved'){
                                    Notiflix.Loading.remove();

                                    const data = await this.sendAllData();

                                    if(data === true){
                                        Notiflix.Notify.success('Tu pago se ha realizado con éxito, en unos momentos comenzará el proceso de contratación.', {
                                            position: 'center-bottom'
                                        });
                                        this.rt.navigateByUrl('/')
                                    }
                                    else{
                                        Notiflix.Notify.failure('Ocurrió un error al enviar datos sobre la compra, por favor intenta de nuevo más tarde.', {
                                            position: 'center-bottom'
                                        });
                                    }
                                }
                                else if(res2.status == 'cancelled'){
                                    Notiflix.Loading.remove();
                                    Notiflix.Notify.failure('Tu pago se ha cancelado. En breve te enviaremos al inicio de HomeServices®.', {
                                        position: 'center-bottom'
                                    });
                                    this.runOnce(() => {
                                        this.rt.navigateByUrl('/')
                                    }, 2000)
                                }
                                else{
                                    Notiflix.Notify.failure('Stripe fracaso en la misión de pago, por favor intenta de nuevo más tarde.', {
                                        position: 'center-bottom'
                                    });
                                }
                            }, (err2: any) => {
                                console.error(err2)
                                Notiflix.Loading.remove();
                                Notiflix.Notify.failure('Stripe rechazo la solicitud, por favor intenta de nuevo más tarde.', {
                                    position: 'center-bottom'
                                });
                            });
                        }
                    }, 1000);
                }
            }
            else{
                Notiflix.Loading.remove();
                Notiflix.Notify.failure('Stripe rechazo la solicitud, por favor intenta de nuevo más tarde.', {
                    position: 'center-bottom'
                });
            }
        }, (err: any) => {
            console.error(err);
            Notiflix.Loading.remove();
            Notiflix.Notify.failure('Ocurrió un error al crear el link de pago, por favor intenta de nuevo más tarde.', {
                position: 'center-bottom'
            });
        });
        
    }
}
