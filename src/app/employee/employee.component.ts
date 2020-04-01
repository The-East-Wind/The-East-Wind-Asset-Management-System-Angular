import { Asset } from './../entities/Asset';
import { AssetService } from './../asset.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  categoryFilter: string;
  showAvailable: boolean;
  categories: string[];
  assets: Asset[];
  displayedColumns: string[];
  assetDataSource: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(public assetService: AssetService) {
    this.getAssets();
  }
  ngOnInit(): void {
  }
  getAssets = () => {
    this.assetService.getAssets().subscribe((data: any) => {
      this.assets = data;
      this.assetDataSource = new MatTableDataSource<Asset>(this.assets);
      this.assetDataSource.paginator = this.paginator;
      this.categories = this.assets.map(asset => asset.assetCategory);
      this.categories = this.categories.filter((category, index) => this.categories.indexOf(category) === index);
      this.displayedColumns = Object.keys(this.assets[0]).filter(key => key !== 'allottedTo');
      this.assetDataSource.filterPredicate = (data: Asset, filter: string) => {
        if (filter === 'Available') {
          return data.availability === filter;
        } else if (filter === '' ) {
          return true;
        } else {
          return data.assetCategory === filter;
        }
      };
    });
  }
  filterAvailability = () => {
    if (this.showAvailable) {
      this.assetDataSource.filter = 'Available';
    } else {
      this.assetDataSource.filter = '';
    }
  }
  applyCategoryFilter = () => {
    this.assetDataSource.filter = this.categoryFilter;
  }
}
