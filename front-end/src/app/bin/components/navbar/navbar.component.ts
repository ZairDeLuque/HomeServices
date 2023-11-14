import { Component, Input, OnInit } from '@angular/core';
import { LoggedService } from '../../services/session/cache/logged.service';
import { UsersgestorService } from '../../services/api/usersgestor.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NotificationsComponent } from '../notifications/notifications.component';
import { interval } from 'rxjs';

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

  constructor(private _logService: LoggedService, private readonly userAPI: UsersgestorService, public dialogService: DialogService) { }

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

  ngOnInit(): void {
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

    window.location.reload();
  }
}