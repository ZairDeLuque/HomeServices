import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit{

  protected usage: string | undefined;
  protected klass: string | undefined;
  protected message: string | undefined;

  constructor(private AR: ActivatedRoute){
    this.usage = this.AR.snapshot.params['status']
  }

  ngOnInit(): void {
    if(this.usage === 'success'){
      this.klass = 'bi bi-check-circle text-success';
      this.message = 'Tu orden fue creada con éxito! Puedes cerrar la ventana.';
    }
    else if(this.usage === 'failed'){
      this.klass = 'bi bi-x-circle text-danger';
      this.message = 'Al parecer hubo un error. Prueba cerrar la ventana.';
    }
    else if(this.usage === 'cancel'){
      this.klass = 'bi bi-x-circle text-danger';
      this.message = 'Tu orden fue cancelada.';
    }
  }

  close(){
    window.close();
  }
}
