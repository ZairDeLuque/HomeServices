import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-homestep3',
  templateUrl: './homestep3.component.html',
  styleUrls: ['./homestep3.component.css'],
  providers: [MessageService]
})
export class Homestep3Component implements OnInit{
  constructor(private NG_MSG: MessageService){}

  ngOnInit(): void{}
}
