import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { IResponseInterface } from '../shared/interfaces/response-Interface';
import { IDepartmentInterface } from '../shared/interfaces/department-interface';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  
  private _http = inject(HttpClient);
  
  private apiUrl = `${environment.apiUrl}/department`;

  readAll(): Observable<IResponseInterface<IDepartmentInterface[]>> {
    return this._http.get<IResponseInterface<IDepartmentInterface[]>>(this.apiUrl);
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
