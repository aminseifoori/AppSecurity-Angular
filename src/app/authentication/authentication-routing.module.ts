import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './register-user/register-user.component';

const routes: Routes = [
  { path: 'create', component: RegisterUserComponent },
  { path: '', redirectTo: '/create', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
