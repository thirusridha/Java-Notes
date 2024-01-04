import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShopFormsService } from '../../services/shop-forms.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
  constructor(private formBuilder: FormBuilder, private shopForms: ShopFormsService) { }
  ngOnInit() {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),

    });
    const startMonth: number = new Date().getMonth() + 1;
    this.shopForms.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    )
    this.shopForms.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    );
    this.shopForms.getCountries().subscribe(
      data => {
        console.log("Retrieved countries : " + JSON.stringify(data))
        this.countries = data;
      }
    )
  }
  copyShippingToBilling(event: any) {
    if (event.target.checked) {
      debugger
      console.log('Checkbox checked:', event.target.checked);
      console.log('Shipping Address:', this.checkoutFormGroup.controls['shippingAddress'].value);
      console.log('Billing Address:', this.checkoutFormGroup.controls['billingAddress'].value);
      // Rest of the function...
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  }
  onSubmit() {
    console.log(this.checkoutFormGroup.get('customer')?.value)
  }
  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditcard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);
    let startMonth: number;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }
    this.shopForms.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    )
  }
  getStates(formGropupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGropupName);
    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;
    this.shopForms.getStates(countryCode).subscribe(
      data => {
        if (formGropupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        }
        else {
          this.billingAddressStates = data;
        }
        formGroup?.get('state')?.setValue(data[0]);
      }
    )
  }
}