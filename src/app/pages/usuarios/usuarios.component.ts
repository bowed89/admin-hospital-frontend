import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
// es un plugin para mensajes popup 'sweetalert'
import swal from 'sweetalert';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  // para la paginacion que se creo en el backend
  // ej: localhost:3000/usuario?desde=5
  desde: number = 0;

  totalRegistros: number = 0;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService

  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
          .subscribe(resp => this.cargarUsuarios());
  }

  cargarUsuarios() {

    this._usuarioService.cargarUsuarios(this.desde)
              .subscribe((resp: any) => {
                  this.totalRegistros = resp.total;
                  this.usuarios = resp.usuarios;
                });

  }

    // Cambiar paginacion
    cambiarDesde(valor: number) {

      let desde = this.desde + valor;

      console.log(desde);

      if (desde >= this.totalRegistros) {
        return;
      }

      if (desde < 0) {
        return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario(termino: string) {

    // Sino hay terminos en el input entonces que solo cargue todos los usuarios
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }


    this._usuarioService.buscarUsuarios(termino)
          .subscribe((usuarios: Usuario[]) => {
            this.usuarios = usuarios;
          });
  }

  borrarUsuario(usuario: Usuario) {

    // 'this._usuarioService.usuario._id' es el id del usuario que esta logueado actualmente en la app
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    // Mensaje de estar seguro borrar con swal
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: ['Cancel', 'Ok']
    }) // si hago click en ok en el button retorna un 'true' y llama al servicio de borrar...
    .then(borrar => {

      if (borrar) {

        this._usuarioService.borrarUsuario(usuario._id)
              .subscribe(borrado => {
                console.log(borrado);
                this.cargarUsuarios();
              });

      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario)
          .subscribe(resp => {
            
          });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

}
