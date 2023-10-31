import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResponseDto } from 'src/app/shared/interface/auth-response-dto';
import { ExternalAuthDto } from 'src/app/shared/interface/external-auth-dto';
import { LoginDto } from 'src/app/shared/interface/login-dto';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  private returnUrl: string;
  
  loginForm: FormGroup;
  errorMessage: string = '';
  showError: boolean;

  user: SocialUser;
  loggedIn: boolean;

  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute, private socialAuthService: SocialAuthService,
    private el: ElementRef,){

    this.socialAuthService.authState.subscribe((user) => {
      if(user){
        this.authService.extAuthChangeSub.next(user);
        const externalAuth: ExternalAuthDto = {
          provider: user.provider,
          idToken: user.idToken
        }
        this.validateExternalAuth(externalAuth);
      }
    });

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  validateControl = (controlName: string) => {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched
  }
  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.get(controlName).hasError(errorName)
  }

  loginUser = (loginFormValue) => {
    this.showError = false;
    const login = {... loginFormValue };
    const userForAuth: LoginDto = {
      email: login.username,
      password: login.password
    }
    this.authService.loginUser(userForAuth)
    .subscribe({
      next: (res:AuthResponseDto) => {
        if (res.is2StepVerificationRequired){
          this.router.navigate(['/account/twostepverification'],
          { queryParams: { returnUrl: this.returnUrl, provider: res.provider, email: userForAuth.email }})
        }else{
          localStorage.setItem("token", res.token);
          this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
          this.router.navigate([this.returnUrl]);
        }
    },
    error: (err: HttpErrorResponse) => {
      this.errorMessage = err.message;
      this.showError = true;
    }})
  }
  private validateExternalAuth(externalAuth: ExternalAuthDto) {
    this.authService.externalLogin(externalAuth)
      .subscribe({
        next: (res) => {
            localStorage.setItem("token", res.token);
            this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
            this.router.navigate([this.returnUrl]);
      },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.message;
          this.showError = true;
          this.authService.signOutExternal();
        }
      });
  }




}
