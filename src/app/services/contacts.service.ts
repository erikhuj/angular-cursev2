import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  dynamicComponentSubject = new Subject();

  constructor(private httpclient: HttpClient) {}

  notifyDynamicDeleteComponent() {
    this.dynamicComponentSubject.next(true);
  }

  getSubjectDynamicComponent() {
    return this.dynamicComponentSubject.asObservable();
  }

  getConcats(body?: any): Observable<any> {
    return this.httpclient.put(
      'https://my.api.mockaroo.com/sa/exercise/contacts',
      body
    );
  }

  deleteConcat(id: number): Observable<any> {
    // const idContact = 123;
    return this.httpclient.delete(
      'https://my.api.mockaroo.com/sa/exercise/contacts/delete/' + id
    );
  }

  addConcat(contac: any): Observable<any> {
    return this.httpclient.post(
      'https://my.api.mockaroo.com/sa/exercise/users/create/',
      contac
    );
  }
  updateConcat(contac: any, id: number): Observable<any> {
    const idContact = id;
    return this.httpclient.put(
      'https://my.api.mockaroo.com/sa/exercise/contacts/update/' + idContact,
      contac
    );
  }
}
