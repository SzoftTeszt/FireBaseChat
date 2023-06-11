import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent {
  constructor(private authService: AuthService, private router: Router){}

  signIn(email:string,password:string)
  {
    this.authService.SignIn(email, password)
    .then(()=>(this.authService.getIsLogged()
    .subscribe(()=> {if (this.authService.isLoggedUser) this.router.navigate(['/home'])} )))
    .catch((error)=>{alert(error.message)});
  }

  googleAuth(){
    this.authService.GoogleAuth()
      .then(()=>(this.authService.getIsLogged()
      .subscribe(()=> {if (this.authService.isLoggedUser) this.router.navigate(['/home'])} )))
      .catch((error)=>{alert(error.message)});
    }
}
