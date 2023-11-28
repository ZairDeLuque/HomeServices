import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentsManagerService } from '../../services/api/payments-manager.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class StripeComponent implements OnInit{
  private _param: string | undefined;
  private usage: string | undefined;

  protected message: string | undefined;
  protected error: string | undefined;

  constructor(private router: ActivatedRoute, private PaymentsService: PaymentsManagerService, private redirect: Router){}

  waiting(route: string){
    setTimeout(() => {
      this.redirect.navigate([route])
    }, 10000);
  }

  ngOnInit(): void {
    this.usage = this.router.snapshot.params['activity']

    this.router.queryParams.subscribe(params => {
      this._param = params['payloader'];
    })

    const packet = {
      "id": this._param
    }

    if(this.usage === 'success'){
      this.message = 'Verificando integridad del pago en Stripe...';

      this.PaymentsService.stripeConfirmation(packet).subscribe(
        result => {
          if(result.authorized === true){
            this.waiting('/payment/success')
          }
          else{
            Notiflix.Notify.failure(result.message, {
              position: 'center-bottom'
            })
            this.waiting('/payment/failed')
          }
        },
        error => {
          Notiflix.Notify.failure(error.message, {
            position: 'center-bottom'
          })
          this.message = 'Ha habido un error al verificar el pago en Stripe.'
          this.error = error.message;
          this.waiting('/payment/failed')
        }
      )
    }
    else if (this.usage === 'cancel'){
      this.message = 'Cancelando pago con Stripe...';

      this.PaymentsService.stripeDelete(packet).subscribe(
        result => {
          if(result.delete === true){
            this.waiting('/payment/cancel')
          }
          else{
            Notiflix.Notify.failure(result.message, {
              position: 'center-bottom'
            })
            this.waiting('/payment/failed')
          }
        },
        error => {
          Notiflix.Notify.failure(error.message, {
            position: 'center-bottom'
          })
          this.message = 'Ha habido un error al eliminar el pago en Stripe.'
          this.error = error.message;
          this.waiting('/payment/failed')
        }
      )
    }
    else{
      Notiflix.Notify.failure('Ruta de verificación invalida.', {
        position: 'center-bottom'
      })
      this.waiting('/payment/failed')
    }
  }
}
