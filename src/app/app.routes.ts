import { RouterModule, Routes } from '@angular/router';

import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';

// Guard
import { LoginGuardService } from './services/guards/login-guard.service';


export const appRoutes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardService],
        // una vez que se loguee carga el modulo PagesModule (lazyload)
        loadChildren: './pages/pages.module#PagesModule'

    },
    /* Si se escribe una dirección erronea se direcciona al nopagefound */
    { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
