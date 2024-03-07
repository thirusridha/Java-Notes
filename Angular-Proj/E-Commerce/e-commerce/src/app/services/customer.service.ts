import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../common/customer';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private cartItems: Product[] = [];
  private baseUrl = 'http://localhost:8080';
  isLoggedInSubject: Subject<boolean> = new BehaviorSubject<boolean>(false);
  // isLoggedIn$ = this.isLoggedInSubject.asObservable();
  userId: Subject<any> = new BehaviorSubject<any>(0);
  constructor(private httpClient: HttpClient) { }
  setUserId(userId: any) {
    this.userId.next(userId);
  }
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
  addToCart(cartItem: Product, count: number) {
    // Assign the count value to the cartItem
    cartItem.count = count;

    // Check if the product is already in the cart
    const existingItem = this.cartItems.find(item => item.id === cartItem.id);

    if (existingItem) {
      // If the product is already in the cart, update the quantity
      existingItem.count += count;
    } else {
      // If the product is not in the cart, add it with the given quantity
      this.cartItems.push(cartItem);
    }

    // ... (any other necessary logic)
  }
}
