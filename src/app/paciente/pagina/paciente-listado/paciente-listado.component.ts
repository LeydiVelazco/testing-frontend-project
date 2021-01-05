import { Component, OnInit, ViewChild } from '@angular/core';
import { PacienteModel} from  '../../modelos/paciente-info.model';
import { Router} from  '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PacienteService } from '../../servicios/paciente.service';
import Swal from 'sweetalert2';
import { PersonalService } from 'src/app/personal/servicios/personal.service';

@Component({
  selector: 'app-paciente-listado',
  templateUrl: './paciente-listado.component.html',
  styleUrls: ['./paciente-listado.component.scss']
})
export class PacienteListadoComponent implements OnInit {

  pacienteSeleccionado:PacienteModel = null;
  idEmpresa: string = "";
  dataSourceOne: MatTableDataSource<PacienteModel>;
  displayedColumnsOne: string[] = [
    'dni',
		'nombre-apellido',
    'celular',
    'grupoSanguineo',
    'ocupacion'];
  // dni , nombres y apellidos concantenados , celular , email
  @ViewChild('TableOnePaginator', {static: true}) tableOnePaginator: MatPaginator;
  @ViewChild('TableOneSort', {static: true}) tableOneSort: MatSort;

  constructor(private router:Router, private pacienteservice:PacienteService, private personalservice:PersonalService) {
    this.dataSourceOne = new MatTableDataSource;
   }

  ngOnInit(): void {
    this.idEmpresa = localStorage.getItem("idEmpresa");
    this.listarPaciente();
    this.dataSourceOne.paginator = this.tableOnePaginator;
	  this.dataSourceOne.sort = this.tableOneSort;
  }

  exportarExcel():void {
    this.personalservice.exportAsExcelFile(this.dataSourceOne.data, 'Reporte de pacientes');
  }

//Método para llamar al api correspondiente a la api seleccionarPacientes pasándole un parámetro y listar a los pacientes
  listarPaciente()
  {
    this.pacienteservice.seleccionarPacientes(+this.idEmpresa)
		.subscribe(
			(response) => {
				if ( response.status && response.statusCode == 200 && response.message != ""){
              console.log(response);
              const pacientes = response.listaPacientes;
              this.dataSourceOne.data = pacientes;
				}
			},
			(err) => {
        console.log(err);
			}
		);
  }
 //Método para ir a la vista de agregar paciente nuevo
  agregarPaciente():void
  {
    this.router.navigate(['/paciente/agregar']);
  }

  importarPaciente()
  {
    this.router.navigate(['/paciente/importar']);
  }
 //Método para eliminar paciente
  eliminarPaciente()
  {
    if (this.pacienteSeleccionado == null) return;

      Swal.fire({
        title: 'Estas seguro?',
        text: "El registro seleccionado se eliminará!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
          // llamado sel servicio eliminarPaciente desde paciente.service.ts y se le pasa 1 parámetro
        if (result.value) {
        this.pacienteservice.eliminarPaciente(this.pacienteSeleccionado.idPaciente)
        .subscribe(
          (response) => {
            console.log(response);
            if (response.status){
              Swal.fire(
                'Eliminado!',
                'El registro a sido removido.',
                'success'
                );
              this.listarPaciente();
              this.pacienteSeleccionado = null;
            }
          },
          (err) => {
            console.log(err);
          }
        );
        }
        })
  }
//Método para ir a la vista de un determinado paciente
  editarPaciente()
  {
    if (this.pacienteSeleccionado == null) return;
    let paciente = this.pacienteSeleccionado;
    this.router.navigate(['/paciente/editar', paciente.idPaciente ]);
  }

  seleccionarFilaPaciente(paciente:PacienteModel):void{
		this.pacienteSeleccionado=paciente;
	}

}
