import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// es un plugin para mensajes popup 'sweetalert'
import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

// init_plugins() funcion para cargar efectos, o menus del custom.js
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  // Formularios de tipo REACTIVOS
  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  //Valida dos campos (los dos passwords)
  sonIguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      // Si los pass son iguales entonces la validacion pasa con un null
      if (pass1 === pass2) {
        return null;
      } 
      // else impide q el formulario sea valido
      return {
        sonIguales: true
      }
    }
  }

  ngOnInit(): void {
    // son los campos del register....
    init_plugins();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false) // enviaremos por un popup
    }, { validators: this.sonIguales('password', 'password2') });

    // llenamos el formulario con unos datos aleatorios
    this.forma.setValue({
      nombre: 'Test',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });


  }

  registrarUsuario() {
    //Si el formulario no es valido entonces no envia ningun dato del formulario
    if (this.forma.invalid) {
      return;
    }
    // Si no está aceptando las condiciones muestra un mensaje y no envia ningun dato
    if (!this.forma.value.condiciones) {
      // es un plugin para mensajes popup 'sweetalert'
      swal('Importante', 'Debe aceptar las condiciones', 'warning');

      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario(usuario)
                // resp obtiene respuesta del backend (igual que el postman)
                .subscribe(resp => {
                console.log(resp);
                this.router.navigate(['/login']);
    });
  }

}
