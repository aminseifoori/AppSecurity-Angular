import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard {

  constructor(private authService: AuthenticationService, private router: Router){

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    if(this.authService.isUserAuthenticated()){
      return true;
    }
    this.router.navigate(['/account/login'], {queryParams:{returnUrl: state.url}});
    return false;
  }
  
}
