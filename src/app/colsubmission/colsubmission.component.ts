import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-colsubmission',
  templateUrl: './colsubmission.component.html',
  styleUrls: ['./colsubmission.component.css'],
})
export class ColsubmissionComponent implements OnInit {
  selectvalue: any = 'select type';
  collateral_description: any;
  collateral_loanid: any;
  formdata: any;
  value: any;
  collateral_customerid: any;
  collateralid: any;

  today:any;

  property = {
    LoanId: 0,
    CustomerId: 0,
    CollateralId: 0,
    LandOwner: 'string',
    LandAddress: 'string',
    LandArea: 0,
    LandCurrentvalue: 0,
    LandDepriciationRate: 0,
    LandPledgedDate: Date(),
    PropertyYear: 0,
    CollateralType: '',
  };

  house = {
    LoanId: 0,
    CustomerId: 0,
    CollateralId: 0,
    HouseOwner: 'string',
    HouseAddress: 'string',
    HouseArea: 0,
    HouseYear: 0,
    HouseCurrentvalue: 0,
    HouseDeprecationRate: 0,
    CollateralType: '',
    HousePledgedDate: Date(),
    HouseCurrentStructureValue: 0,
  };

  gold = {
    LoanId: 0,
    CustomerId: 0,
    CollateralId: 0,
    GoldOwner: '',
    Weight: 0,
    GoldValue: 0,
    YearInGoldBought: 0,
    GoldPledgedDate: Date,
    CollateralType: '',
    GoldDepriciationRate: 0,
  };

  constructor(private dataservice: DataService, private http: HttpClient,private notification: NotificationsService,private route: Router,private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    
    this.today = now.getFullYear() + "-" + (month) + "-" + (day);


    this.collateral_description = this.dataservice.getdataforforms();
    this.collateral_loanid = this.dataservice.focusedloanid;
    this.collateral_customerid = this.dataservice.getdataidforforms();
    this.collateralid = this.dataservice.collateralId;
    // console.log("DATTAA SERVICE {{{" + this.collateral_description +"  weda" + this.dataservice.getdataforforms());
    this.formdata = new FormGroup({
      colid: new FormControl([Validators.required,
      Validators.minLength(4),]),
      typ: new FormControl(),
      pn: new FormControl(),
      pa: new FormControl(),
      pc: new FormControl(),
      pd: new FormControl(),
      parea: new FormControl(),
      propertypledged: new FormControl(),
      propertyyear: new FormControl(),

      hn: new FormControl(),
      ha: new FormControl(),
      hc: new FormControl(),
      hd: new FormControl(),
      harea: new FormControl(),
      hyear: new FormControl(),
      housepledged: new FormControl(),
      currentstructurevalue: new FormControl(),

      gn: new FormControl(),
      ga: new FormControl(),
      gc: new FormControl(),
      gd: new FormControl(),
      goldpledged: new FormControl(),
      golddepreciation: new FormControl(),
      goldyear: new FormControl()
    });
  }

