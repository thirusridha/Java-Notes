import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginPageComponent } from '../login-page/login-page.component';
import { RegisterComponent } from '../register/register.component';
import { CustomerService } from '../../services/customer.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { loc } from '@okta/okta-signin-widget/types/packages/@okta/courage-dist/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  isLoggedIn!: boolean;
  constructor(
    private dialog: MatDialog,
    private customerService: CustomerService,
    private cartService: CartService,
    private router: Router
  ) {
    debugger
    let token = localStorage.getItem('token');
    if (token != null) {
      this.customerService.login();
    }
    this.customerService.isLoggedInSubject.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }
  Openpopup() {
    this.dialog.open(LoginPageComponent, {
      width: '28%',
      height: '400px'
    })
  }
  closeLoginPopup() {
    this.dialog.closeAll();
    this.customerService.login();
  }
  onButtonClick() {
    debugger
    if (this.isLoggedIn) {
      localStorage.removeItem('token');
      // this.cartService.cartItems.push();
      this.cartService.totalPrice.next(0);
      this.cartService.totalQuantity.next(0);
      this.cartService.removeCount();
      this.customerService.logout();
      debugger
      console.log(this.cartService.cartItems);
      this.cartService.cartItems = [];
      this.router.navigateByUrl('/products')

    } else {
      this.Openpopup();
    }
  }
  registerPopup() {
    this.dialog.closeAll();
    this.dialog.open(RegisterComponent, {
      width: '40%',
      height: '400px',
      disableClose: true
    })
  }
}