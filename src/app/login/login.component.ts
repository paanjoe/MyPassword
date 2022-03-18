import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  public userName: string = '';
  public password: string = '';
  public badlogin: boolean = false;
  public bademail: boolean = false;
  public loginLoading: boolean = false;
  

  constructor(
    private authServices: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void { }

  login() {
    this.loginLoading = true;
    this.authServices.SignIn(this.userName, this.password).then(() => {
      this.loginLoading = false;
      this.authServices.afAuth.authState.subscribe((user) => {
        if(user) {
          this.router.navigate(['dashboard']);
        }
      });
    })
    .catch((res) => {
      this.loginLoading = false;
      if (res.code === 'auth/invalid-email') {
        this.badlogin = false;
        this.bademail = true;
      } else if (res.code === 'auth/user-not-found' || res.code === 'auth/internal-error' || res.code === 'auth/wrong-password') {
        this.bademail = false;
        this.badlogin = true;
      } else { 
        this.badlogin = true;
        this.bademail = false;
      }
    });
  }
}
