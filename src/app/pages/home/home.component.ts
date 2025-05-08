import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppPaths } from '../../shared/enums/app-paths.enum';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  template: `
    <div class="container">
    <h2 class="text-center">Bienvenido, ¿qué quieres hacer hoy?</h2>
      <br>
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <div class="card" style="width: 16rem;">
                <img
                  src="https://www.clarin.com/2024/09/13/wc7Fzxs_h_2000x1500__1.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <div class="d-grid gap-2">
                    <a
                      [routerLink]="['/' + AppPaths.Countries]"
                      class="btn btn-primary"
                      >Ir a los países</a
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card" style="width: 16rem;">
                <img
                  src="https://www.clarin.com/2024/09/13/wc7Fzxs_h_2000x1500__1.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <div class="d-grid gap-2">
                    <a
                      [routerLink]="['/' + AppPaths.Departments]"
                      class="btn btn-primary btn-block"
                      >Ir a los departamentos</a
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card" style="width: 16rem;">
                <img
                  src="https://www.clarin.com/2024/09/13/wc7Fzxs_h_2000x1500__1.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <div class="d-grid gap-2">
                    <a
                      [routerLink]="['/' + AppPaths.Cities]"
                      class="btn btn-primary btn-block"
                      >Ir a las ciudades</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  AppPaths = AppPaths;
}
