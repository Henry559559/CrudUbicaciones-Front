import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
