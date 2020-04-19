import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-donuts',
  templateUrl: './grafico-donuts.component.html',
  styles: []
})
export class GraficoDonutsComponent implements OnInit {
  @Input() doughnutChartLabels: string [] = [];
  @Input() doughnutChartData: number[] = [];
  @Input()  doughnutChartType: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
