import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  currentUser: IUser;

  constructor(private http: HttpClient) {}

  loginUser(username: string, password: string) {
    const loginInfo = {
      username,
      password,
    };
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .post('/api/login', loginInfo, options)
      .pipe(
        tap((data: any) => {
          this.currentUser = data.user as IUser;
        })
      )
      .pipe(
        catchError((err) => {
          return of(false);
        })
      );
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  checkAuthenticationStatus() {
    this.http
      .get('/api/currentIdentity')
      .pipe(
        tap((data: any) => {
          if (data instanceof Object) {
            this.currentUser = data as IUser;
          }
        })
      )
      .subscribe();
  }

  createUser(user: IUser): Observable<IUser> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post<IUser>('/api/users', user, options);
  }

  updateCurrentUser(firstName: string, lastName: string): Observable<IUser> {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.put<IUser>(
      `/api/users/${this.currentUser.id}`,
      this.currentUser,
      options
    );
  }

  logout() {
    this.currentUser = undefined;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post('/api/logout', {}, options);
  }
}
