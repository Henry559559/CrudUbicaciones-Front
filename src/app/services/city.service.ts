import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { ICityInterface } from '../shared/interfaces/city-interface';
import { IResponseInterface } from '../shared/interfaces/response-Interface';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private _http = inject(HttpClient);
  
  private apiUrl = `${environment.apiUrl}/city`;

  readAll(): Observable<IResponseInterface<ICityInterface[]>> {
    return this._http.get<IResponseInterface<ICityInterface[]>>(this.apiUrl);
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
