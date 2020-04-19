import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

import 'rxjs/add/operator/map';

// es un plugin para mensajes popup 'sweetalert'
import swal from 'sweetalert';
import { URL } from 'url';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivo: SubirArchivoService
    ) {

      this.cargarStorage();

  }

  guardarStorage(id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {

    let url = URL_SERVICIOS + '/login/google';
    
    return this.http.post(url, {token})
    .map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      return true;
    });


  }

  login(usuario: Usuario, recordar: boolean = false) {

    // Mostrar email cuando habilite 'Recuerdame' en el login
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
    // La informacion recibida del backend se debe almacenar en un localStorage
                .map((resp: any) => {
                  this.guardarStorage(resp.id, resp.token, resp.usuario);
                  return true;
                });

  }

  crearUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
                .map((resp: any) => {
                  swal('Usuario creado', usuario.email, 'success');
                  return resp.usuario;

                });
  }

  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;

    return this.http.put(url, usuario)
              // la 'resp' lanza los nuevos datos actualizados y lo reemplaza al usuario antiguo que estaba guardado en el localStorage
                .map((resp: any) => {
                  // Si el id del usuario que esta enviando es igual al id del usuario q esta logueado actualmente(almacenado en el localStorage) actualiza
                  if (usuario._id === this.usuario._id) {
                    let usuarioDB: Usuario = resp.usuario;
                    this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
                  }

                  swal('Usuario actualizado', usuario.nombre, 'success');

                  return true;
                });
  }

  // Si existe el token esta logueado, sino no esta logueado
  estaLogueado() {
    return( this.token.length > 5) ? true: false;
  }
  
  cargarStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  cambiarImagen(file: File, id: string) {

    this._subirArchivo.subirArchivo(file, 'usuarios', id)
          .then((resp: any) => {
            this.usuario.img = resp.usuario.img;
            swal('Imagen actualizada', this.usuario.nombre, 'success');
            this.guardarStorage(id, this.token, this.usuario);

          })
          .catch(resp => {
            console.log(resp);
          });


  }

  cargarUsuarios(desde: number = 0) {

    let url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get(url);

  }

  buscarUsuarios(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
                .map((resp: any) => resp.usuarios);

  }

  borrarUsuario(id: String) {

    let url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;

    return this.http.delete(url)
                .map(resp => {
                  swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
                  return true;
                });

  }


}
