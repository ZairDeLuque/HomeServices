import { Component, OnInit } from '@angular/core';
import { LoggedService } from '../../services/session/cache/logged.service';
import { UsersgestorService } from '../../services/api/usersgestor.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  protected isCurrentSign: boolean = false;

  protected userProfile: string = '';
  protected userName: string = ''
  protected isURLPic: boolean = false;

  protected nameLetter: string = '';
  protected URLimage: string = '';

  constructor(private _logService: LoggedService, private readonly userAPI: UsersgestorService) { }

  whatUUID(): string {
    if(localStorage.getItem('uu0x0')){
      return localStorage.getItem('uu0x0')!;
    }
    else{
      return sessionStorage.getItem('uu0x0')!; 
    }
  }

  ngOnInit(): void {
    this._logService.isSessionLogged().subscribe(log => {
      this.isCurrentSign = log;
      
      if(this.isCurrentSign === true){
        this.userProfile = this.whatUUID();

        const packet = {
          _uuid: this.userProfile
        }

        this.userAPI.obtainUserData(packet).subscribe(
          result => {
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