import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-portalhome',
  templateUrl: './portalhome.component.html',
  styleUrls: ['./portalhome.component.css'],
})
export class PortalhomeComponent implements OnInit {
  items: any;
  searchcustomerid: number | undefined;
  searchloanid: number | undefined;
  alertmessage = "";
  itemsearch: any;
  itemsearchdone = false;
  constructor(private dataservice: DataService, 
    private http: HttpClient, 
    private route: Router,  
    private notification: NotificationsService,
    private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getUsers();
  }


  startsearch()
  {
    this.spinner.show();
    var element = document.getElementById("alerts") as HTMLElement;
    if((this.searchcustomerid == undefined)||(this.searchloanid == undefined))
      {
        
        element.style.display = "block";
        this.alertmessage = "No fields should be empty";
        return;
      }
      else if((this.searchcustomerid > 999999)||(this.searchloanid > 999999))
      {
        element.style.display = "block";

        this.alertmessage = "Loan ID/ Collateral ID should be max 6 digits";
        return;
      }
      else if((this.searchcustomerid < 0)||(this.searchloanid < 0))
      {
        element.style.display = "block";

        this.alertmessage = "Invalid Details";
        return;
      }
      element.style.display = "none";

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }),
        
      };
      //https://localhost:5001/api/LoanManagement/getsanctionedloans/
      this.http
        .get(
          'https://loanmanagementservice.azurewebsites.net/api/LoanManagement/getsanctionedloans/'+this.searchloanid+'/'+this.searchcustomerid,
          httpOptions
        )
        .subscribe(
          (response) => { 
            console.log(response);
            this.spinner.hide();
            this.itemsearch = response;
            this.itemsearch = this.itemsearch[0];
            if(this.itemsearch==undefined){
              element.style.display = "block";
              this.itemsearchdone=false;
              this.alertmessage = "Not Found";
              return;
            }
            this.itemsearchdone = true;
            
          },err=>{
            console.log(err);
            this.spinner.hide();
          }
        );

  }


  getUsers() {


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      
    };
    this.http
      .get(
        'https://loanmanagementservice.azurewebsites.net/api/LoanManagement/getsanctionedloans',
        httpOptions
      )
      .subscribe(
        (response) => {
         
          this.spinner.hide();
          this.items = response;

          this.items.sort(function (a:any, b:any) {
            return a.loanId - b.loanId;
          });
   

          console.log(response);
    
        },
        (error) => {
          this.spinner.hide();

          if(error.status === 401)
          {
            localStorage.clear();
            this.notification.error('Session Expired', 'Login Again', {
              position: ['top', 'Left'],
              timeOut: 4000,
              clearTimeout: 2000,
              animate: 'fade',
              showProgressBar: true,
            });
            this.route.navigate([""])
          }
          if(error.status === 404 || error.status === 0)
          {
            localStorage.clear();
            this.notification.error('Server Offline', 'Try Again Later', {
              position: ['top', 'Left'],
              timeOut: 4000,
              clearTimeout: 2000,
              animate: 'fade',
              showProgressBar: true,
            });
            this.route.navigate([""])
          }
          if(error.status === 500 )
          {
            localStorage.clear();
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

  senddets(des: string, loanid: any,customerid:any,collateralId:any) {
    // console.log("dsfsdf " + des );
    this.dataservice.setdataforforms(des, loanid,customerid,collateralId);
  }

  senddatatoriskassess(collateralid:any){
    this.dataservice.collateralId=collateralid;
  }

  logout(){
    localStorage.clear();
    this.route.navigate([""]);

  }
}