  submitform(data: any) {
    this.spinner.show();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    console.log(data);
    this.value = data.pa;
    var errorMessage = 'oh no!';
    //if the type of collateral is property then we only send property details to property specific api
    if (data.typ == 1) {
      this.property.LandAddress = this.formdata.pa;
      this.property.LandCurrentvalue = this.formdata.pc;
      this.property.LandDepriciationRate = this.formdata.pd;
      this.property.LandOwner = this.formdata.pn;

      this.property.LandArea = this.formdata.parea;
      this.property.LoanId = this.collateral_loanid;
      this.property.LandPledgedDate = this.formdata.propertypledged;
      this.property.CollateralType = 'Land';
      this.property.CustomerId = this.collateral_customerid;
      this.property.CollateralId = this.collateralid;
      this.property.PropertyYear = this.formdata.propertyyear;

      console.log(this.property);
      this.http
        .post<any>(
          'https://loanmanagementservice.azurewebsites.net/api/LoanManagement/savecollateral',
          this.property,
          httpOptions
        )
        .subscribe(
          (response) => {
            console.log(response["saved"]);
            this.spinner.hide();

            if(response["saved"])
            {

              var x = document.getElementById("full") as HTMLElement;
              var y = document.getElementById("fullcontainer") as HTMLElement;
        x.style.display = "grid";
        y.style.display="none";
            }
            else {
              
              this.notification.error('Error Faced', 'Check if All the Services are Running', {
                position: ['top', 'Left'],
                timeOut: 4000,
                clearTimeout: 2000,
                animate: 'fade',
                showProgressBar: true,
              });
  
            }
            // console.log(response);
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
            
          }
        );
    }

    //if the type of collateral is Vehicle then we only send vehicle details to vehicle specific api
    //if the type of collateral is House then we only send house details to house specific api
    else if (data.typ == 2) {
      this.house.HouseOwner = this.formdata.hn;
      this.house.HouseAddress = this.formdata.ha;
      this.house.HouseCurrentvalue = this.formdata.hc;
      this.house.HouseDeprecationRate = this.formdata.hd;

      this.house.HouseArea = this.formdata.harea;
      this.house.HouseYear = this.formdata.hyear;
      this.house.LoanId = this.collateral_loanid;
      this.house.HousePledgedDate = this.formdata.housepledged;
      this.house.CollateralType = 'House';
      this.house.CustomerId = this.collateral_customerid;
      this.house.HouseCurrentStructureValue = this.formdata.currentstructurevalue;
      this.house.CollateralId = this.collateralid;

      console.log(this.house);
      this.http
        .post<any>(
          'https://loanmanagementservice.azurewebsites.net/api/LoanManagement/savecollateral',
          this.house,
          httpOptions
        )
        .subscribe(
          (response) => {
            console.log(response);
            this.spinner.hide();
            if(response["saved"]){
              var x = document.getElementById("full") as HTMLElement;
              var y = document.getElementById("fullcontainer") as HTMLElement;
        x.style.display = "grid";
        y.style.display="none";
            }
            else {
              this.notification.error('Error Faced', 'Check if All the Services are Running', {
                position: ['top', 'Left'],
                timeOut: 4000,
                clearTimeout: 2000,
                animate: 'fade',
                showProgressBar: true,
              });
  
            }
            // console.log(response);
          },
          (error) => {
            console.log(error);
            this.spinner.hide();

            if(error.status === 401){
              localStorage.clear();
  
              this.notification.error('Session Expaired', 'Login Again', {
                position: ['top', 'Left'],
                timeOut: 4000,
                clearTimeout: 2000,
                animate: 'fade',
                showProgressBar: true,
              });
              this.route.navigate([""])
            }
          }
        );
    } else if (data.typ == 4) {
      (this.gold.LoanId = this.collateral_loanid),
        (this.gold.GoldOwner = this.formdata.gn),
        (this.gold.Weight = this.formdata.ga),
        (this.gold.GoldValue = this.formdata.gc),
        (this.gold.GoldPledgedDate = this.formdata.goldpledged);
      this.gold.CollateralType = 'Gold';
      this.gold.CustomerId = this.collateral_customerid;
      this.gold.GoldDepriciationRate = this.formdata.golddepreciation;
      this.gold.CollateralId = this.collateralid;
      this.gold.YearInGoldBought = this.formdata.goldyear;

      console.log(this.gold);

      this.http
        .post<any>(
          'https://loanmanagementservice.azurewebsites.net/api/LoanManagement/savecollateral',
          this.gold,
          httpOptions
        )
        .subscribe(
          (response) => {
            console.log(response["saved"]);
            this.spinner.hide();

            if(response["saved"]){
              var x = document.getElementById("full") as HTMLElement;
              var y = document.getElementById("fullcontainer") as HTMLElement;
        x.style.display = "grid";
        y.style.display="none";
            }
            else {
              this.notification.error('Error Faced', 'Check if All the Services are Running', {
                position: ['top', 'Left'],
                timeOut: 4000,
                clearTimeout: 2000,
                animate: 'fade',
                showProgressBar: true,
              });
  
            }
            // console.log(response);
          },
          (error) => {
            console.log(error);
            this.spinner.hide();

            if(error.status === 401){
              localStorage.clear();
  
              this.notification.error('Session Expaired', 'Login Again', {
                position: ['top', 'Left'],
                timeOut: 4000,
                clearTimeout: 2000,
                animate: 'fade',
                showProgressBar: true,
              });
  
              this.route.navigate([""])
              
            }
          }
        );
    }
    else {
      this.notification.error('Form invalid', 'Check input fields', {
        position: ['top', 'Left'],
        timeOut: 4000,
        clearTimeout: 2000,
        animate: 'fade',
        showProgressBar: true,
      });
    }
  }
}
