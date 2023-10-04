import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from './environment-url.service';
import { WeatherForecast } from '../interface/weather-forecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public getWeathers = () => {

    return this.http.get<WeatherForecast[]>(`${this.envUrl.apiURL}/WeatherForecast`, this.generateHeaders());
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}
