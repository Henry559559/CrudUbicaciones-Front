import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { IResponseInterface } from '../shared/interfaces/response-Interface';
import { ICountryInterface } from '../shared/interfaces/country-interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private _http = inject(HttpClient);
  
  private apiUrl = `${environment.apiUrl}/country`;

  readAll(): Observable<IResponseInterface<ICountryInterface[]>> {
    return this._http.get<IResponseInterface<ICountryInterface[]>>(this.apiUrl);
  }
}
