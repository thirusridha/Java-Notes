import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../common/customer';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  private baseUrl = 'http://localhost:8080';
  isLoggedInSubject: Subject<boolean> = new BehaviorSubject<boolean>(false);
  // isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  login() {
    this.isLoggedInSubject.next(true);
  }

  logout() {
    this.isLoggedInSubject.next(false);
  }

  // isLoggedIn(): boolean {
  // return this.isLoggedInSubject.value;
  // }
  saveCustomer(customer: Customer): Observable<any> {
    debugger
    return this.httpClient.post<Customer>(`${this.baseUrl}/checkout/register`, customer, { responseType: 'json' });
  }
  retrieveCustomerData(data: any): any {
    return this.httpClient.post<Customer>(`${this.baseUrl}/checkout/login`, data);
  }
}
