import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { InternalServerErrorComponent } from './error/internal-server-error/internal-server-error.component';
import { AuthGuardGuard } from './shared/guard/auth-guard.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { PermissionComponent } from './error/permission/permission.component';
import { AuthGuardAdminGuard } from './shared/guard/auth-guard-admin.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, 
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuardAdminGuard]},
  { path: 'account', loadChildren: ()=> import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'weather', loadChildren: ()=> import('./weather/weather.module').then(m => m.WeatherModule), canActivate:[AuthGuardGuard] },
  { path: '404', component: NotFoundComponent },
  { path: '403', component: PermissionComponent },
  { path: '500', component: InternalServerErrorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
