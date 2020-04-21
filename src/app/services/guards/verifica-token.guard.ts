import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {}

  canActivate(): Promise<boolean> | boolean {

    console.log('Inicio de Token Guard');

    let token = this._usuarioService.token;
    // agarramos la fecha de expiracion del token: pero primero se codifica el token a un json con atob
    let payload = JSON.parse(atob(token.split('.')[1]));
    // en el payload.exp envia el tiempo cuando expira el token
    let expirado =  this.expirado(payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      // retorna 'false' porque cuando el usuario ingrese a la pagina no podra ingresar por el false
      return false;
    }

    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva(fechaExp: number): Promise<boolean> {

    return new Promise((resolve, reject) => {

      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();

      // si en una hora se vence el token entonces se renueva
      ahora.setTime(ahora.getTime() + (1 * 60 * 60 * 1000));

      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {

        this._usuarioService.renuevaToken()
                    .subscribe( () => {
                      resolve(true);
                    }, () => {
                      this.router.navigate(['/login']);
                      reject(false);
                    });
      }

    });

  }

  expirado(fechaExp: number) {

    let ahora = new Date().getTime() / 1000;

    if (fechaExp < ahora) {
      // esta expirado
      return true;
    } else {
      // no esta expirado
      return false;
    }
  }
  
}
