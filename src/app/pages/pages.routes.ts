import { Routes, RouterModule } from '@angular/router';

// Pagina Principal PagesComponent
import { PagesComponent } from '../pages/pages.component';

import { ProgressComponent } from '../pages/progress/progress.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { Graficas1Component } from '../pages/graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { ProfileComponent } from './profile/profile.component';

import { LoginGuardService } from '../services/guards/login-guard.service';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

// LoginGuardService protege las rutas donde querramos entrar 
const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardService],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de Colores' } },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },

            // Mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios' } },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
            { path: 'medicos', component: MedicosComponent , data: { titulo: 'Mantenimiento de Médicos' } },
            { path: 'medico/:id', component: MedicoComponent , data: { titulo: 'Actualización de Médicos' } },

            /*Si la ruta esta vacia redirecciona al dashboard */
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            

        ]
    },
]

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
