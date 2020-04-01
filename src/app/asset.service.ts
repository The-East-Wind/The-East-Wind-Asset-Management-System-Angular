import { Asset } from './entities/Asset';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AssetService {
  localUrl = './assets/assets.json';
  assets: Asset[];
  constructor(private http: HttpClient) {
    this.getAssets();
  }

  getAssets = (): Observable<Asset> => {
    return this.http.get<Asset>(this.localUrl).pipe(retry(1), catchError(() => {
      return throwError('Error Reading assets.json');
    }));
  }
}
