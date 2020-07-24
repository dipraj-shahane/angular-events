import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';
import { IUser } from './user.model';
import { first } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../common';

@Component({
  templateUrl: './create-user.component.html',
  styles: [
    `
      em {
        float: right;
        color: crimson;
        padding-left: 10px;
      }
      .error input {
        background-color: lightcoral;
      }
      .error ::-webkit-input-placeholder {
        color: white;
      }
    `,
  ],
})
export class CreateUserComponent implements OnInit {
  username: FormControl;
  firstName: FormControl;
  lastName: FormControl;
  createUserForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.username = new FormControl('', Validators.required);
    this.firstName = new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Za-z].*'),
    ]);
    this.lastName = new FormControl('', Validators.required);

    this.createUserForm = new FormGroup({
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
    });
  }

  validateUsername(): boolean {
    return this.username.valid || this.username.untouched;
  }

  validateFirstName(): boolean {
    return this.firstName.valid || this.firstName.untouched;
  }

  validateLastName(): boolean {
    return this.lastName.valid || this.lastName.untouched;
  }

  createUser(formValues) {
    if (this.createUserForm.invalid) {
      this.notification.error(
        'Please enter valid data to create profile.',
        'Error - Create User'
      );
      return;
    }
    const user: IUser = {
      userName: formValues.username,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
    };
    this.authService.createUser(user).subscribe(() => {
      this.notification.success('Profile saved successfully.', 'Profile Saved');
    });
    this.router.navigate(['/user/login']);
  }

  cancel() {
    this.router.navigate(['events']);
  }
}
