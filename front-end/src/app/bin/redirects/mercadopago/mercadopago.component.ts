import { Component, OnInit } from '@angular/core';
import { PaymentsManagerService } from '../../services/api/payments-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-mercadopago',
  templateUrl: './mercadopago.component.html',
  styleUrls: ['./mercadopago.component.css']
})
export class MercadopagoComponent implements OnInit{

  private _param: string | undefined;
  private usage: string | undefined;

  protected message: string | undefined;
  protected error: string | undefined;

  waiting(route: string){
    setTimeout(() => {
      this.redirect.navigate([route])
    }, 10000);
  }

  constructor(private router: ActivatedRoute, private PaymentsService: PaymentsManagerService, private redirect: Router){}

  ngOnInit(): void {
    this.usage = this.router.snapshot.params['activity']

    if(this.usage === 'success'){
      this.message = 'Verificando integridad del pago de Mercado Pago...';
    }
    else if (this.usage === 'failure'){
      this.message = 'Cancelando pago de Mercado Pago...';
    }
    else if (this.usage === 'pending'){
      this.message = 'Procesando pago pendiente de Mercado Pago...';
    }
    else if(this.usage === 'webhook'){
      
    }
    else{
      this.message = 'URL invalida';
      Notiflix.Notify.failure('Ruta de verificación invalida.', {
        position: 'center-bottom'
      })
    }
  }
}