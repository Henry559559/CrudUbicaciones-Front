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
      console.log("Cuantos intems: ",this.totalItems, res.data.total);
      
      this.city = res.data.result.map((item) => ({
        active: item.active,
        dateModified: item.dateModified,
        id: item.idCity,
        name: item.nameCity,
      }));
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.readAll();
  }
}
