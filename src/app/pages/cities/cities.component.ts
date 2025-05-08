import { Component, inject } from '@angular/core';
import { CityService } from '../../services/city.service';
import { ITableInterface } from '../../shared/interfaces/table-interface';
import { TableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-cities',
  imports: [TableComponent],
    template: ` <app-table [data]="country" [title]="'ciudad'"></app-table> `,
  styleUrl: './cities.component.css'
})
export class CitiesComponent {

  private _citySvc = inject(CityService);

  country: ITableInterface[] = [];

  ngOnInit(): void {
    this.readAll();
  }

  readAll(): void {
    this._citySvc.readAll().subscribe((res) => {
      res.data.result.forEach((item) => {
        this.country.push({
          active: item.active,
          dateModified: item.dateModified,
          id: item.idCity,
          name: item.nameCity,
        });
      });
    });
  }
}
