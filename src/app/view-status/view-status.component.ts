import { Request } from './../entities/Request';
import { RequestService } from './../request.service';
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
  displaySpinner = false;
  viewStatusForm = new FormGroup({
    requestId: new FormControl('', [Validators.required, Validators.pattern(/^\d{1,}$/)])
  });
  viewStatus = (event: Event) => {
    event.preventDefault();
    if (this.viewStatusForm.valid) {
      // TODO send request to serve instead of getting it from array when backend is ready
      this.requestStatus = undefined;
      this.displaySpinner = true;
      const enteredRequestId = Number(this.viewStatusForm.value.requestId);
      this._requestService.fetchRequestWithId(enteredRequestId).subscribe((data: any) => {
        const requestWithId: Request = data[0];
        if (requestWithId === undefined) {
          this.requestStatus = 'Invalid Request ID!';
          this.approved = 2;
        } else {
          switch (requestWithId.status) {
            case 'Approved': this.approved = 0; break;
            case 'Pending': this.approved = 1; break;
            case 'Rejected': this.approved = 2; break;
          }
          if (this.approved !== 1) {
            this.requestStatus = `Your request is ${requestWithId.status}`;
          } else {
            this.requestStatus = `Your request is In Process`;
          }
        }
        this.displaySpinner = false;
      });
    }
  }
  // tslint:disable-next-line: variable-name
  constructor(private _requestService: RequestService) {
  }
  ngOnInit(): void {
  }

}
