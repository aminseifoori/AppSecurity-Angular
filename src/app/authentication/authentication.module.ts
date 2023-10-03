import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { RegisterUserComponent } from './register-user/register-user.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterUserComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class AuthenticationModule { }
