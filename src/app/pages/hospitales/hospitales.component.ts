import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';


import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this._modalUploadService.notificacion
          .subscribe(() => this.cargarHospitales());
  }

  cargarHospitales() {

    this._hospitalService.cargarHospitales()
    .subscribe(resp => {
        this.hospitales = resp;
      });
  }



  guardarHospital(hospital: Hospital) {

    this._hospitalService.actualizarHospital(hospital)
          .subscribe();

  }

  borrarHospital(hospital: Hospital) {

    this._hospitalService.borrarHospital(hospital._id)
          .subscribe(() => {
            this.cargarHospitales();
          });


  }

  buscarHospital(palabra: string) {

    if (palabra.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital(palabra)
            .subscribe(resp => {
              this.hospitales = resp;
            });
  }

  crearHospital() {
    swal("Ingrese el nombre del hospital", {
      content: {
        element: "input"
     },
     icon: 'info',
     buttons: ['Cancel', 'Ok'],
     dangerMode: true
    })
    .then((valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }

      this._hospitalService.crearHospital(valor)
            .subscribe(() => {
              this.cargarHospitales();
            });
    });
  }

  actualizarImagen(hospital: Hospital) {

    // para que '_modalUploadService' funcione correctamente se debe suscribir a la notificacion en el ngOnInit()
    this._modalUploadService.mostrarModal('hospitales', hospital._id);

  }

}
