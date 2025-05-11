import { Component, inject } from '@angular/core';
import { CityService } from '../../services/city.service';
import { ITableInterface } from '../../shared/interfaces/table-interface';
import { TableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-cities',
  imports: [TableComponent],
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
})
export class CitiesComponent {
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 5;
  
  private _citySvc = inject(CityService);

  city: ITableInterface[] = [];

  ngOnInit(): void {
    this.readAll();
  }
  readAll(): void {
    this._citySvc.readPagedFake(this.currentPage, this.itemsPerPage).subscribe((res) => {
      this.totalItems = res.data.total;      
      this.city = res.data.result.map((item) => ({
        active: item.active,
        dateModified: item.dateModified,
        id: item.idCity,
        name: item.nameCity,
      }));
    });
  }

  createCities(city: ITableInterface) {
    const dto = {
      idCity: city.id ?? 0,
      nameCity: city.name,
      dateModified: city.dateModified,
      active: city.active
    };

    this._citySvc.create(dto).subscribe({
      next: () => this.readAll(),
      error: (err) => console.error('Error al crear país', err)
    });
  } 

  updateCities(city: ITableInterface) {
    const dto = {
      idCity: city.id ?? 0,
      nameCity: city.name,
      dateModified: city.dateModified,
      active: city.active
    };
  
    this._citySvc.update(dto).subscribe({
      next: () => this.readAll(),
      error: (err) => console.error('Error al actualizar país', err)
    });
  }
  
  deleteCities(id: number) {    
    if (confirm('¿Estás seguro de eliminar este país?')) {
      this._citySvc.delete(id).subscribe({
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
