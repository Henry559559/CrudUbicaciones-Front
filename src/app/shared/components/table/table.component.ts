import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { ITableInterface } from '../../interfaces/table-interface';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  template: `
    <div class="container">
      <button class="btn btn-primary">Agregar {{title()}}</button>
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
              <button class="btn btn-sm">🗑</button>
            </td>
          </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styleUrl: './table.component.css',
})
export class TableComponent {
  readonly title = input<string>('')
  readonly data = input<ITableInterface[]>([{
    active: false,
    dateModified: new Date(),
    id: 0,
    name: 'Sin datos',
  }]);
}
