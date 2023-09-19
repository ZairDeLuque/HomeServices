import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-response-commentarys',
  templateUrl: './response-commentarys.component.html',
  styleUrls: ['./response-commentarys.component.css']
})
export class ResponseCommentarysComponent implements OnInit{
  @Input()
  itsOwner?: boolean;

  constructor(){}

  ngOnInit(): void {
      
  }
}
