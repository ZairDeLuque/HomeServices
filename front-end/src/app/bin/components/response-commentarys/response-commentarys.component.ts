import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-response-commentarys',
  templateUrl: './response-commentarys.component.html',
  styleUrls: ['./response-commentarys.component.css'],
})
export class ResponseCommentarysComponent implements OnInit{

  protected content: string | undefined;

  private id: string | undefined;
  private writer: string | undefined;
  
  constructor(private _dynamic: DynamicDialogRef, private _config: DynamicDialogConfig){}

  get lengthContent(): boolean{
    return this.content?.length === 0 || this.content?.length === undefined ? true : false;
  }

  ngOnInit(): void {
    this.id = this._config.data.id;
    this.writer = this._config.data.writer;
  }

  onSubmit(){
    this._dynamic.close({uploaded: true})
  }
}
