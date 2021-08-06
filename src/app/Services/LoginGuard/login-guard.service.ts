import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private route:Router,private notification:NotificationsService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(localStorage["loggedin"]==null)
    return true;
    else{
      this.route.navigate(["Home"]);
      return false;
    }
  }
}
