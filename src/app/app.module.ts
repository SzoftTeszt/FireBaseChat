import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RoomChatComponent } from './room-chat/room-chat.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { enviroments } from './enviroments';
import { FormsModule } from '@angular/forms';
import { SiginComponent } from './sigin/sigin.component';
import { SigupComponent } from './sigup/sigup.component';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UserComponent } from './user/user.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    RoomsListComponent,
    UsersListComponent,
    RoomChatComponent,
    HomeComponent,
    SiginComponent,
    SigupComponent,
    VerifyemailComponent,
    ForgotpasswordComponent,
    UserComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(enviroments.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
