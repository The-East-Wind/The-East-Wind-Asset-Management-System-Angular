import { Request } from './../entities/Request';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Asset } from './../entities/Asset';
import { AssetService } from './../asset.service';
import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { NewRequestComponent } from '../new-request/new-request.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  assets: Asset[];
  assetDataSource: any;
  columnHeaders: string[];
  selectedAsset = new SelectionModel<Asset>(false, []);
  noneSelected: boolean;
  // tslint:disable-next-line: variable-name
  constructor(private _assetService: AssetService, private _router: Router, private _dialog: MatDialog) {
    this.fetchAssets();
  }
  fetchAssets = () => {
    this._assetService.getAssets().subscribe((data: any) => {
      this.assets = data;
      this.assetDataSource = new MatTableDataSource<Asset>(this.assets.filter(asset => asset.availability === 'Available'));
      this.columnHeaders = Object.keys(this.assets[0]).filter(key => key !== 'allottedTo');
      this.columnHeaders.unshift('select');
      this.assetDataSource.filterPredicate = (filterData, filter: string) => {
        return filterData.assetId === Number(filter);
      };
    });
  }
  ngOnInit(): void {
  }
  applyFilter = (event: Event) => {
    const filter = (event.target as HTMLInputElement).value;
    this.assetDataSource.filter = filter;
  }
  openRequestForm = (): void => {
    if  (this.selectedAsset.selected.length !== 0) {
      this.noneSelected = false;
      const newRequest = new Request();
      newRequest.requestedAsset = this.selectedAsset.selected[0];
      const dialogRef = this._dialog.open(NewRequestComponent, {
        maxWidth: '250px', maxHeight: '300px'
      });
      dialogRef.afterClosed().subscribe(formData => {
        this.selectedAsset.clear();
        console.log(formData);
      });
    } else {
      this.noneSelected = true;
    }
  }
}
