import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(public dialog: MatDialog) { }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

@Component({
  selector: 'app-dialog-animations-example',
  templateUrl: './dialog.component.html',
  styleUrls: ['./login.component.css']
})
export class DialogAnimationsExampleDialog {
  email!: string;
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>, private router: Router) { }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
}