import { Routes } from '@angular/router';

import { ProfileComponent, LoginComponent, CreateUserComponent } from './index';

export const userRoutes: Routes = [
    { path: 'profile', component: ProfileComponent },
    { path: 'login', component: LoginComponent },
    { path: 'new', component: CreateUserComponent },
];
