import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/navbars/customization/search.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  protected currentQuery: string | null = null;

  constructor(private ar: ActivatedRoute, private obs: SearchService, private title: Title) { }

  ngOnInit(): void {
    
    if(this.currentQuery == null){
      this.currentQuery = this.ar.snapshot.queryParams['q'];
    }
    
    this.obs.newSearch$.subscribe(() => {
      this.currentQuery = this.obs.getSearchValue().getValue();
    })

    this.title.setTitle('Busqueda para: ' + this.currentQuery + ' | HomeServices®')
  }


}
