import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { CreateUserDto } from '../interface/create-user-dto';
import { RegistrationResponseDto } from '../interface/registration-response-dto';
import { LoginDto } from '../interface/login-dto';
import { AuthResponseDto } from '../interface/auth-response-dto';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public registerUser = (body: CreateUserDto) => {
    return this.http.post<RegistrationResponseDto> (`${this.envUrl.apiURL}/api/account/registration`, body, this.generateHeaders());
  }

  public loginUser = (body: LoginDto) => {
    return this.http.post<AuthResponseDto>(`${this.envUrl.apiURL}/api/account/login`, body);
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }
  
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}
