import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  public claims: [] = [];

  constructor(private repository: AuthenticationService) { }
  ngOnInit(): void {
    this.getClaims();
  }

  public getClaims = () => {
    this.repository.getClaims()
      .subscribe(res => {
        this.claims = res as [];
      })
  }

}
