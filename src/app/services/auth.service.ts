import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logOut() {
    return this.httpclient.delete(
      'https://my.api.mockaroo.com/sa/exercise/auth/logout',
    );  }

  constructor(private httpclient: HttpClient) { }

  logIn(username: string, password: string): Observable<any> {
    const data = {
      authUser: username,
      authPassword: password,
    };
    return this.httpclient.put(
      'https://my.api.mockaroo.com/sa/exercise/auth/login',
      data
    );
  }
}
