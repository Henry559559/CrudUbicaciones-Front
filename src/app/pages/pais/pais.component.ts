import { Component, OnInit } from '@angular/core';
import { PaisService, Pais } from '../../services/pais.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css'],
  imports: [CommonModule] // 👈 esto es lo que faltaba
})
export class PaisComponent implements OnInit {
  paises: Pais[] = [];

  constructor(private paisService: PaisService) {}

  ngOnInit(): void {
    this.paisService.getPaises().subscribe(data => {
      this.paises = data;
    });
  }
}
