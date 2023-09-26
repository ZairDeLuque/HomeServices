import { Component, OnInit } from '@angular/core';
import { TinyService } from '../../services/navbars/customization/tiny.service';

@Component({
  selector: 'app-navbar-tiny',
  templateUrl: './navbar-tiny.component.html',
  styleUrls: ['./navbar-tiny.component.css']
})
export class NavbarTinyComponent implements OnInit{
  protected data: string = '';
  protected visible: boolean = false;

  constructor(private _custom: TinyService){
    this.data = this._custom.getChangeValue().getValue();
  }
  
  ngOnInit(): void {
    this._custom.newChange$.subscribe(() => {
      this.data = this._custom.getChangeValue().getValue();
      this.visible = true;
    })
  }
}
