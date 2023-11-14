import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelSocketService } from './model-socket.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModelManagerService {

  private api_URL = environment.Homework.apiUrl;

  chats: any[] = [];
  roomID: string = '';

  constructor(private http: HttpClient, private ModelSocket: ModelSocketService) {
    this.onListeningMessages();
  }

  createRoom(data: any): Observable<any>{
    return this.http.post<any>(this.api_URL + '/api/v1/post/messages/rooms/create', data);
  }

  getRooms(data: any): Observable<any>{
    return this.http.post<any>(this.api_URL + '/api/v1/post/messages/rooms/get', data);
  }

  deleteRoom(data: any): Observable<any>{
    return this.http.post<any>(this.api_URL + '/api/v1/post/messages/rooms/delete', data);
  }

  joinRoom(roomId: string) {
    this.roomID = roomId;
    this.ModelSocket.io.emit('joinRoom', roomId);
  }

  leaveRoom(roomId: string) {
    this.ModelSocket.io.emit('leaveRoom', roomId);
    this.roomID = '';
    this.chats = [];
  }

  sendNewMessage(packet: any){
    packet.room = this.roomID;
    this.chats.push(packet);
    this.ModelSocket.io.emit('sendMessage', packet);
  }

  onListeningMessages(){
    this.ModelSocket.io.on('receiveMessage', (data) => {
      if(data.roomId == this.roomID){
        data.messageType = 2;
        this.chats.push(data);
      }
    });
  }
  
  clearChats(){
    this.chats = [];
  }
}
