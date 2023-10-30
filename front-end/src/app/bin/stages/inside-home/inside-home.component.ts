import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Notiflix from 'notiflix';
import { MessageService } from 'primeng/api';
import { UsersgestorService } from '../../services/api/usersgestor.service';

@Component({
  selector: 'app-inside-home',
  templateUrl: './inside-home.component.html',
  styleUrls: ['./inside-home.component.css']
})
export class InsideHomeComponent implements OnInit{

  protected City: string = '';
  protected Region: string = '';

  protected items = [
    { title: 'Elemento 1', description: 'Este es el elemento 1' },
    { title: 'Elemento 2', description: 'Este es el elemento 2' },
    { title: 'Elemento 3', description: 'Este es el elemento 3' },
    { title: 'Elemento 4', description: 'Este es el elemento 4' },
    { title: 'Elemento 5', description: 'Este es el elemento 5' },
    { title: 'Elemento 6', description: 'Este es el elemento 6' },
    { title: 'Elemento 7', description: 'Este es el elemento 7' },
    { title: 'Elemento 8', description: 'Este es el elemento 8' },
    { title: 'Elemento 9', description: 'Este es el elemento 9' },
    { title: 'Elemento 10', description: 'Este es el elemento 10' }
  ];

  constructor(private route: ActivatedRoute, private _API_: UsersgestorService){}

  ngOnInit(): void {
    let _param: boolean | undefined;

    this.route.queryParams.subscribe(params => {
      _param = params['locate'];
    })

    if(_param){
      this._API_.getLocation().subscribe(
        result => {
          if(result.founded === true){
            Notiflix.Confirm.show('Estamos en lo correcto?', `Tu direccion es ${result.result.city}, ${result.result.region}.`, 'Si, esa es', 'No, quiero cambiar', () => {
              
            }, () => {
              
            })
          }
          else{
            
          }
        },
        error => {
          console.log(error);
        }
      )

    }
  }
}
