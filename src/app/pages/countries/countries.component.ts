import { Component, inject, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { ITableInterface } from '../../shared/interfaces/table-interface';

@Component({
  selector: 'app-countries',
  imports: [TableComponent],
  template: ` <app-table [data]="country" [title]="'país'"></app-table> `,
  styleUrl: './countries.component.css',
})
export class CountriesComponent implements OnInit {
  private _countrySvc = inject(CountryService);

  country: ITableInterface[] = [];

  ngOnInit(): void {
    this.readAll();
  }

  readAll(): void {
    this._countrySvc.readAll().subscribe((res) => {
      res.data.result.forEach((item) => {
        this.country.push({
          active: item.active,
          dateModified: item.dateModified,
          id: item.idCountry,
          name: item.nameCountry,
        });
      });
    });
  }
}
