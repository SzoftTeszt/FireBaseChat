import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedUser=false;
  isLogged:any= new Subject();
  public userData:any;
  constructor(private afAuth:AngularFireAuth, 
    private router:Router,
    private http: HttpClient) {
      this.getIsLogged().subscribe();
     }

  getIsLogged():Observable<any>{
    this.afAuth.authState.subscribe((user)=>{
      console.log(user);
      if (user) {
        this.isLoggedUser=true;
        this.userData=user;
        this.userData.getIdToken().then((token:any)=>{
        this.userData.token=token;
        console.log("Token",  this.userData.token);
        this.getClaims(this.userData.uid).subscribe(
          (c) => {            
            this.userData.claims = c; 
            console.log("cLAIMS",  this.userData.claims)          
        }
        )
        })
        console.log("UID",this.userData.uid);
       
      }
      else {
        this.isLoggedUser=false;
        this.userData=null;
      }
      this.isLogged.next(this.isLoggedUser);
    });
    return this.isLogged;
  }

  SignUp(email:string, password:string)
  {
    return this.afAuth.createUserWithEmailAndPassword(email,password)
    
  }
  SignIn(email:string, password:string)
  {
    return this.afAuth.signInWithEmailAndPassword(email,password);
  }
  SignOut()
  {
    return this.afAuth.signOut();
  }

  GoogleAuth(){
    return this.AuthLogin(new GoogleAuthProvider())
  }

  AuthLogin(provider:any){
    // return this.afAuth.signInWithPopup(provider);
    return this.afAuth.signInWithRedirect(provider);
  }
  SendVerificationEmail(){
    return this.afAuth.currentUser
      .then((u:any)=>u.sendEmailVerification())
      .then(()=>this.router.navigate(['/verifyemail']))
      .catch((error)=>{alert(error.message)});
  }

  ForgotPassword(email:string){
    return this.afAuth.sendPasswordResetEmail(email);
  }

  setCustomClaims(uid:string, claims:string){
    const url="https://us-central1-oldchat-5c6d7.cloudfunctions.net/api/setCustomClaims";
    
    // const uid = this.userData.uid;
    // const claims= {admin:true};

    const body ={uid, claims};
    console.log("Body", body);

    const headers = 
    new HttpHeaders().set('Authorization', this.userData.token);
    console.log("");
    console.log("Token: ", this.userData.token);

    this.http.post(url,body, {headers}).subscribe({
      next:()=>{console.log("A claims beállítása sikeres!!")},
      error:(err)=>{console.log("Hiba a claims beállításakor", err)}
    })
  }

  getUsers(){
    const headers = 
    new HttpHeaders().set('Authorization', this.userData.token);
    const url="https://us-central1-oldchat-5c6d7.cloudfunctions.net/api/users";
    return this.http.get(url, {headers});
  }

  getClaims(uid: string){
    const headers = 
    new HttpHeaders().set('Authorization', this.userData.token);
    const url=`https://us-central1-oldchat-5c6d7.cloudfunctions.net/api/users/${uid}/claims`;
    return this.http.get(url, {headers});
  }

}
