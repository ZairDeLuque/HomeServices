import { Component, Input, OnInit } from '@angular/core';
import { UsersgestorService } from '../../services/api/usersgestor.service';
import * as Notiflix from 'notiflix';
import { ServicesGestorService } from '../../services/api/services-gestor.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';
import { ResponseCommentarysComponent } from '../response-commentarys/response-commentarys.component';

interface Commentary{
  label: string;
  content: string;
  date: Date;
  id: any;
}

@Component({
  selector: 'app-commentaryandwrite',
  templateUrl: './commentaryandwrite.component.html',
  styleUrls: ['./commentaryandwrite.component.css'],
  providers: [DialogService]
})
export class CommentaryandwriteComponent implements OnInit{
  protected nameLetter: string = '';
  protected isLog: boolean = false;

  private currentDate: Date = new Date();

  protected commentarys: Commentary[] = [];

  protected isMy: boolean = false;

  protected content: string | undefined;

  private ref: DynamicDialogRef | undefined;

  @Input()
  subject?: string;

  whatUUID(): string {
    if(localStorage.getItem('uu0x0')){
      return localStorage.getItem('uu0x0')!;
    }
    else{
      return sessionStorage.getItem('uu0x0')!; 
    }
  }

  constructor(private userAPI: UsersgestorService, private serviceAPI: ServicesGestorService, private _dialog: DialogService) {}

  ngOnInit(): void{
    
    const uuid = this.whatUUID();
    
    if(uuid){
      this.onGetData();
      this.isLog = true;

      const packet = {
        _uuid: uuid
      }
  
      this.userAPI.obtainUserData(packet).subscribe(
        result => {
          const userName = result.result.fn0x4
  
          this.nameLetter = userName.charAt(0);
        },
        error => {
          console.error(error)
        }
      )
    }
    else{
      this.isLog = false;
    }
  }

  isMyService(){
    const json = {
      _uuid: this.subject,
      _owner: this.whatUUID()
    }

    this.serviceAPI.isMyService(json).subscribe(result => {
      if(result.getter != false){
        if(result.isMy === true){
          this.isMy = true;
        }
        else{
          this.isMy = false;
        }
      } 
    }, error => {
      console.error(error.message)
    })
  }

  onGetData(){
    const packet = {
      id: this.subject
    }

    this.commentarys = [];

    this.serviceAPI.getCommentarys(packet).subscribe((result: any) => {

      if(result){
        this.isMyService();

        result.content.forEach(async (element: any) => {
          const commentary: Commentary = {
            label: element.label.toUpperCase(),
            content: element.content,
            date: await this.transformData(element.date),
            id: element.id
          }

          this.commentarys.push(commentary);
        });
      }
    }, error => {
      console.error(error.message)
    })
  }

  onSubmit(){
    if(this.content){
      if(this.content.length > 0)
      {
        const packet = {
          _uuid: this.whatUUID(),
          id: this.subject,
          text: this.content
        }

        this.content = '';

        this.serviceAPI.createCommentary(packet).subscribe(result => {
          Notiflix.Notify.success('Comentario creado con exito!', {
            position: 'center-bottom'
          });
          window.location.reload();
        }, error => {
          console.error(error.message)
          Notiflix.Notify.failure('No se pudo crear el comentario :(', {
            position: 'center-bottom'
          })
        })
      }
    }
    else{
      Notiflix.Notify.failure('Es imposible mandar un mensaje vacio >:(', {
        position: 'center-bottom'
      })
    }
  }

  transformData(dateServer: string): Promise<any>{
    return new Promise((resolve, reject) => {
      const date = new Date(dateServer);

      // Calcula la diferencia en días, meses y años
      const daysDifference = differenceInDays(this.currentDate, date);
      const monthsDifference = differenceInMonths(this.currentDate, date) % 12;
      const yearsDifference = differenceInYears(this.currentDate, date);

      let message = 'Publicado ';

      if (yearsDifference > 0) {
        message = 'Hace ' + yearsDifference + (yearsDifference > 1 ? ' años' : ' año');
      } 
      else if (monthsDifference > 0) {
        message = 'Hace ' + monthsDifference + (monthsDifference > 1 ? ' meses' : ' mes');
      } 
      else if (daysDifference === 0){
        message = 'Hoy'
      }
      else {
        message = 'Hace ' + daysDifference + (daysDifference > 1 ? ' días' : ' día');
      }

      resolve(message)
    })
  }

  responseCommentary(idCommentary: any){
    this.ref = this._dialog.open(ResponseCommentarysComponent, {
      data: {
        id: idCommentary,
        writer: this.whatUUID(),
      },
      header: 'Responder a un comentario',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '40%'
    })

    this.ref.onClose.subscribe((results: any) => {
      // console.log(results)
      if(results){
        this.onGetData();
      }
    })
  }

}
