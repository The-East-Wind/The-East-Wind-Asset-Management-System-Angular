import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Asset } from './../entities/Asset';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AssetService } from './../asset.service';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-manage-asset',
  templateUrl: './manage-asset.component.html',
  styleUrls: ['./manage-asset.component.css']
})
export class ManageAssetComponent implements OnInit {
  assets: Asset[];
  assetDataSource: any;
  columnHeaders: string[];
  selectedAsset = new SelectionModel<Asset>(false, []);
  noneSelected: boolean;
  // tslint:disable-next-line: variable-name
  constructor(private _assetService: AssetService, private _dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.fetchAssets();
  }

  ngOnInit(): void {
  }

  fetchAssets = () => {
    this._assetService.getAssets().subscribe((data: any) => {
      this.assets = data;
      this.assetDataSource = new MatTableDataSource<Asset>(this.assets);
      console.log(this.assetDataSource.data);
      this.columnHeaders = Object.keys(this.assets[0]).filter(key => key !== 'allottedTo');
      this.columnHeaders.unshift('select');
      this.assetDataSource.filterPredicate = (filterData, filter: string) => {
        return filterData.id === Number(filter);
      };
    });
  }
  applyFilter = (event: Event) => {
    const filter = (event.target as HTMLInputElement).value;
    this.assetDataSource.filter = filter;
  }

  deleteAsset(): void {
    if (this.selectedAsset.hasValue) {
      this._assetService.deleteAssetWithId(this.selectedAsset.selected[0]).pipe(catchError((error: HttpErrorResponse) => {
        this.displaySnackBar('Uh-oh! An error occured. Please try again later', false);
        return throwError('Error deleting asset');
      })).subscribe((data: any) => {
        console.log(data);
        this.displaySnackBar('Asset Deleted Successfully!', true);
        this.assets = this.assets.filter(asset => asset.id !== this.selectedAsset.selected[0].id);
        this.assetDataSource.data = this.assets;
        this.selectedAsset.clear();
      });
    }
  }

  modifyAsset(): void {
    console.log(this.selectedAsset.selected[0]);
  }

  returnAsset(): void {
    console.log(this.selectedAsset.selected[0]);
  }

  displaySnackBar(message: string, type: boolean) {
    const cssClass = type ? 'success' : 'failure';
    this._snackBar.open(message, '', {
      duration: 5000 , panelClass: cssClass
    });
  }
}
