import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/components/table/table.component';
import { CountryService } from '../../services/country.service';
import { ITableInterface } from '../../shared/interfaces/table-interface';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-departments',
  imports: [TableComponent],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
})
export class DepartmentsComponent implements OnInit {
  private _departmentSvc = inject(DepartmentService);
  
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 5;

  departament: ITableInterface[] = [];

  ngOnInit(): void {
    this.readAll();
  }

  readAll(): void {
    this._departmentSvc.readPagedFake(this.currentPage, this.itemsPerPage).subscribe((res) => {
      this.totalItems = res.data.total;
      console.log("Cuantos intems: ",this.totalItems, res.data.total);
      
      this.departament = res.data.result.map((item) => ({
        active: item.active,
        dateModified: item.dateModified,
        id: item.idDepartment,
        name: item.nameDepartment,
      }));
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.readAll();
  }
}
