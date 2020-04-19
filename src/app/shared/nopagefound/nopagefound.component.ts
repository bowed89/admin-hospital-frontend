import { Component, OnInit } from '@angular/core';

// init_plugins() funcion para cargar efectos, o menus del custom.js
declare function init_plugins();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    init_plugins();
  }

}
