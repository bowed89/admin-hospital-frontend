import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto: string = 'oculto';

  // del backend recibe un objeto con sus valores(ok, mesnaje, hospital[id, nom,...])
  // y la de carga de imagenes del: localhost:3000/upload/hospitales/5e9330dea194e124f43ff8c1

  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log('modal upload listo!!!');
   }

   ocultarModal() {

    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;

   }
  // encargada de que aparezca el modal(ventana) para cargar imagenes del submenu usuarios
   mostrarModal(tipo: string, id: string) {

    this.oculto = '';
    this.id = id;
    this.tipo = tipo;

   }
}
