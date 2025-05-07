import { Routes } from '@angular/router';
import { PaisComponent } from './pages/pais/pais.component';

export const routes: Routes = [
    { path: 'paises', component: PaisComponent },
    { path: '', redirectTo: 'paises', pathMatch: 'full' }
];
