import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { ITableInterface } from '../../interfaces/table-interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#miModal" >Agregar {{title()}}</button>
      <div class="modal fade" id="miModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Agregar {{ title() }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
              <div class="input-group mb-3">
                <input type="text" class="form-control" [(ngModel)]="nombre" placeholder="Nombre" />
              </div>
              <div class="input-group mb-3">
                <input type="date" class="form-control" [(ngModel)]="fechaModificacion" placeholder="Fecha Modificación" />            </div>
              </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button class="btn btn-primary" (click)="guardar()">Guardar</button>
            </div>
          </div>
        </div>
      </div>
      <br>
      <br>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Activo</th>
            <th scope="col">Fecha Modificación</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          @for (item of data(); track $index) {
          <tr>
            <th>{{ item.id }}</th>
            <td>{{ item.name }}</td>
            <td>{{ item.active ? 'Si' : 'No' }}</td>
            <td>{{ item.dateModified | date : 'dd/MM/yyyy hh:mm' }}</td>
            <td>
              <button class="btn btn-sm">✍️</button>
              <button class="btn btn-sm" (click)="eliminar(item.id ?? 0)">🗑</button>
            </td>
          </tr>
          }
        </tbody>
      </table>
      @if (totalPages > 0) {
      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item" [class.disabled]="currentPage() === 1">
            <button class="page-link" (click)="changePage(currentPage() - 1)">Anterior</button>
          </li>

          @for (page of pageNumbers; track page) {
            <li class="page-item" [class.active]="currentPage() === page">
              <button class="page-link" (click)="changePage(page)">{{ page }}</button>
            </li>
          }

          <li class="page-item" [class.disabled]="currentPage() === totalPages">
            <button class="page-link" (click)="changePage(currentPage() + 1)">Siguiente</button>
          </li>
        </ul>
      </nav>
    }
    </div>
  `,
  styleUrl: './table.component.css',
})
export class TableComponent {
  nombre = '';
  fechaModificacion: string = '';
  @Output() pageChange = new EventEmitter<number>();
  @Output() create = new EventEmitter<ITableInterface>();
  @Output() delete = new EventEmitter<number>();

  readonly currentPage = input<number>(1);
  readonly totalItems = input<number>(0);
  readonly itemsPerPage = input<number>(5);
  readonly title = input<string>('')
  readonly data = input<ITableInterface[]>([{
    active: false,
    dateModified: new Date(),
    id: 0,
    name: 'Sin datos',
  }]);

  
get totalPages(): number {
  const total = Math.ceil(this.totalItems() / this.itemsPerPage());
  return isNaN(total) || total < 0 ? 0 : total;
}

get pageNumbers(): number[] {
  const total = this.totalPages;
  if (isNaN(total) || total < 1) return [];
  return Array.from({ length: total }, (_, i) => i + 1);
}

changePage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.pageChange.emit(page);
  }
}

guardar() {
  const nuevoPais: ITableInterface = {
    id: 0, // Asignar un ID único o manejarlo en el backend
    name: this.nombre,
    dateModified: new Date(this.fechaModificacion),
    active: true
  };
  this.create.emit(nuevoPais);
  console.log('Nuevo país creado:', nuevoPais);
}

eliminar(id: number) {
  this.delete.emit(id);
}

}
