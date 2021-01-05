import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PacienteModel } from 'src/app/paciente/modelos/paciente-info.model';
import { PacienteService } from 'src/app/paciente/servicios/paciente.service';
import Swal from 'sweetalert2';
import { EncuestaService } from '../../servicios/encuesta.service';

export interface filtro {
  id_filtro: number;
  viewValue: string;
}

export interface genero {
  id_genero: string;
  viewValue: string;
}

@Component({
  selector: 'app-enviar-encuesta',
  templateUrl: './enviar-encuesta.component.html',
  styleUrls: ['./enviar-encuesta.component.scss']
})
export class EnviarEncuestaComponent implements OnInit {
  idEmpresa: string = "";
  pacienteSeleccionado:PacienteModel = null;
  dataSourceTwo: MatTableDataSource<PacienteModel>;
  filtro_id:number;
  nombre:boolean = false;
  dni:boolean = false;
  email:boolean = false;
  genero:boolean = false;
  sangre:boolean = false;
  ocupacion:boolean = false;
  filtro: boolean = false;
  sinFiltro: boolean = true;
  nomPaciente:string="";
  pacientes: Array<PacienteModel>;

  filtros: filtro[] = [
    {id_filtro: 0, viewValue: 'Sin filtros'},
    {id_filtro: 1, viewValue: 'DNI'},
    {id_filtro: 2, viewValue: 'Nombres o Apellidos'},
    {id_filtro: 5, viewValue: 'Tipo de Sangre'},
    {id_filtro: 6, viewValue: 'Ocupacion'}
  ];

  generos: genero[] = [
    {id_genero: "M", viewValue: 'Masculino'},
    {id_genero: "F", viewValue: 'Femenino'}
  ];

  displayedColumnsTwo: string[] = [
    'dni',
		'nombre-apellido',
    'genero',
    'grupoSanguineo',
    'ocupacion'];

  @ViewChild('TableTwoPaginator', {static: true}) tableTwoPaginator: MatPaginator;
  @ViewChild('TableTwoSort', {static: true}) tableTwoSort: MatSort;
  
  constructor(private encuestaservice:EncuestaService,private pacienteservice:PacienteService, private router:Router) {
    this.dataSourceTwo = new MatTableDataSource;
   }

  ngOnInit(): void {
    this.idEmpresa = localStorage.getItem("idEmpresa");
    this.listarPaciente();
    this.dataSourceTwo.paginator = this.tableTwoPaginator;
	  this.dataSourceTwo.sort = this.tableTwoSort;
  }

  select(e:any){
    this.filtro = true;
    if (+e==1) {
      this.sinFiltro = false;
      this.aplicarFiltro("");
      this.dni = true;
      this.nombre = false;
      this.email = false;
      this.genero = false;
      this.sangre = false;
      this.ocupacion = false;
    }else if(+e==2){
      this.sinFiltro = false;
      this.aplicarFiltro("");
      this.dni = false;
      this.nombre = true;
      this.email = false;
      this.genero = false;
      this.sangre = false;
      this.ocupacion = false;
    }else if(+e==4){
      this.sinFiltro = false;
      this.aplicarFiltro("");
      this.dni = false;
      this.nombre = false;
      this.email = false;
      this.genero = true;
      this.sangre = false;
      this.ocupacion = false;
    }else if(+e==5){
      this.sinFiltro = false;
      this.aplicarFiltro("");
      this.dni = false;
      this.nombre = false;
      this.email = false;
      this.genero = false;
      this.sangre = true;
      this.ocupacion = false;
    }else if(+e==6){
      this.sinFiltro = false;
      this.aplicarFiltro("");
      this.dni = false;
      this.nombre = false;
      this.email = false;
      this.genero = false;
      this.sangre = false;
      this.ocupacion = true;
    }else{
      this.sinFiltro = true;
      this.filtro = false;
      this.aplicarFiltro("");
      this.dni = false;
      this.nombre = false;
      this.email = false;
      this.genero = false;
      this.sangre = false;
      this.ocupacion = false;
    }

  }

  aplicarFiltro(filterValue: string) {
    console.log(filterValue)
    this.dataSourceTwo.filter = filterValue.trim().toLowerCase();
  }

  //Metodo para listar los pacientes
  listarPaciente()
  {
    this.pacienteservice.seleccionarPacientes(+this.idEmpresa)
		.subscribe(
			(response) => {
				console.log(response);
				if ( response.status && response.statusCode == 200 && response.message != ""){
              this.pacientes = response.listaPacientes;
              this.dataSourceTwo.data = this.pacientes;
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

  encuestaUsuarioEspecifico(){

    Swal.fire({
      title: 'Aviso',
      text: "Estas seguro que desea enviar la encuesta al usuario " + 
      this.pacienteSeleccionado.nombre + ' '+this.pacienteSeleccionado.apellidoPat + ' ' + this.pacienteSeleccionado.apellidoMat + '?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, enviar!' ,
  
      }).then((result) => {
      if (result.value) {
        this.encuestaservice.enviarEncuesta(+this.idEmpresa, +this.pacienteSeleccionado.idPaciente)
        .subscribe(
          (response) => {
            console.log(response);
            if ( response.status && response.message != "" )	{
              // muestra el model success si el response es correcto
              Swal.fire(
                'Enhorabuena!',
                'La encuesta ha sido enviada.',
                'success'
                );
              this.router.navigate(['/encuesta/seleccionar-usuario']); //Redirige al listado de planes después de un guardado exitoso
             }
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });

  }

  encuestaMasiva(){
    Swal.fire({
      title: 'Aviso',
      text: "Estas seguro que desea enviar la encuesta a todos los usuarios?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, enviar!' ,
  
      }).then((result) => {
      if (result.value) { 
          for (let index = 0; index < this.dataSourceTwo.data.length; index++) {          
              this.encuestaMasivaTabla( +this.dataSourceTwo.data[index].idPaciente );
        }
      }
    });
  }

  encuestaMasivaFiltro(){
    Swal.fire({
      title: 'Aviso',
      text: "Estas seguro que desea enviar la encuesta a todos los usuarios filtrados?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, enviar!' ,
      }).then((result) => {
      if (result.value) { 
          for (let index = 0; index < this.dataSourceTwo.filteredData.length; index++) {          
              this.encuestaMasivaTabla( +this.dataSourceTwo.filteredData[index].idPaciente );
              //console.log(+this.dataSourceTwo.filteredData[index].idPaciente);
        }
      }
    });
  }

  encuestaMasivaTabla( idPaciente: number ){
    this.encuestaservice.enviarEncuesta(+this.idEmpresa, idPaciente)
    .subscribe(
      (response) => {
        console.log(response);
        if ( response.status && response.message != "" )	{
          // muestra el model success si el response es correcto
          console.log('Encuesta enviada')
         }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  verEncuesta(){
    this.router.navigate(['/encuesta/ver-encuesta/',this.idEmpresa,0]);
  }

}
