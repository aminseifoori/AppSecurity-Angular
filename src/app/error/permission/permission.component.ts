import { Component } from '@angular/core';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent {
  notAuthorized: string = `403 You are unauthorized user!!!`;
}
