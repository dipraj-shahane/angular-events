import { Component, OnInit } from '@angular/core';
import { AuthService } from './user';

@Component({
  selector: 'events-app',
  template: `
    <h2><img src="/assets/images/basic-shield.png" width="45px" height="45px"/> Angular Events</h2>
    <nav-bar></nav-bar>
    <router-outlet></router-outlet>
    `
})
export class EventsAppComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.checkAuthenticationStatus();
  }

}
