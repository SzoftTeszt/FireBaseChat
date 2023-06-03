import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { BaseService } from '../base.service';
import { map } from 'rxjs';
import { RoomMessage } from 'src/roomMessage';


@Component({
  selector: 'app-room-chat',
  templateUrl: './room-chat.component.html',
  styleUrls: ['./room-chat.component.css']
})
export class RoomChatComponent implements OnChanges{
@Input() room:any;
@Output() closeRoom: EventEmitter<any>= new EventEmitter();

messages:any;
message:any;

constructor(private base:BaseService) {
}

getMessages(){
  this.base.getMessages(this.room.name)?.snapshotChanges().pipe(
    map(ch=>ch.map(c=>({key:c.payload.key, ...c.payload.val()}))
  )).subscribe({
    next:adat=>this.messages=adat,
    error:err=>console.log(err)
  })
}

ngOnChanges(changes:SimpleChanges){
  if (changes['room']) {
    this.room=changes['room'].currentValue;
    this.getMessages();
  }
}

createMessage(message:string){
  const newMessage = new RoomMessage();
  newMessage.message=message;
  newMessage.userId="Én";
  newMessage.date=String(new Date().toLocaleString());
  this.base.createMessages(this.room.name, newMessage);


}

close(room:any)
{
  this.closeRoom.emit(room)
}
}
