import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { CreateUserDto } from '../interface/create-user-dto';
import { RegistrationResponseDto } from '../interface/registration-response-dto';
import { LoginDto } from '../interface/login-dto';
import { AuthResponseDto } from '../interface/auth-response-dto';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ForgetPasswordDto } from '../interface/forget-password-dto';
import { ResetPasswordDto } from '../interface/reset-password-dto';
import { CustomEncoderService } from './custom-encoder.service';
import { TwoFactorDto } from '../interface/two-factor-dto';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { ExternalAuthDto } from '../interface/external-auth-dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authChangeSub = new Subject<boolean>();
  public extAuthChangeSub = new Subject<SocialUser>();
  public authChanged = this.authChangeSub.asObservable();
  public extAuthChanged = this.extAuthChangeSub.asObservable();

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, private jwtHelper: JwtHelperService,
    private externalAuthService: SocialAuthService, private router: Router) {

  }


  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  public registerUser = (body: CreateUserDto) => {
    return this.http.post<RegistrationResponseDto>(`${this.envUrl.apiURL}/api/account/registration`, body, this.generateHeaders());
  }

  public loginUser = (body: LoginDto) => {
    return this.http.post<AuthResponseDto>(`${this.envUrl.apiURL}/api/account/login`, body);
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  public getClaims = () => {
    return this.http.get(`${this.envUrl.apiURL}/api/account/admindata`);
  }

  public isUserAdmin = (): boolean => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      return role === 'Admin';
    } else {
      return false;
    }

  }

  public forgotPassword = (body: ForgetPasswordDto) => {
    return this.http.post(`${this.envUrl.apiURL}/api/Account/ForgotPassword`, body);
  }

  public resetPassword = (body: ResetPasswordDto) => {
    return this.http.post(`${this.envUrl.apiURL}/api/Account/ResetPassword`, body);
  }

  public confirmEmail = (route: string, token: string, email: string) => {
    let params = new HttpParams({ encoder: new CustomEncoderService() })
    params = params.append('token', token);
    params = params.append('email', email);
    return this.http.get(`${this.envUrl.apiURL}/api/Account/EmailConfirmation`, { params: params });
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }

  public twoStepLogin = (body: TwoFactorDto) => {
    return this.http.post<AuthResponseDto>(`${this.envUrl.apiURL}/api/Account/twostepverification`, body);
  }

  public externalLogin = (body: ExternalAuthDto) => {
    return this.http.post<AuthResponseDto>(`${this.envUrl.apiURL}/api/Account/externallogin`, body);
  }

  public signOutExternal = () => {
    this.externalAuthService.signOut();
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}
