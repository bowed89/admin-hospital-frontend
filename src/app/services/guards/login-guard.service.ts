import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
    ) { }

  
  canActivate() {
    if (this._usuarioService.estaLogueado()) {
      return true;
    } else {
      // Sino esta almacenado el token en el localStorage
      // al momento de refrescar la pagina se direcciona al login porque quiere decir que no esta logueado ...
      console.log('BLOQUEADO ´POR EL GUARD');
      this.router.navigate(['/login']);
      return false;
    }
  }

  
}

