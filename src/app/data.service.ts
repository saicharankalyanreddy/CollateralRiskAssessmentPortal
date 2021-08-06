import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  focusedCustomerdescription: any;
  focusedCustomerid : any;
  focusedloanid:any;
  collateralId:any;
  constructor() { }

  setdataforforms(des:string,loanid: any,customerid:any,collateralId:any)
  {
    // console.log("sevice"+des);
    this.focusedCustomerdescription = des;
    this.focusedloanid = loanid;
    this.focusedCustomerid=customerid;
    this.collateralId=collateralId;

    console.log(this.focusedCustomerdescription);
  }

  getdataforforms():string {
    // console.log("service get "+ this.focusedCustomerdescription)
    return this.focusedCustomerdescription;
  }

  getdataidforforms():string {
    // console.log("service get "+ this.focusedCustomerdescription)
    return this.focusedCustomerid;
  }
}
