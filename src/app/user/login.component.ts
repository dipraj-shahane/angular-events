import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from './auth.service';
import { NotificationService } from '../common';

@Component({
    templateUrl: './login.component.html',
    styles: [`
        em { float: right; color: crimson; padding-left: 10px;}
    `]
})
export class LoginComponent {

    username: string;
    password: string;
    mouseoverLogin;

    loginInvalid = false;

    constructor(private authService: AuthService, private router: Router,
        private notification: NotificationService) {
    }

    login(formValues) {
        this.authService.loginUser(formValues.username, formValues.password)
            .subscribe(resp => {
                if (!resp) {
                    this.loginInvalid = true;
                    this.notification.warning('Please check your username.');
                } else {
                    this.notification.success('Welcome to Events App...');
                    this.router.navigate(['events']);
                }
            });
    }

    cancel() {
        this.router.navigate(['events']);
    }
}
