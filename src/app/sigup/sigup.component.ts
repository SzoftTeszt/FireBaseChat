import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sigup',
  templateUrl: './sigup.component.html',
  styleUrls: ['./sigup.component.css']
})
export class SigupComponent {
  constructor(private authService: AuthService, private router:Router){}


  signUp(email:string, password:string){
  this.authService.SignUp(email,password)
      .then(()=>this.authService.SendVerificationEmail())
      .catch((error)=>{alert(error.message)});
  }
  googleAuth(){
    this.authService.GoogleAuth()
      .then(()=>(this.router.navigate(['/home'])))
      .catch((error)=>{alert(error.message)});
    }
  }
