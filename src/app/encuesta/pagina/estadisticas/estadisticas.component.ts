import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ObservacionModel } from '../../modelos/estadisticas/observacion/observacion-info.model';
import { EncuestaService } from '../../servicios/encuesta.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';

export interface pregunta{
  viewValue:string;
}

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {
  idEmpresa: number;
  datos = [];
  datosChart = [];
  observaciones = [];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Puntaje 1', 'Puntaje 2', 'Puntaje 3', 'Puntaje 4', 'Puntaje 5'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [0,0,0,0,0] , label: 'Datos estadísticos de Pregunta 1'},
  ];


  preguntas: pregunta[] = [
    {viewValue: '¿Cómo calificaría el servicio general recibido por el personal médico?'},
    {viewValue: '¿Cómo calificaría el trato brindado en la consulta por el personal médico?'},
    {viewValue: '¿Cómo calificaría las indicaciones dadas por el personal médico?'},
    {viewValue: '¿Cómo calificaría el diagnóstico brindado por el personal médico?'},
    {viewValue: '¿Cómo calificaría hasta el momento el tratamiento brindado por el personal médico?'}
  ];

  dataSourceOne: MatTableDataSource<ObservacionModel>;
  displayedColumnsOne: string[] = [
    'numero',
    'observacion'];
  // dni , nombres y apellidos concantenados , celular , email
  @ViewChild('TableOnePaginator', {static: true}) tableOnePaginator: MatPaginator;
  @ViewChild('TableOneSort', {static: true}) tableOneSort: MatSort;
  

  constructor(private encuestaservice:EncuestaService) {
    this.dataSourceOne = new MatTableDataSource;
   }

  ngOnInit(): void {
    this.idEmpresa = +localStorage.getItem("idEmpresa");
    this.cargarDatosEstadisticos();
    this.dataSourceOne.paginator = this.tableOnePaginator;
	  this.dataSourceOne.sort = this.tableOneSort;
  }

  cargarDatosEstadisticos(){
    this.encuestaservice.cargarDatosEstadisticos(+this.idEmpresa)
		.subscribe(
			(response) => {
				console.log(response);
				if ( response.status && response.statusCode == 200 && response.message != ""){
             this.datos = response.datos;
             this.barChartData = [];
             for (let index = 0; index < this.datos.length ; index++) {
                this.datosChart  = Object.values(this.datos[index]);
                this.barChartData.push(
                  { data: this.datosChart , label: 'Datos estadísticos de Pregunta' + (index+1)},
                ); 
             }           
             console.log(this.datosChart);

             for (let index = 0; index < response.observaciones.length; index++) {
                this.observaciones.push({numero: index+1 , observacion: response.observaciones[index]})
             } 

             this.dataSourceOne.data =  this.observaciones;
				}
			},
			(err) => {
                console.log(err);
			}
		);
  }
}
