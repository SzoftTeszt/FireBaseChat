import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SiginComponent } from './sigin/sigin.component';
import { SigupComponent } from './sigup/sigup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:"user", component:UserComponent},
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:"signin", component:SiginComponent},
  {path:"signup", component:SigupComponent},
  {path:"forgotpassword", component:ForgotpasswordComponent},
  {path:"verifyemail", component:VerifyemailComponent},
];

@NgModule({
 
 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
