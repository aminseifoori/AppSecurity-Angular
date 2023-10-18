import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminGuard {

  constructor(private authService: AuthenticationService, private router: Router) {}
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    if(this.authService.isUserAdmin())
      return true;
      
    this.router.navigate(['/403'], { queryParams: { returnUrl: state.url }});
    return false;
  }
  
}
