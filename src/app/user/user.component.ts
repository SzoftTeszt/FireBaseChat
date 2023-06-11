import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users: any;
  isAdmin=false;
  constructor(private auth: AuthService) {
    this.isAdmin=this.auth.userData.claims?.admin;
    this.auth.getUsers().subscribe((u) => {
      this.users = u;
      //console.log(u);
      for (let i = 0; i < this.users.length; i++) {

        if (this.users[i].displayName == null)
          this.users[i].displayName = this.users[i].email;

        this.auth.getClaims(this.users[i].uid).subscribe(
          (c) => {
            this.users[i].claims = c;
            console.log(this.users[i].email, "; null", this.users[i].claims);
          }
        )

      }
    })
  }
  addAdmin() {
    this.auth.setCustomClaims("", "");
  }

  editClaims(claim: string, user: any) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].uid == user.uid) {
        if (!this.users[i].claims){
          this.users[i].claims = {};
          this.users[i].claims[claim] = true;
        }
        else this.users[i].claims[claim] = !this.users[i].claims[claim];
      }

    }

  }
  setClaims(user:any){
    console.log(user.claims);
    this.auth.setCustomClaims(user.uid, user.claims);
  }
}
