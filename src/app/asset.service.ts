import { Asset } from './entities/Asset';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AssetService {
  localUrl = 'http://localhost:3000/assets';
  idGenerator = 10;
  assets: Asset[];
  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient) {
    this.getAssets();
  }

  getAssets = (): Observable<Asset> => {
    return this._http.get<Asset>(this.localUrl).pipe(retry(1), catchError(() => {
      return throwError('Error Reading assets.json');
    }));
  }

  addNewAsset(newAsset: Asset): Observable<Asset> {
    newAsset.id = this.idGenerator++;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post<Asset>(this.localUrl, newAsset, httpOptions);
  }

  updateAsset(updatedAsset: Asset): Observable<Asset> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const url = `${this.localUrl}/${updatedAsset.id}`;
    return this._http.put<Asset>(url, updatedAsset, httpOptions);
  }

  getAssetWithId(assetId: number): Observable<Asset> {
    const url = `${this.localUrl}/${assetId}`;
    return this._http.get<Asset>(url);
  }
}
