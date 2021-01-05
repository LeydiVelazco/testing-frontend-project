import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PacienteModel } from 'src/app/paciente/modelos/paciente-info.model';
import { PacienteService } from 'src/app/paciente/servicios/paciente.service';
import Swal from 'sweetalert2';
import { CorreoModel } from '../modelos/encuesta-info.model';
import { CorreoService } from '../servicios/correo.service';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-enviar-correo',
  templateUrl: './enviar-correo.component.html',
  styleUrls: ['./enviar-correo.component.scss']
})
export class EnviarCorreoComponent implements OnInit {
  idEmpresa: string = "";
  correo: CorreoModel = new CorreoModel();
  pacienteSeleccionado:PacienteModel = null;
  
  asuntoFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(70)
    ]);

    
  mensajeFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(3000)
    ]);
  
  

  dataSourceTwo: MatTableDataSource<CorreoModel>;
  displayedColumnsTwo: string[] = [
    'dni',
		'nombre-apellido',
    'genero',
    'grupoSanguineo',
    'ocupacion'];

  @ViewChild('TableTwoPaginator', {static: true}) tableTwoPaginator: MatPaginator;
  @ViewChild('TableTwoSort', {static: true}) tableTwoSort: MatSort; 
 
  constructor(private pacienteservice:PacienteService, private correoservice:CorreoService) {
    this.dataSourceTwo = new MatTableDataSource;    
   }

  ngOnInit(): void {
    this.idEmpresa = localStorage.getItem("idEmpresa");
    this.listarPaciente();
    this.dataSourceTwo.paginator = this.tableTwoPaginator;
	  this.dataSourceTwo.sort = this.tableTwoSort;
  }

  seleccionarFilaPaciente(paciente:PacienteModel):void{
		this.pacienteSeleccionado=paciente;
  }

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

  enviarCorreo(){
    Swal.fire({
      title: 'Aviso',
      text: "Estas seguro que desea enviar un correo electrónico al usuario " + 
      this.pacienteSeleccionado.nombre + ' '+this.pacienteSeleccionado.apellidoPat + ' ' + this.pacienteSeleccionado.apellidoMat + '?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, enviar!' ,
  
      }).then((result) => {
      if (result.value) {
        this.correoservice.enviarCorreo(+this.idEmpresa, +this.pacienteSeleccionado.idPaciente, this.correo.asunto, this.correo.mensaje)
        .subscribe(
          (response) => {
            console.log(response);
            if ( response.status && response.message != "" )	{
              // muestra el model success si el response es correcto
              Swal.fire(
                'Enhorabuena!',
                'El correo ha sido enviado al usuario.',
                'success'
                );
              this.correo.asunto="";
              this.correo.mensaje="";  
              this.pacienteSeleccionado = null;
             }
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

}
