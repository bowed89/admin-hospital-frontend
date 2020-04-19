import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent implements OnInit {
  titulo: string;

  constructor(private _router: Router, private title: Title, private meta: Meta) {

    // Con subscribe se llama a la funcion getDataRoute()
    this.getDataRoute()
    .subscribe(data => {
      
      this.titulo = data.titulo;
      // title muestra el nombre de los titulos de las paginas donde estamos arriba del navegador ...
      this.title.setTitle(this.titulo);

      // metatags muestran cierta descripcion de cada página cuando inspceccionamos elementos ...
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      };
      this.meta.updateTag(metaTag);
    });
   }

  ngOnInit() {
  }


  /*
    Para obtener el data: { titulo: 'Gráficas' } y demás titulos del pages.routes.ts
    que agregamos tenemos que obtener de 'ActivationEnd' */

    getDataRoute() {
    return this._router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      // Existen dos ActivationEnd, tenemos q elegir el que su firstchild sea null, xq ahi esta el titulo que queremos...
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      // el titulo que pusimos en el pages.routes.ts se encuentra en el data ...
      map((evento: ActivationEnd) => evento.snapshot.data)
    );
  }

}
