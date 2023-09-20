import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent {
  protected items: MenuItem[];
  protected home: MenuItem;
  
  protected images: any[] = [
    {
      itemImageSrc: 'https://http2.mlstatic.com/D_NQ_NP_957919-MLU54972894434_042023-O.webp'
    },
    {
      itemImageSrc: 'https://http2.mlstatic.com/D_NQ_NP_631919-MLU54967277823_042023-O.webp'
    },
    {
      itemImageSrc: 'https://http2.mlstatic.com/D_NQ_NP_649249-MLU54972894436_042023-O.webp'
    }  
  ];

  protected responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];

  constructor(){
    this.items = [{ label: 'Artículos' }, { label: 'Moda' }, { label: 'Accesorios' }, { label: 'ArticuloName' }];
    this.home = { icon: 'bi bi-house', routerLink: '/' };
  }
}
