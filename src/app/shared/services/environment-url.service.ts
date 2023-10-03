import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {
  apiURL: string = environment.apiURL;
  constructor() { }
}
