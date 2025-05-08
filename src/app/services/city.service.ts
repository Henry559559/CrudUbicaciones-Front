import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

}
