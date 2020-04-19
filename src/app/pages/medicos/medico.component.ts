import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService } from '../../services/service.index';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(

    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
    
  ) { 
    
    // Obtenemos toodos los parametros que tenemos en la ruta (url)
    // obtenemos el 'id' --> se llama ['id'] ya q llamamos en el 'pagesroutes' asi
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      //esta cargando los datos del medico con  su id para la pag'medico' para que se pueda modificar
      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }

    });
  }

  ngOnInit(): void {

    this._hospitalService.cargarHospitales()
          .subscribe(resp =>
            this.hospitales = resp);

    this._modalUploadService.notificacion
          .subscribe(resp => {
            this.medico.img = resp.medico.img;
          });
  }

  guardarMedico(f: NgForm) {
    this._medicoService.guardarMedico(this.medico)
          .subscribe(resp => {
            // muestra el div con la foto del medico porq en el html pregunta si existe *ngIf = "medico._id"
            this.medico._id = resp._id;
            // navega al url de medico/idDelnuevoMedico obteniendo el nuevo id del medico creado 
            this.router.navigate(['/medico', resp._id]);

          });
  }

  // func para que obtenga un hospital mediante su ID del select
  cambioHospital(id: string) {

    this._hospitalService.obtenerHospital(id)
          .subscribe(resp => {
            this.hospital = resp;
          });

  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id)
          .subscribe(resp => {

            this.medico = resp;
            this.medico.hospital = resp.hospital._id;

            //cargo hospital por su id para cargar la foto del hospital
            this.cambioHospital(this.medico.hospital);
          
          });
  }

  cambiarFoto() {

    this._modalUploadService.mostrarModal('medicos', this.medico._id);

  }

}
