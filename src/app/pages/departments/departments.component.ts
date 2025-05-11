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
      this.departament = res.data.result.map((item) => ({
        active: item.active,
        dateModified: item.dateModified,
        id: item.idDepartment,
        name: item.nameDepartment,
      }));
    });
  }

 createDepartments(departament: ITableInterface) {
    const dto = {
      idDepartment: departament.id ?? 0,
      nameDepartment: departament.name,
      dateModified: departament.dateModified,
      active: departament.active
    };
  
    this._departmentSvc.create(dto).subscribe({
      next: () => this.readAll(),
      error: (err) => console.error('Error al crear país', err)
    });
  } 

  updateDepartments(departament: ITableInterface) {
    const dto = {
      idDepartment: departament.id ?? 0,
      nameDepartment: departament.name,
      dateModified: departament.dateModified,
      active: departament.active
    };
  
    this._departmentSvc.update(dto).subscribe({
      next: () => this.readAll(),
      error: (err) => console.error('Error al actualizar país', err)
    });
  }
  
  deleteDepartments(id: number) {
    console.log('id a eliminar: ', id);
    
    if (confirm('¿Estás seguro de eliminar este país?')) {
      this._departmentSvc.delete(id).subscribe({
        next: () => this.readAll(),
        error: err => console.error('Error al eliminar país', err)
      });
    }
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.readAll();
  }
}
