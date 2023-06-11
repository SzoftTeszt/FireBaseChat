import { Component, Output } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})

export class ForgotpasswordComponent {

  userEmailAddress=""
constructor(private authService:AuthService){
  this.userEmailAddress=this.authService.userData?.email;
}
forgotPassword(userEmail:string){
  this.authService.ForgotPassword(userEmail)
  .then(()=>alert("Password reset email sent, check your inbox."))

}
}
