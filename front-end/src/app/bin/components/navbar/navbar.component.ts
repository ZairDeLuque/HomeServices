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
}
