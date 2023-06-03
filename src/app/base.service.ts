import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Room } from 'src/room';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  refRoom:AngularFireList<Room>
  constructor(private db:AngularFireDatabase) { 
    this.refRoom=db.list('rooms')
  }

  get(target:string){
    if (target=='rooms') return this.refRoom;
    return null;
  }

  create(target:string, body:any){
    if (target=='rooms') return this.refRoom.push(body);
    return null;
  }
}

