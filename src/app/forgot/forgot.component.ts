import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-services.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  public userName: string = '';
  public forgotLoading: boolean = false;
  public recoverSuccess: boolean = false;
  public recoverFailed: boolean = false;

  constructor(
    private authServices: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  recover() {
    this.forgotLoading = true;
    this.authServices.ForgotPassword(this.userName).then(() => {
      this.forgotLoading = false;
      this.recoverSuccess = true;
      this.router.navigate(['login']);
    }).catch((err) => {
      this.recoverFailed = true;
      this.recoverSuccess = false;
      this.forgotLoading = false;
      console.log(err);
    });
  }

}
