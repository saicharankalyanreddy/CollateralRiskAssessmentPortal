import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private route: Router,
    private notification: NotificationsService,
    private http: HttpClient,private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.hide();
   }

  public Login: LoginModel = new LoginModel();

  onSubmit(form: NgForm) {

    if(this.Login.username=="" || this.Login.password==""){
      this.notification.warn('Please Enter Credentials', '', {
        position: ['top', 'right'],
        timeOut: 3000,
        animate: 'fade',
        showProgressBar: true,
      });
      return;
    }
    this.spinner.show();
    
    this.http
    //https://authorizationservicemfpe.azurewebsites.net
      .post<any>('https://authorizationservicemfpe.azurewebsites.net/api/Login', this.Login)
      .subscribe(

        (res) => {
 
          this.spinner.hide();
          if (res.status == 1) {
            this.Login = new LoginModel();
            this.notification.success('Success', 'Logged In', {
              position: ['top', 'Left'],
              timeOut: 4000,
              clearTimeout: 2000,
              animate: 'fade',
              showProgressBar: true,
            });

            localStorage['loggedin'] = true;
            localStorage['token'] = res.token;

            this.route.navigate(['/Home']);

            setTimeout(() => {
              localStorage.clear();
              this.notification.warn('Session Expired', 'Please Login Again', {
                position: ['top', 'right'],
                timeOut: 3000,
                animate: 'fade',
                showProgressBar: true,
              });

              this.route.navigate([""]);

            }, 900000);
          } else {
            this.notification.error('Failed', 'Invalid Credentials', {
              position: ['top', 'right'],
              timeOut: 3000,
              animate: 'fade',
              showProgressBar: true,
            });
          }
        },

        (error) => {
          this.spinner.hide();
          localStorage.clear();

          if(error.status === 401)
          {
            this.notification.error('Session Expired', 'Login Again', {
              position: ['top', 'Left'],
              timeOut: 4000,
              clearTimeout: 2000,
              animate: 'fade',
              showProgressBar: true,
            });
            this.route.navigate([""])
          }
          if((error.status === 404) || (error.status === 0))
          {
            this.notification.error('Server Offline', 'Try Again Later', {
              position: ['top', 'Left'],
              timeOut: 4000,
              clearTimeout: 2000,
              animate: 'fade',
              showProgressBar: true,
            });
            this.route.navigate([""])
          }
          if(error.status === 500)
          {
            this.notification.error('Internal Server Error', 'Login Again', {
              position: ['top', 'Left'],
              timeOut: 4000,
              clearTimeout: 2000,
              animate: 'fade',
              showProgressBar: true,
            });
            this.route.navigate([""])
          }
          console.log(error);
        }
      );
  }
}

class LoginModel {
  username: string = '';
  password: string = '';
}
