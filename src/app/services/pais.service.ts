import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Pais {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private apiUrl = 'http://localhost:5000/api/pais';



  constructor(private http: HttpClient) {}

  getPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.apiUrl);
  }

  getPais(id: number): Observable<Pais> {
    return this.http.get<Pais>(`${this.apiUrl}/${id}`);
  }

  crearPais(pais: Partial<Pais>): Observable<Pais> {
    return this.http.post<Pais>(this.apiUrl, pais);
  }

  actualizarPais(id: number, pais: Pais): Observable<Pais> {
    return this.http.put<Pais>(`${this.apiUrl}/${id}`, pais);
  }

  eliminarPais(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
