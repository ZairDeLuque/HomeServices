import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-commentaryandwrite',
  templateUrl: './commentaryandwrite.component.html',
  styleUrls: ['./commentaryandwrite.component.css']
})
export class CommentaryandwriteComponent implements OnInit{
  @Input()
  subject?: string;

  constructor() {}

  ngOnInit() {
  }
}
