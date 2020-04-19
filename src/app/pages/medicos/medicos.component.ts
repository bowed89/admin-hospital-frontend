import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';


import swal from 'sweetalert';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor(
    public _medicosServices: MedicoService

  ) { }

  ngOnInit(): void {
    this.mostrarMedicos();
  }

  mostrarMedicos() {
    this._medicosServices.cargarMedicos()
          .subscribe(resp => {
            this.medicos = resp;
          });
  }

  borrarMedico(medico: string) {

    this._medicosServices.borrarMedico(medico)
          .subscribe(resp => {
            this.mostrarMedicos();
          });

  }


  buscarMedico(valor: string) {

    if (valor.length <= 0) {
      this.mostrarMedicos();
      return;
    }

    this._medicosServices.buscarMedicos(valor)
          .subscribe((resp: any) => {
            this.medicos = resp;
          });

  }



}
