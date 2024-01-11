import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ShopFormsService } from '../../services/shop-forms.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { CartService } from '../../services/cart.service';
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
  isSubmitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private shopForms: ShopFormsService, private cartService: CartService) { }
  ngOnInit() {
    this.reviewCartDetails();
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2), this.notOnlyWhiteSpace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), this.notOnlyWhiteSpace]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2), this.notOnlyWhiteSpace]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2), this.notOnlyWhiteSpace]),
        state: new FormControl('', [
          Validators.required]),
        country: new FormControl('', [
          Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2), this.notOnlyWhiteSpace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2), this.notOnlyWhiteSpace]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2), this.notOnlyWhiteSpace]),
        state: new FormControl('', [
          Validators.required]),
        country: new FormControl('', [
          Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2), this.notOnlyWhiteSpace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [
          Validators.required]),
        nameOnCard: new FormControl('', [
          Validators.required,
          Validators.minLength(2), this.notOnlyWhiteSpace]),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });
    const startMonth: number = new Date().getMonth() + 1;
    this.shopForms.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );
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
    );
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }
  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecutiryCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }
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
    this.isSubmitted = true;
    console.log('isSubmitted:', this.isSubmitted);
    console.log('firstName errors:', this.checkoutFormGroup.controls['firstName'].errors);

    // debugger
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
  notOnlyWhiteSpace(control: FormControl): ValidationErrors {
    if ((control.value != null) && (control.value.trim().length === 0)) {
      return { 'notOnlyWhiteSpace': true };
    } else {
      return { 'notOnlyWhiteSpace': false };
    };
  }
  reviewCartDetails() {
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )
  }
}   