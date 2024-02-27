import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginPageComponent } from '../login-page/login-page.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(
    private dialog: MatDialog
  ) { }
  Openpopup() {
    this.dialog.open(LoginPageComponent, {
      width: '28%',
      height: '400px'
    })
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