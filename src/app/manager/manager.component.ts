import { MatTableDataSource } from '@angular/material/table';
import { Asset } from './../entities/Asset';
import { AssetService } from './../asset.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  assets: Asset[];
  assetDataSource: any;
  columnHeaders: string[];
  // tslint:disable-next-line: variable-name
  constructor(private _assetService: AssetService) {
    this.fetchAssets();
  }
  fetchAssets = () => {
    this._assetService.getAssets().subscribe((data: any) => {
      this.assets = data;
      this.assetDataSource = new MatTableDataSource<Asset>(this.assets);
      this.columnHeaders = Object.keys(this.assets[0]).filter(key => key !== 'allottedTo');
      this.assetDataSource.filterPredicate = (filterData, filter: string) => {
        return filterData.assetId === Number(filter);
      };
    });
  }
  ngOnInit(): void {
  }
  applyFilter = (event) => {
    const filter = (event.target as HTMLInputElement).value;
    this.assetDataSource.filter = filter;
  }
}
