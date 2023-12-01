import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/navbars/customization/search.service';
import { Title } from '@angular/platform-browser';
import { ServicesGestorService } from '../../services/api/services-gestor.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  protected services: any[] = [];

  protected currentQuery: string | null = null;

  protected rangeValues: number[] = [0, 5000];
  protected selected: string = 'Todos';
  protected explicit: boolean = false;

  private delta_a: number[] = [0, 5000];
  private delta_b: string = 'Todos';
  private delta_c: boolean = false;

  constructor(private ar: ActivatedRoute, private obs: SearchService, private title: Title, private _api: ServicesGestorService) {}

  generateFilterTemplate(): string{
    let template = '';

    if(this.rangeValues[0] !== 0 || this.rangeValues[1] !== 5000){
      template += 'AND (price0x5 >=' + this.rangeValues[0] + ' AND price0x5 <=' + this.rangeValues[1] + ') '
    }

    if(this.selected !== 'Todos'){
      template += 'AND ttp0x6 = \'' + this.selected + '\' '
    }

    if(this.explicit === true){
      template += 'AND (explicit0x10 = \'n\' OR explicit0x10 = \'y\')' 
    }

    return template;
  }

  get isDisabled(): boolean{
    
    let disabled = false;

    if(this.rangeValues[0] !== this.delta_a[0]){
      disabled = true;
    }

    if(this.rangeValues[1] !== this.delta_a[1]){
      disabled = true;
    }

    if(this.selected !== this.delta_b){
      disabled = true;
    }

    if(this.explicit !== this.delta_c){
      disabled = true;
    }

    return disabled;
  }

  generateNewSearch(): void{

    this.delta_a = this.rangeValues;
    this.delta_b = this.selected;
    this.delta_c = this.explicit;

    Notiflix.Loading.dots('Buscando...');

    this.searchInformation(true).then(() => {
      Notiflix.Loading.remove();
    }).catch(() => {
      Notiflix.Loading.remove();
    })
  }

  searchInformation(filters: boolean): Promise<boolean>{
    return new Promise(async (resolve, reject) => {
      if(filters === false){
        const packet = {
          _search: this.currentQuery,
        }

        this._api.getWithFilter(packet).subscribe((data: any) => {
          if(data.success === true){
            this.services = data.data;
            resolve(true);
          }
          else{
            this.services = [];
            resolve(true)
          }
        }, (error: any) => {
          console.error(error)
          Notiflix.Notify.failure('Ha ocurrido un error al buscar los servicios. Recargue la página e intente nuevamente.', {
            position: 'center-bottom'
          })
          Notiflix.Loading.remove()
          reject(false)
        })
      }
      else{

        const templateSQL = await this.generateFilterTemplate();
        
        const packet = {
          _search: this.currentQuery,
          _template: templateSQL
        }

        this._api.getWithFilter(packet).subscribe((data: any) => {
          if(data.success === true){
            this.services = data.data;
            resolve(true);
          }
          else{
            this.services = [];
            resolve(true)
          }
        }, (error: any) => {
          console.error(error)
          Notiflix.Notify.failure('Ha ocurrido un error al buscar los servicios. Recargue la página e intente nuevamente.', {
            position: 'center-bottom'
          })
          Notiflix.Loading.remove()
          reject(false)
        })
      }
    })
  }

  async ngOnInit(){
    if(this.currentQuery == null){
      this.currentQuery = this.ar.snapshot.queryParams['q'];
    }
    
    this.obs.newSearch$.subscribe(() => {
      this.currentQuery = this.obs.getSearchValue().getValue();
    })

    const search = await this.searchInformation(false);

    if(search === true){
      Notiflix.Loading.remove()
    }

    this.title.setTitle('Busqueda para: ' + this.currentQuery + ' | HomeServices®')
  }

}
