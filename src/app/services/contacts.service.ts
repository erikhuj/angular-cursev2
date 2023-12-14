import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

    constructor(private httpclient: HttpClient) { }
  getConcats(body?: any): Observable<any> {
    return this.httpclient.put(
      'https://my.api.mockaroo.com/sa/exercise/contacts',
      body,
    );
  }

  deleteConcat(id: number): Observable<any> {
    // const idContact = 123;
    return this.httpclient.delete(
      'https://my.api.mockaroo.com/sa/exercise/contacts/delete/' + id,
    );
  }

}
