import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { map, Observable } from 'rxjs';
import { IResponseInterface } from '../shared/interfaces/response-Interface';
import { ICountryInterface } from '../shared/interfaces/country-interface';
import { ITableInterface } from '../shared/interfaces/table-interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private _http = inject(HttpClient);
  
  private apiUrl = `${environment.apiUrl}/country`;

  readAll(): Observable<IResponseInterface<ICountryInterface[]>> {
    return this._http.get<IResponseInterface<ICountryInterface[]>>(this.apiUrl);
  }

  create(data: ICountryInterface): Observable<IResponseInterface<ICountryInterface>> {
    return this._http.post<IResponseInterface<ICountryInterface>>(this.apiUrl, data);
  }

  update(data: ICountryInterface): Observable<IResponseInterface<ICountryInterface>> {
    return this._http.put<IResponseInterface<ICountryInterface>>(this.apiUrl, data);
  }

  delete(id: number): Observable<IResponseInterface<ICountryInterface>> {
    return this._http.delete<IResponseInterface<ICountryInterface>>(`${this.apiUrl}/${id}`);
  }  

  readPagedFake(page: number, limit: number) {
    return this.readAll().pipe(
      map(res => {
        const start = (page - 1) * limit;
        const paged = res.data.result.slice(start, start + limit);
        return {
          data: {
            result: paged,
            total: res.data.result.length,
          },
        };
      })
    );
  }
}
