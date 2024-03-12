import { Component, Inject } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { CartService } from '../../services/cart.service';
import { ProductListComponent } from '../product-list/product-list.component';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  form!: FormGroup;
  myData: any = {
    username: '',
    password: ''
  };
  constructor(private customerService: CustomerService, private loginComponent: LoginComponent, private registerComp: RegisterComponent,
    private fb: FormBuilder, private router: Router, private cartService: CartService, private productList: ProductListComponent) {

  }
  currentData: any;
  ngOnInit() {
    debugger
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  register() {
    debugger
    this.loginComponent.registerPopup();
  }
  onSubmit() {
    debugger
    this.myData.username = this.form.controls['username'].value;
    this.myData.password = this.form.controls['password'].value;
    // console.log(this.form.controls['username'].value);
    // console.log(this.form.controls['password'].value);

    this.customerService.retrieveCustomerData(this.myData).subscribe(
      (data: any) => {
        debugger
        localStorage.setItem('token', JSON.stringify(data));
        let product = localStorage.getItem('product')!;
        debugger
        const decodedToken: any = jwt_decode.jwtDecode(data.token);
        if (product != null) {
          // this.cartService.totalPrice.next(JSON.parse(product).unitPrice);
          // debugger
          // this.cartService.totalQuantity.next(1);
          // debugger
          // // console.log(JSON.parse('pr).id);
          // this.cartService.addIdAndCount(JSON.parse(product).id, JSON.parse(product).count);
          // this.cartService.addToCart(JSON.parse(product));
          this.productList.incrementByOne(JSON.parse(product));
          localStorage.removeItem('product');
        }
        debugger

        console.log(decodedToken.id);
        this.loginComponent.closeLoginPopup();
        this.customerService.setUserId(decodedToken.id);
        this.router.navigateByUrl(`/products/user/${decodedToken.id}`);
      },
      (error: any) => {
        debugger
        alert('Invalid Credentials...');
      }
    )
  }
}

