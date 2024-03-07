import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  constructor(private cartService: CartService, private router: Router) { }
  ngOnInit() {
    debugger
    this.listCartDetails();
  }
  backToProducts() {
    this.router.navigateByUrl('/products');

  }
  listCartDetails() {
    debugger
    this.cartItems = this.cartService.cartItems;
    console.log(`cartItems = ${this.cartItems}`)
    this.cartService.totalPrice.subscribe(
      data => {
        debugger
        console.log("entering into listCartDetails-Price method..=" + data)
        console.log(data)
        this.totalPrice = data
      }
    );
    this.cartService.totalQuantity.subscribe(

      data => {
        debugger
        console.log("entering into listCartDetails method..=" + data)
        this.totalQuantity = data
      }

    );
    this.cartService.computeCartTotals();

  }
  increamentQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }
  decreamentQuantity(cartItem: CartItem) {
    this.cartService.decreamentQuantity(cartItem);
  }
  removeItem(cartItem: CartItem) {
    this.cartService.remove(cartItem);
  }
}