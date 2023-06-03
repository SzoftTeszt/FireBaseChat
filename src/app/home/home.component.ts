import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  openedRooms:any=[];
  openedUsers:any=[];

  toggleRoom(event:any){
    console.log("HomeComp", event)
    let benne=false;
    for (let i = 0; i < this.openedRooms.length; i++) {
      if (this.openedRooms[i].name==event.name)
      {
          benne=true;
          this.openedRooms.splice(i,1);
          break;
      }          
    }
    if (!benne) this.openedRooms.push(event);  
  }
}
