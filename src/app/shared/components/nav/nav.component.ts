import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppPaths } from '../../enums/app-paths.enum';

@Component({
  selector: 'app-nav',
  imports: [RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" [routerLink]="[AppPaths.Home]">BEX</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarScroll">
      <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" [routerLink]="[AppPaths.Countries]">Países</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" [routerLink]="[AppPaths.Departments]">Departamentos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" [routerLink]="[AppPaths.Cities]">Ciudades</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Buscar..." aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Buscar.</button>
      </form>
    </div>
  </div>
</nav>
<br>
  `,
  styleUrl: './nav.component.css',
})
export class NavComponent {
  AppPaths = AppPaths;
}
