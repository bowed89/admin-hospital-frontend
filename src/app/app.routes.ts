import { RouterModule, Routes } from '@angular/router';

import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';


export const appRoutes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    /* Si se escribe una dirección erronea se direcciona al nopagefound */
    { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
