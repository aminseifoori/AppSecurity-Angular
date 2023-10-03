import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { CreateUserDto } from '../interface/create-user-dto';
import { RegistrationResponseDto } from '../interface/registration-response-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public registerUser = (body: CreateUserDto) => {
    return this.http.post<RegistrationResponseDto> (`${this.envUrl.apiURL}/api/account/registration`, body, this.generateHeaders());
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}
