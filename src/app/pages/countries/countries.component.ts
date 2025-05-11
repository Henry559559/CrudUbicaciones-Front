import { Component, inject, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { ITableInterface } from '../../shared/interfaces/table-interface';

@Component({
  selector: 'app-countries',
  imports: [TableComponent],  
  templateUrl: './countries.component.html',
  styleUrls:['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  private _countrySvc = inject(CountryService);

  country: ITableInterface[] = [];
  
  totalItems = 0;
  currentPage = 1;
  itemsPerPage = 5;

  ngOnInit(): void {
    this.readAll();
  }

  readAll(): void {
    this._countrySvc.readPagedFake(this.currentPage, this.itemsPerPage).subscribe((res) => {
      this.totalItems = res.data.total;      
      this.country = res.data.result.map((item) => ({
        active: item.active,
        dateModified: item.dateModified,
        id: item.idCountry,
        name: item.nameCountry,
      }));
    });
  }

  createCountries(pais: ITableInterface) {
    const dto = {
      idCountry: pais.id ?? 0,
      nameCountry: pais.name,
      dateModified: pais.dateModified,
      active: pais.active
    };
  
    this._countrySvc.create(dto).subscribe({
      next: () => this.readAll(),
      error: (err) => console.error('Error al crear país', err)
    });
  } 

  updateCountries(pais: ITableInterface) {
    const dto = {
      idCountry: pais.id ?? 0,
      nameCountry: pais.name,
      dateModified: pais.dateModified,
      active: pais.active
    };
  
    this._countrySvc.update(dto).subscribe({
      next: () => this.readAll(),
      error: (err) => console.error('Error al actualizar país', err)
    });
  }
  
  deleteCountries(id: number) {
    console.log('id a eliminar: ', id);
    
    if (confirm('¿Estás seguro de eliminar este país?')) {
      this._countrySvc.delete(id).subscribe({
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
