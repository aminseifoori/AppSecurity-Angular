import { Component } from '@angular/core';

@Component({
  selector: 'app-internal-server-error',
  templateUrl: './internal-server-error.component.html',
  styleUrls: ['./internal-server-error.component.css']
})
export class InternalServerErrorComponent {
  errorMessage: string = "500 SERVER ERROR, CONTACT ADMINISTRATOR!!!!";
}
