import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherForecast } from 'src/app/shared/interface/weather-forecast';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { WeatherService } from 'src/app/shared/services/weather.service';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent implements OnInit{
  weathers: WeatherForecast[];
  errorMessage: string = '';

  constructor(private repository: WeatherService, private errorHandler: ErrorHandlerService,
    private router: Router){}

  ngOnInit(): void {
    this.getWeathers();
  }

  private getWeathers = () => {
    this.repository.getWeathers()
    .subscribe({
      next: (result: WeatherForecast[]) => {
        this.weathers = result;
      },
      error: (err: HttpErrorResponse) =>{
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    });
  }

}
