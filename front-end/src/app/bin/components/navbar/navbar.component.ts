import { Component, OnInit } from '@angular/core';
import { LoggedService } from '../../services/session/cache/logged.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  protected isCurrentSign: boolean = false;
  
  constructor(private _logService: LoggedService) { }

  ngOnInit(): void {
    this._logService.isSessionLogged().subscribe(log => {
      this.isCurrentSign = log;
    })
  }

  deleteCurrentSesion(): void{
    if(localStorage.getItem('uu0x0')){
      localStorage.removeItem('uu0x0');
      localStorage.removeItem('ac0x1');
    }
    else{
      sessionStorage.removeItem('uu0x0');
      sessionStorage.removeItem('ac0x1');
    }

    window.location.reload();
  }
}
