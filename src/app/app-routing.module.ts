import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { InternalServerErrorComponent } from './error/internal-server-error/internal-server-error.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, 
  { path: 'account', loadChildren: ()=> import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'weather', loadChildren: ()=> import('./weather/weather.module').then(m => m.WeatherModule) },
  { path: '404', component: NotFoundComponent },
  { path: '500', component: InternalServerErrorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
