import { Component, Input, OnInit } from '@angular/core';
import { LoggedService } from '../../services/session/cache/logged.service';
import { UsersgestorService } from '../../services/api/usersgestor.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NotificationsComponent } from '../notifications/notifications.component';
import { interval } from 'rxjs';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ServicesGestorService } from '../../services/api/services-gestor.service';
import { SearchService } from '../../services/navbars/customization/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [DialogService]
})
export class NavbarComponent implements OnInit{
  @Input()
  extended?: boolean = true;
  drop?: boolean = true;

  private ref: DynamicDialogRef | undefined;
  protected notifications: number = 0;

  protected isCurrentSign: boolean = false;

  protected userProfile: string = '';
  protected userName: string = ''
  protected isURLPic: boolean = false;

  protected nameLetter: string = '';
  protected URLimage: string = '';

  protected isShopper: boolean = false;
  protected isSeller: boolean = false;
  protected isOrganizer: boolean = false;

  protected sidebarVisible: boolean = false;

  protected searchValue: string = '';

  constructor(private _logService: LoggedService, private readonly userAPI: UsersgestorService, public dialogService: DialogService, private rt: Router, private _serv: ServicesGestorService, private obs: SearchService) {
    
  }

  protected suggests: string[] = [];

  show() {
    this.ref = this.dialogService.open(NotificationsComponent, {
      header: 'Tus notificaciones ('+ this.notifications +')',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      width: '70%'
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

  tpSearch(): void{
    if(this.searchValue.length > 0){
      if(this.obs.getSearchValue().getValue() == null){
        this.obs.setSearchValue('already');
        this.rt.navigate(['/search'], { queryParams: { q: this.searchValue } });
      }
      else{
        this.obs.setSearchValue(this.searchValue);
        this.obs.emitNewSearch();
        this.rt.navigate(['/search'], { queryParams: { q: this.searchValue } });
      }
    }
  }

  getAllinformation(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this._serv.getNavContent().subscribe((result: any) => {
        if(result.get === true){
          for(let i = 0; i < result.data.length; i++){
            this.suggests.push(result.data[i].name0x3);
          }

          resolve(true)
        }
        else{
          resolve(false);
        }
      }, (error: any) => {
        console.log(error);
        Notiflix.Notify.warning('El motor de busqueda no mostrara sugerencias.', {
          position: 'center-bottom'
        })
        reject(false);
      });
    })
  }

  async ngOnInit(){
    const result = await this.getAllinformation();

    if(result !== true){
      this.suggests = [];
    }
    
    this.getLengthNotifications();

    interval(25000).subscribe(() => {
      this.notifications = 0;
      this.getLengthNotifications();
    });

    this._logService.isSessionLogged().subscribe(log => {
      this.isCurrentSign = log;
      
      if(this.isCurrentSign === true){
        this.userProfile = this.whatUUID();

        const packet = {
          _uuid: this.userProfile
        }

        this.userAPI.obtainUserData(packet).subscribe(
          result => {
            if(result.result._t0x3 == '1'){
              this.isShopper = true;
            }
            else if(result.result._t0x3 == '2'){
              this.isSeller = true;
              
            }
            else{
              this.isOrganizer = true;
            }

            this.userName = result.result.fn0x4

            if(result.result.pp0x5 === 'notassign'){
              this.isURLPic = false;
              this.nameLetter = this.userName.charAt(0);
            }
            else{
              this.isURLPic = true;
              this.URLimage = result.result.pp0x5;
            }
          },
          error => {
            console.error(error)
          }
        )
      }
    })
  }

  getLengthNotifications(){
    const json = {
      _id: this.whatUUID()
    }

    this.userAPI.getLengthNotifications(json).subscribe(result => {
      if(result.ok === true){
        this.notifications = result.result;
      }
    }, error => {
      console.error(error);
    })
  }

  runOnce(callback: () => void, delay: number) {
    let timer: string | number | NodeJS.Timeout | null | undefined;
    
    function reset() {
        if (timer) {
        clearTimeout(timer);
        timer = null;
        }
    }
    
    reset();
    timer = setTimeout(() => {
        callback();
        reset();
    }, delay);
  }

  transportWeb(){
    Notiflix.Loading.dots('Descargando datos...',{
      clickToClose: false,
      svgColor: '#a95eff',
      className: 'font-b',
      backgroundColor: '#fff',
      messageColor: '#000'
    })

    this.runOnce(() => {
      this.rt.navigateByUrl('/myaccount/seller/dashboard')
    }, 1000);
  }

  deleteCurrentSesion(): void{
    if(localStorage.getItem('uu0x0')){
      localStorage.removeItem('uu0x0');
      localStorage.removeItem('ac0x1');
      localStorage.removeItem('_token');
    }
    else{
      sessionStorage.removeItem('uu0x0');
      sessionStorage.removeItem('ac0x1');
      sessionStorage.removeItem('_token');
    }

    this.rt.navigateByUrl('/')
  }
}