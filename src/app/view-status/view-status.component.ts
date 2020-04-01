import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-status',
  templateUrl: './view-status.component.html',
  styleUrls: ['./view-status.component.css']
})
export class ViewStatusComponent implements OnInit {
  approved: number;
  requestStatus: string;
  viewStatusForm = new FormGroup({
    requestId: new FormControl('', [Validators.required, Validators.pattern(/^\d{1,}$/)])
  });
  viewStatus = (event) => {
    if (this.viewStatusForm.valid) {
      this.approved = 0;
      this.requestStatus = 'Approved';
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
