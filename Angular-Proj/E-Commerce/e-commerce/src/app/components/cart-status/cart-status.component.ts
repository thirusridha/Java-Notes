import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent {
  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  cartItems!: CartItem;
  constructor(private cartService: CartService, private router: Router) { }
  ngOnInit() {
    debugger
    this.updateCartStatus();
  }

  updateCartStatus() {
    debugger
    this.cartService.totalPrice.subscribe(
      data => {
        debugger
        console.log(`entering into updateCartStatus method....== ${data}`)
        this.totalPrice = data
      }
    )
    this.cartService.totalQuantity.subscribe(
      data => {
        debugger
        this.totalQuantity = data
      }
    )
    // console.log(`total price - ${this.totalPrice}`)
  }

}