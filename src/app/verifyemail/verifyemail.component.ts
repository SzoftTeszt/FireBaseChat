import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['./verifyemail.component.css']
})
export class VerifyemailComponent {
  userEmailAddress="";
  constructor(public authService:AuthService){
    //console.log("Email:",this.authService.userData.email);
    this.userEmailAddress=this.authService.userData.email;
  }

  sendVerificationEmail(){
    this.authService.SendVerificationEmail();
  }
}
