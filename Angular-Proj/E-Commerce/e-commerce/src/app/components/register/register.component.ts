import { Component, ViewEncapsulation, } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PasswordComponent } from '../password/password.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { LoginComponent } from '../login/login.component';
import { FormValidators } from '../../validators/form-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {
  form: FormGroup;
  fd: any = 'testing';
  value: any;
  firstName!: any;
  lastName!: any;
  email!: any;
  location!: any;
  age!: any;
  gender!: any;
  isSubmitted: boolean = false;
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private dataService: DataService,
    private fb: FormBuilder
  ) {
    // Initialize the form with two input fields
    this.form = this.fb.group({
      firstName: new FormControl('', [
        Validators.required, FormValidators.notOnlyWhiteSpace]),
      lastName: new FormControl('', [Validators.required, FormValidators.notOnlyWhiteSpace]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      location: new FormControl('', []),
      age: new FormControl(['', Validators.required]),
      gender: new FormControl(['', Validators.required])
    });
  }
  ngOnInit() {
    debugger
    this.dataService.finalData.subscribe(
      data => {
        debugger
        console.log('data' + data);
        // this.fd = data.field1;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.location = data.location;
        this.age = data.age;
        this.gender = data.gender;
      }
    )

    debugger;
    FormValidators.removeMatCard();
  }

  ngAfterInit() { }

  // Use dataService.data$ to get the current data
  // currentData = this.dataService.data$;

  passwordDialog() {
    debugger
    this.isSubmitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      debugger
      this.dataService.submitToPwd(this.form.value);
      console.log(this.form.value)
      this.dialog.closeAll();
      this.dialog.open(PasswordComponent, {
        width: '40%',
        height: '400px',
        disableClose: true
      })
    }

  }
  // Handle closing the dialog and passing the form values
  closeDialog() {
    debugger
    this.dataService.submitToPwd(null);
    this.dialogRef.close();

  }

}