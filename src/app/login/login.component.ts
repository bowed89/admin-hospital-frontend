import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

// init_plugins() funcion para cargar efectos, o menus del custom.js
declare function init_plugins();

//libreria Google API
declare const gapi: any;

// Formulario de Aproximacion por template

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   recuerdame: boolean = false;
   email: string;
   auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit(): void {
    this.googleInit();
    init_plugins();
    // la varialbe está recibiendo del localStorage el valor 'email' 
    // que almacena cuando cuando habiltamos 'Recuerdame' en el login
    this.email = localStorage.getItem('email') || '';
    // Si hay un email almacenado entonces el check de 'Recuerdame' seguira habilitado
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }
  // Inicial con autenticacion en google...
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '501129259657-r0nj1ruglrpo6hlnohrcc2fjh3tmh1ss.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));

    });

  }

  // Cuando se haga click en el boton de google llame a un callback
  attachSignin(element) {
    // Obtengo los datos del token del usuario: name, id, email ....
    this.auth2.attachClickHandler(element, {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token)
      // Una vez que obtiene el token redirecciona al dashboard usando vanilla javascript porque esta forzando para que cargue bien la pagina
                .subscribe( () => window.location.href = '#/dashboard');


    });
  }

  ingresar(forma: NgForm) {

    // si es formulario es invalido no envia ningun dato
    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame)
              .subscribe(resp => this.router.navigate(['/dashboard']));

  }

}
