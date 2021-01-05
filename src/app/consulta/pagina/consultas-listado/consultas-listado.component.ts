import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultaModel } from '../../modelos/consulta-info.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ConsultaService } from '../../servicios/consulta.service';
import { PacienteModel } from 'src/app/paciente/modelos/paciente-info.model';
import { PacienteService } from 'src/app/paciente/servicios/paciente.service';
import Swal from 'sweetalert2';
import { VerHistorialComponent } from '../../dialogos/ver-historial/ver-historial.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-consultas-listado',
  templateUrl: './consultas-listado.component.html',
  styleUrls: ['./consultas-listado.component.scss']
})
export class ConsultasListadoComponent implements OnInit {
  idEmpleado: string = "";
  nombreDoctor: string = "";
  idEmpresa: string = "";
  pacienteSeleccionado:PacienteModel = null;

  dataSourceOne: MatTableDataSource<ConsultaModel>;
  displayedColumnsOne: string[] = [
    'dni',
	  'fullnombre',
    'celular',
    'email',
    'fecatencion'];

  @ViewChild('TableOnePaginator', {static: true}) tableOnePaginator: MatPaginator;
  @ViewChild('TableOneSort', {static: true}) tableOneSort: MatSort;

  dataSourceTwo: MatTableDataSource<PacienteModel>;
  displayedColumnsTwo: string[] = [
    'dni',
		'nombre-apellido',
    'celular',
    'grupoSanguineo',
    'ocupacion'];

  @ViewChild('TableTwoPaginator', {static: true}) tableTwoPaginator: MatPaginator;
  @ViewChild('TableTwoSort', {static: true}) tableTwoSort: MatSort;

  constructor(private router:Router, private consultaservice:ConsultaService, private pacienteservice:PacienteService, private dialog:MatDialog) {
    this.dataSourceOne = new MatTableDataSource;
    this.dataSourceTwo = new MatTableDataSource;
   }

  ngOnInit(): void {
    //tabla de consultas
    this.dataSourceOne.paginator = this.tableOnePaginator;
    this.dataSourceOne.sort = this.tableOneSort;
    //tabla de pacientes
    this.dataSourceTwo.paginator = this.tableTwoPaginator;
    this.dataSourceTwo.sort = this.tableTwoSort;
    
    this.idEmpleado = localStorage.getItem("idEmpleado");
    this.idEmpresa = localStorage.getItem("idEmpresa");
    console.log(this.idEmpresa);
    this.listarConsultas();
    this.listarPaciente();
  }

  //Metodo para listar los pacientes
  listarPaciente()
  {
    this.pacienteservice.seleccionarPacientes(+this.idEmpresa)
		.subscribe(
			(response) => {
				console.log(response);
				if ( response.status && response.statusCode == 200 && response.message != ""){
              const pacientes = response.listaPacientes;
              this.dataSourceTwo.data = pacientes;
				}
			},
			(err) => {
                console.log(err);
			}
		);
  }


  //Método para listar las consultas propias del medico
  listarConsultas()
  {
      console.log(+this.idEmpleado);
      this.consultaservice.seleccionarMisConsultas(+this.idEmpleado)
      .subscribe(
          (response) => {
              console.log(response);
              if ( response.status && response.message != ""){
                  const consulta = response.listaConsultas;
                  this.dataSourceOne.data = consulta;
                  this.dataSourceOne.paginator = this.tableOnePaginator;
                  this.dataSourceOne.sort = this.tableOneSort;
              }
          },
          (err) => {
              console.log(err);
          }
      );
  }

  seleccionarFilaPaciente(paciente:PacienteModel):void{
		this.pacienteSeleccionado=paciente;
  }
  
  exportarExcel():void {
    this.consultaservice.exportAsExcelFile(this.dataSourceOne.data, 'Reporte de personal');
  }

  verHistorial():void
  {
    let dialogRef = this.dialog.open(VerHistorialComponent,{
			disableClose: true, autoFocus:false});
		let instance = dialogRef.componentInstance;
		instance.idPaciente= +this.pacienteSeleccionado.idPaciente;
  }

  applyFilter(filterValue: string) {
    this.dataSourceTwo.filter = filterValue.trim().toLowerCase();
  }


  //Método para ir a la vista de agregar personal nuevo
  agregarConsulta():void
  {
    this.consultaservice.analizarNrocitas(this.pacienteSeleccionado.dni , this.pacienteSeleccionado.numeroConsulta )
      .subscribe(
          (response) => {
              console.log(response);
              if ( response.status && response.statusCode == 200 && response.message != "" ){
                  this.router.navigate(['/consulta/agregar/', this.pacienteSeleccionado.idPaciente]);
              }else{
                Swal.fire(
                  'Oops!',
                  'El paciente ya ha superado el Nro de citas disponibles para atender.',
                  'error'
                  );
              }
          },
          (err) => {
              console.log(err);
          }
      );
  }

}
