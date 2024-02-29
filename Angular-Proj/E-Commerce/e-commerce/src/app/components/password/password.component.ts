import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { DataService } from '../../services/data.service';
import { LoginPageComponent } from '../login-page/login-page.component';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidators } from '../../validators/form-validators';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../common/customer';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  constructor(private customerService: CustomerService, private fb: FormBuilder, private login: LoginPageComponent, private dataService: DataService, private router: Router) { }
  form!: FormGroup;
  username!: any;
  password!: any;
  confirmPassowrd!: any;
  isSubmitted = false;
  customer!: Customer;
  customerData!: Customer;
  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    }, { validator: this.checkPasswords });
    FormValidators.removeMatCard();
  }
  previous() {
    debugger
    // this.router.navigate(['/register']);
    // console.log(this.dataService.data$);
    this.login.register();
  }


  checkPasswords(group: FormGroup): any { // here we have the 'passwords' group
    debugger
    let pass: any = group.get('password')?.value;
    let confirmPass: any = group.get('confirmPassword')?.value;
    // console.log(pass?.isEmpty());
    if (pass != "" && confirmPass != "")
      return pass === confirmPass ? null : { passwordMismatch: true };
    return null;
  }

  submitForm() {

    this.isSubmitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.dataService.finalData.subscribe(
        data => {
          this.customerData = data;
        }
      );
      debugger
      this.customer = this.customerData;
      this.customer.username = this.username;
      this.customer.password = this.password;
      this.customerService.saveCustomer(this.customer).subscribe(
        (response: any) => {
          debugger
          console.log('Successfully saved customer:', response);
          alert('Successfully saved customer');
          window.location.reload();
        },
        (error: any) => {
          console.error('Error saving customer:', error);
        }
      );
    }
  }
}