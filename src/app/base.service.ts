import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Room } from 'src/room';
import { RoomMessage } from 'src/roomMessage';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  refRoom:AngularFireList<Room>
  tomb:Array<szoba>=[];
  constructor(private db:AngularFireDatabase) { 
    this.refRoom=db.list('rooms')
  }

  get(target:string){
    if (target=='rooms') return this.refRoom;
    return null;
  }


  getMessages(melyik:string){
    for(const sor of this.tomb){
      if (sor.name==melyik) return sor.referencia;
    }
    const ujSzoba = new szoba();
    ujSzoba.name=melyik;
    ujSzoba.referencia= this.db.list(melyik);
    this.tomb.push(ujSzoba);
    return this.tomb[this.tomb.length-1].referencia;
  }

  createMessages(melyik:string, message:any){
    return this.db.list(melyik).push(message);
  }

  create(target:string, body:any){
    if (target=='rooms') return this.refRoom.push(body);
    return null;
  }
}

export class szoba{
  name?:string;
  referencia?:AngularFireList<RoomMessage>
}