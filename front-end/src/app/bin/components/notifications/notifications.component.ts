import { Component, OnInit } from '@angular/core';
import { UsersgestorService } from '../../services/api/usersgestor.service';
import { MessageService } from 'primeng/api';
import * as Notiflix from 'notiflix';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

interface Content{
  _read: number,
  id: string,
  title: string,
  subtitle: string,
  severity: number,
  dir: string,
  date0x6: Date
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
  providers: [MessageService]
})
export class NotificationsComponent implements OnInit{

  protected notificationsArray: Content[] = [];

  constructor(private notifications: UsersgestorService, private MG_MSG: MessageService, private redirectable: Router, private _dynamic: DynamicDialogRef) {
    
  }

  ngOnInit(): void {
    this.searchNotifications();

    interval(25000).subscribe(() => {
      this.notificationsArray = []

      this.searchNotifications();
    });
  }

  searchNotifications(){
    
    const packet = {
      "_id": this.whatUUID()
    }

    this.notifications.getNotifications(packet).subscribe(result => {
      if(result.ok === true){
        if(Array.isArray(result.notifications)){
          this.notificationsArray = result.notifications;
        }
        else{
          this.notificationsArray = [result.notifications];
        }
      }
      else{
        this.MG_MSG.add({severity: 'error', summary: 'Oh oh:(', detail: 'No hemos podido obtener tus notificaciones, intenta más tarde.'})
        this.notificationsArray = [];
      }
    }, error => {
      console.log(error);
      this.MG_MSG.add({severity: 'error', summary: 'Oh oh:(', detail: 'No hemos podido obtener tus notificaciones, intenta más tarde.'})
    });
  }

  delete(id: string){
    const packet = {
      "_id": id
    }

    this.notifications.deleteNotifications(packet).subscribe(result => {
      if(result.ok === true){
        this.notificationsArray = []
        
        this.searchNotifications();
      }
      else{
        this.notificationsArray = []
        
        this.searchNotifications();

        Notiflix.Notify.failure(result.message, {
          position: 'center-bottom'
        });
      }
    }, error => {
      this.notificationsArray = []
        
      this.searchNotifications();

      Notiflix.Notify.failure('El servidor no ha respondido como debería, intenta más tarde.', {
        position: 'center-bottom'
      });
    });
  }

  whatUUID(): string {
    if(localStorage.getItem('uu0x0')){
      return localStorage.getItem('uu0x0')!;
    }
    else{
      return sessionStorage.getItem('uu0x0')!; 
    }
  }

  transportWeb(URL: string){
    this.redirectable.navigateByUrl(URL);
    this._dynamic.close();
  }

}
