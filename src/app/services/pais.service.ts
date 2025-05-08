import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

export interface Pais {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})

export class PaisService {
  private apiUrl = `${environment.apiUrl}/pais`
  private _http = inject(HttpClient)

  obtenerPaisesV2(): Observable<any> {
    return this._http.get<any>('https://restcountries.com/v3.1/all');
  }

  obtenerPaises(): Observable<Pais[]> {
    return this._http.get<Pais[]>(this.apiUrl);
  }

  obtenerPais(id: number): Observable<Pais> {
    return this._http.get<Pais>(`${this.apiUrl}/${id}`);
  }

  crearPais(pais: Partial<Pais>): Observable<Pais> {
    return this._http.post<Pais>(this.apiUrl, pais);
  }

  actualizarPais(id: number, pais: Pais): Observable<Pais> {
    return this._http.put<Pais>(`${this.apiUrl}/${id}`, pais);
  }

  eliminarPais(id: number): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
