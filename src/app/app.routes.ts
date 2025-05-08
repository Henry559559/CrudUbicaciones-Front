import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { CitiesComponent } from './pages/cities/cities.component';
import { AppPaths } from './shared/enums/app-paths.enum';

export const routes: Routes = [
    { path: '', redirectTo: AppPaths.Home, pathMatch: 'full' },
    { path: AppPaths.Home, component: HomeComponent },
    { path: AppPaths.Countries, component: CountriesComponent },
    { path: AppPaths.Departments, component: DepartmentsComponent },
    { path: AppPaths.Cities, component: CitiesComponent },
    // { path: '**', redirectTo: AppPaths.Home, pathMatch: 'full' },
];
