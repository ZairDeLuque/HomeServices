import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersgestorService } from '../../services/api/usersgestor.service';
import { MessageService } from 'primeng/api';
import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit{
  protected UUIDactive: string;
  protected valueStars: number = 5;
  
  protected name: string = '';
  protected isURLPic: boolean = false;
  protected nameLetter: string = '';
  protected URLimage: string = '';

  private currentDate: Date = new Date();
  protected message: string = '';
  
  constructor(private title: Title, private ar: ActivatedRoute, private _API_:UsersgestorService, private NG_MSG: MessageService, private router: Router) {
    this.UUIDactive = this.ar.snapshot.params['uuid']
  }

  transformData(dateServer: string){
    const date = new Date(dateServer);

    // Calcula la diferencia en días, meses y años
    const daysDifference = differenceInDays(this.currentDate, date);
    const monthsDifference = differenceInMonths(this.currentDate, date) % 12;
    const yearsDifference = differenceInYears(this.currentDate, date);

    let message = '';

    if (yearsDifference > 0) {
      message = yearsDifference + (yearsDifference > 1 ? ' años' : ' año');
    } 
    else if (monthsDifference > 0) {
      message = monthsDifference + (monthsDifference > 1 ? ' meses' : ' mes');
    } 
    else if (daysDifference === 0){
      message = 'Es nuevo usuario'
    }
    else {
      message = daysDifference + (daysDifference > 1 ? ' días' : ' día');
    }

    this.message = message + ' en HomeServices®️';
  }
  
  getData(){
    const packet = {
      _uuid: this.UUIDactive
    }

    this._API_.obtainUserData(packet).subscribe(
      result => {
        if(result.exists === false){

          this.router.navigate(['/404'])
        }
        else{
          this.name = result.result.fn0x4;
          this.title.setTitle(this.name + ' | HomeServices®️')

          if(result.result.pp0x5 === 'notassign'){
            this.isURLPic = false;
            this.nameLetter = this.name.charAt(0);
          }
          else{
            this.isURLPic = true;
            this.URLimage = result.result.pp0x5;
          }

          this.transformData(result.result.date0x6)
        }
      },
      error => {
        console.error(error)
        this.NG_MSG.add({severity: 'error', summary: 'Error:(', detail: 'Los servicios han fallado, intente recargar la pagina.', closable: true})
      }
    )
  }

  ngOnInit(): void {
    this.getData();
    
  }
}
