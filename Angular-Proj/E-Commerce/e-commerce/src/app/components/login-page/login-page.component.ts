import { Component, Inject } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

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
    private fb: FormBuilder, private router: Router) {

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
        this.router.navigate([`/products/user/${data.id}`]);
        // console.log(data);
        // console.log(data.id);
      },
      (error: any) => {
        debugger
        console.error('Error retrieving customer data:', error);
      }
    )
  }
}