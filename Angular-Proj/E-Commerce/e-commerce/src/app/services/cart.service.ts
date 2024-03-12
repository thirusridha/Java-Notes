import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  idAndCount: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  addIdAndCount(ids: any, counts: any, check: string) {
    debugger
    let newData!: any[];
    if (check.match('increase')) {
      newData = [{ id: ids, count: counts + 1 }];
    } else if (check.match('decrease')) {
      newData = [{ id: ids, count: counts - 1 }];
    }
    const currentData = this.idAndCount.getValue();
    newData.forEach(newEntry => {
      const index = currentData.findIndex(existingEntry => existingEntry.id === newEntry.id);
      if (index !== -1) {
        currentData[index] = { ...currentData[index], ...newEntry };
      } else {
        currentData.push(newEntry);
      }
    })
  }
  removeCount() {
    this.idAndCount.next([]);
    this.idAndCount.closed;
    console.log(this.idAndCount);

  }
  constructor() {
  }
  addToCart(theCartItem: CartItem) {
    debugger
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined;
    if (this.cartItems.length > 0) {
      // for (let tempCartItem of this.cartItems) {
      //   if (tempCartItem.id === theCartItem.id) {
      //     existingCartItem = tempCartItem;
      //     break;
      //   }
      // }
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);

      alreadyExistsInCart = (existingCartItem != undefined);
    } if (alreadyExistsInCart) {
      existingCartItem!.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }
    this.computeCartTotals();
  }
  computeCartTotal(theCartItem: CartItem) {
    debugger
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for (let currentCartItem of this.cartItems) {
      debugger
      if (currentCartItem.id == theCartItem.id)
        currentCartItem.quantity--;
      // if (currentCartItem.quantity === 0) {
      //   debugger
      //   this.removeOne(currentCartItem);
      // } else {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
      // }
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.logCartData(totalPriceValue, totalQuantityValue);
    // console.log(`cart-items from service = ${totalPriceValue}`);
  }
  computeCartTotals() {
    debugger
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.logCartData(totalPriceValue, totalQuantityValue);
    // console.log(`cart-items from service = ${totalPriceValue}`);
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    // console.log('content of the cart...')
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
    }
  }
  decreamentQuantity(cartItem: CartItem) {
    debugger
    cartItem.quantity--;
    if (cartItem.quantity === 0) {
      this.remove(cartItem);
    }
    else
      this.computeCartTotals();
  }
  removeOne(cartItem: CartItem) {
    debugger
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === cartItem.id);
    debugger
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotal(cartItem);
    }
  }
  remove(cartItem: CartItem) {
    debugger
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === cartItem.id);
    debugger
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }

}