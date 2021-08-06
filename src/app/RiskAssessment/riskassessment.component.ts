import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-riskassessment',
  templateUrl: './riskassessment.component.html',
  styleUrls: ['./riskassessment.component.css']
})
export class RiskassessmentComponent implements OnInit {

  apireturnedvalues: any;
  riskvalue = 0;
  returnedobj:any;
  displayloader = "";
  riskassesseddate:any;
  primaryBackgroundcolor: string | undefined = "grey";
  secondaryBackgroundcolor: string | undefined = "grey";
  riskcategorytext: string | undefined = "High risk"; 

  collateralId:number=0;

  bigboxstyle = 
  {
    "backgroundColor" : this.primaryBackgroundcolor
  }


  riskcategorystyle = {
    "color": this.primaryBackgroundcolor
  }

  constructor(private http: HttpClient,private dataservice: DataService,private spinner: NgxSpinnerService, private route: Router ,  private notification: NotificationsService) { 

    this.collateralId=this.dataservice.collateralId;
  }

  ngOnInit(): void {
    this.spinner.show();

    
    this.CallCollateralManagementAPI(false);

  
  }

  update(){
    this.CallCollateralManagementAPI(true);
  }

  CallCollateralManagementAPI(Update:boolean)
  {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };


    this.spinner.show();
   
    
    const requeststring = "https://riskmanagementapimspe.azurewebsites.net/RiskAssessment/"+this.collateralId+"/"+Update;
    this.http.get(requeststring,httpOptions).subscribe(response => {
    
    console.log(response);
  
    this.spinner.hide();
    this.returnedobj = response;
    this.riskvalue = this.returnedobj.riskPercentage;  
      this.apireturnedvalues = response;
      this.riskassesseddate=new Date(this.returnedobj.dateAssessed);
      if(this.riskvalue>100){
        this.riskvalue=100;
      }
      if(this.riskvalue < 35)
      {
        this.riskcategorytext = "Low Risk";
        this.bigboxstyle.backgroundColor = lowrisk.color1;
        this.riskcategorystyle.color = lowrisk.color2;
        this.secondaryBackgroundcolor = lowrisk.color2;
      }
      else if(this.riskvalue >=35 && this.riskvalue <70)
      {
        this.riskcategorytext = "Moderate Risk";
        this.bigboxstyle.backgroundColor = moderaterisk.color1;
        this.riskcategorystyle.color = moderaterisk.color2;
        this.secondaryBackgroundcolor = moderaterisk.color2;
      }
      else{
        this.riskcategorytext = "High Risk";
        this.bigboxstyle.backgroundColor = highrisk.color1;
        this.riskcategorystyle.color = highrisk.color2;
        this.secondaryBackgroundcolor = highrisk.color2;
      }
    }, (error) => {
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
      if(error.status === 404)
      {
        
        this.notification.error('Server Offline', 'Try Again', {
          position: ['top', 'Left'],
          timeOut: 4000,
          clearTimeout: 2000,
          animate: 'fade',
          showProgressBar: true,
        });
        this.route.navigate(["Home"])
      }
      if(error.status === 500)
      {
       
        this.notification.error('Internal Server Error', 'Try Again', {
          position: ['top', 'Left'],
          timeOut: 4000,
          clearTimeout: 2000,
          animate: 'fade',
          showProgressBar: true,
        });
        this.route.navigate(["Home"])
      }
          console.log(error);
    })
  }

}

class highrisk 
{
  public static color1 = "#800000";
  public static color2 = "red";
}


class lowrisk 
{
  public static color1 = "#1e5631";
  public static color2 = "green";
}


class moderaterisk 
{
  public static color1 = "#c24e00";
  public static color2 = "orange";
}