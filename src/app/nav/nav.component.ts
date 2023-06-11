import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  collapse=true;
  isLogged=false;
  SignOut(){
    this.authService.SignOut().then(()=>(this.router.navigate(['/signin'])));

  }
  constructor(public authService:AuthService, private router: Router)
  {
    this.authService.getIsLogged().subscribe(
      (a)=> {
        this.isLogged=a;
        console.log("Hírdetés! Belépve:",this.isLogged);
      }
    )
  }

}
