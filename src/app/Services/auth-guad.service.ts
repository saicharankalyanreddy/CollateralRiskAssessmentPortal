import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuadService implements CanActivate{

  constructor(private route:Router,private notification:NotificationsService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if(localStorage["loggedin"]!=null)
    
    return true;
    else{
      this.notification.error('Failed', 'Please Login First', {
        timeOut: 3000,
        animate: 'fade',
        showProgressBar: true,
      });
      
      this.route.navigate([""]);
      return false;
    }
  }
}
