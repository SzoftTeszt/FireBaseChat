import { Component, Output, EventEmitter } from '@angular/core';
import { BaseService } from '../base.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent {
  rooms:any;
  newRoom:any={};

  @Output() toggle: EventEmitter<any> = new EventEmitter();

  constructor(private base:BaseService){
    this.base.get("rooms")?.snapshotChanges().pipe(
      map(ch=>ch.map(c=>({key:c.payload.key, ...c.payload.val()}))
    )).subscribe({
      next:adat=>this.rooms=adat,
      error:err=>console.log(err)
    })
  }

  onCreate(body:any){
    this.base.create("rooms", body)?.then(()=>this.newRoom={})
  }

  toggleRoom(room:any){
    console.log("Szoba",room);
    this.toggle.emit(room);
  }
}
