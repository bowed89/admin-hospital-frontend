import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';

import swal from 'sweetalert';
import { Medico } from '../../models/medico.model';


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  public totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos() {
    
    let url = URL_SERVICIOS + '/medico';

    return this.http.get(url)
          .map((resp: any) => {
            this.totalMedicos = resp.total;
            return resp.medicos;
          });

  }

  buscarMedicos(valor: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + valor;
    return this.http.get(url)
                .map((resp: any) => resp.medicos);
  }

  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url)
            .map(resp => {
              swal('Hospital Borrado', 'Eliminado correctamente', 'success');
            });
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';
    
    //si tiene id entonces llama al back para actualizar
    if (medico._id) {

      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put(url, medico)
              .map((resp: any) => {
                swal('Médico Actualizado', medico.nombre, 'success');
                return resp.medico;
              });
    }
    // Crea nuevo medico
    url += '?token=' + this._usuarioService.token;

    return this.http.post(url, medico)
              .map((resp: any) => {
                swal('Médico creado', medico.nombre, 'success');
                return resp.medico;
              });
  }

  cargarMedico(id: string ) {

    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url)
              .map((resp: any) =>
                resp.medico
              );
  }

}
