import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../common/customer';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  private baseUrl = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }
  saveCustomer(customer: Customer): Observable<any> {

    return this.httpClient.post<Customer>(`${this.baseUrl}/checkout/save-customer`, customer, { responseType: 'json' });
  }
  retrieveCustomerData(data: any): any {
    debugger
    console.log(data.username);
    debugger
    return this.httpClient.get<Customer>(`${this.baseUrl}/customers/search/findByEmailAndPassword?email=${data.username}&password=${data.password}`);
  }
}
