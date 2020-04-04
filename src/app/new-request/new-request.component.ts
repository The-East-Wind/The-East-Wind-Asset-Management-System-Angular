import { Request } from './../entities/Request';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent implements OnInit {
  minFromDate: Date;
  maxFromDate: Date;
  minToDate: Date;
  maxToDate: Date;
  assetRequestForm = new FormGroup({
    fromDate: new FormControl(new Date(), Validators.required),
    toDate : new FormControl(new Date(), Validators.required),
    requestedFor: new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]{3}$/)])
  });
  constructor(public dialogRef: MatDialogRef<NewRequestComponent>) {
    const today = new Date();
    this.minFromDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.maxFromDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
  }

  ngOnInit(): void {
  }

  setMinToDate(): void {
    // tslint:disable-next-line: no-string-literal
    const fromDate = this.assetRequestForm.value.fromDate;
    this.minToDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 1);
    this.maxToDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 3, fromDate.getDate());
  }
  submitFormData(): void {
    if (this.assetRequestForm.valid) {
      this.dialogRef.close(this.assetRequestForm.value);
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
