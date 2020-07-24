import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

import { NotificationService } from '../common/notification.service';

@Component({
  templateUrl: './profile.component.html',
  styles: [`
    em { float: right; color: crimson; padding-left: 10px;}
    .error input { background-color: lightcoral; }
    .error ::-webkit-input-placeholder { color: white; }
  `]
})
export class ProfileComponent implements OnInit {

  firstName: FormControl;
  lastName: FormControl;
  profileForm: FormGroup;

  constructor(private router: Router, private authService: AuthService, private notification: NotificationService) {
  }

  ngOnInit() {
    const currentUser = this.authService.currentUser;
    this.firstName = new FormControl(currentUser.firstName, [Validators.required, Validators.pattern('[A-Za-z].*')]);
    this.lastName = new FormControl(currentUser.lastName, Validators.required);

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }

  validateFirstName(): boolean {
    return this.firstName.valid || this.firstName.untouched;
  }

  validateLastName(): boolean {
    return this.lastName.valid || this.lastName.untouched;
  }

  saveProfile(formValues) {
    if (this.profileForm.invalid) {
      this.notification.error('Please enter valid data to save profile.', 'Error- Profile Save');
      return;
    }
    // let controls = this.profileForm.controls;
    // controls['firstName'].value, controls['lastName'].value
    this.authService.updateCurrentUser(formValues.firstName, formValues.lastName)
      .subscribe(() => {
        this.notification.success('Profile saved successfully.', 'Profile Saved');
      });
    this.router.navigate(['events']);
  }

  cancel() {
    this.router.navigate(['events']);
  }

  logout() {
    this.authService.logout()
      .subscribe(() => {
        this.notification.success('You have been successfully logged out!');
        this.router.navigate(['/user/login']);
      });
  }
}
