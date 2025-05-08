import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/components/table/table.component';
import { CountryService } from '../../services/country.service';
import { ITableInterface } from '../../shared/interfaces/table-interface';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-departments',
  imports: [TableComponent],
  template: ` <app-table [data]="country" [title]="'departamento'"></app-table> `,
  styleUrl: './departments.component.css',
})
export class DepartmentsComponent implements OnInit {
  private _departmentSvc = inject(DepartmentService);

  country: ITableInterface[] = [];

  ngOnInit(): void {
    this.readAll();
  }

  readAll(): void {
    this._departmentSvc.readAll().subscribe((res) => {
      res.data.result.forEach((item) => {
        this.country.push({
          active: item.active,
          dateModified: item.dateModified,
          id: item.idDepartment,
          name: item.nameDepartment,
        });
      });
    });
  }
}
