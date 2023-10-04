import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherListComponent } from './weather-list/weather-list.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { WeatherRoutingModule } from './weather-routing.module';

@NgModule({
  declarations: [
    WeatherListComponent
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    BsDatepickerModule.forRoot()
  ]
})
export class WeatherModule { }
