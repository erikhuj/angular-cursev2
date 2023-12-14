import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(  private httpclient: HttpClient) { }

  create(data: any): Observable<any> {
    return this.httpclient.post(
      'https://my.api.mockaroo.com/sa/exercise/users/create',
      data,
      
    );
  }

  update(data: any): Observable<any> {
    return this.httpclient.put(
      'https://my.api.mockaroo.com/sa/exercise/users/update/123',
      data,
      
    );
  }

  getOne(id: number): Observable<any> {
    return this.httpclient.get('https://my.api.mockaroo.com/sa/exercise/users/profile/'+id);
  }
}
