import { Component, OnInit } from '@angular/core';
import { PacienteModel } from 'src/app/paciente/modelos/paciente-info.model';
import { PacienteService } from 'src/app/paciente/servicios/paciente.service';
import { ConsultaModel } from '../../modelos/consulta-info.model';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ConsultaService } from '../../servicios/consulta.service';
import { CorreoService } from 'src/app/correos/servicios/correo.service';
import { CorreoModel } from 'src/app/correos/modelos/encuesta-info.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-consulta-agregar',
  templateUrl: './consulta-agregar.component.html',
  styleUrls: ['./consulta-agregar.component.scss']
})
export class ConsultaAgregarComponent implements OnInit {
  consulta: ConsultaModel = new ConsultaModel();
  paciente: PacienteModel= new PacienteModel();
  correo: CorreoModel = new CorreoModel();
  numeroConsulta: number;
  idPaciente: number;
  idEmpresa: string = "";
  idEmpleado: string = "";
  nombreCompleto: string = "";

  nombreFormControl = new FormControl('', [
    Validators.required
    ]);

  pacienteFormControl = new FormControl('', [
    Validators.required
    ]);

  dniFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
    ]);

  grupoSangFormControl = new FormControl('', [
    Validators.required
    ]);

  celularFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(9)
    ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
    ]);

  observacionFormControl = new FormControl('', [
   Validators.required
    ]);
  
  numeroConsultaFormControl = new FormControl('', [
   Validators.required,
    Validators.minLength(2)
    ]);

  recomendacionFormControl = new FormControl('', [
    Validators.required
     ]);  

  constructor(private router: Router, private route:ActivatedRoute, private correoservice:CorreoService, 
    private pacienteservice: PacienteService, private consultaservice:ConsultaService) { }

  ngOnInit(): void {
    this.idEmpresa = localStorage.getItem("idEmpresa");
    this.idEmpleado = localStorage.getItem("idEmpleado");
    this.nombreCompleto = localStorage.getItem("nombreCompleto");
    this.idPaciente = +this.route.snapshot.paramMap.get('idPaciente');
    console.log(this.idEmpresa);
    console.log(this.idPaciente);
		if ( this.idPaciente > 0) {
			this.cargarPaciente( this.idEmpresa, this.idPaciente );
		}
  }


  cargarPaciente( idEmpresa, idPaciente){
    this.pacienteservice.obtenerPaciente(idEmpresa, idPaciente)
    .subscribe(
      (response) => {
        console.log(response);
        if ( response.status && response.statusCode == 200 && response.message != "" ){
          console.log('Paciente encontrado');
          this.paciente = response.paciente;
          this.paciente.nombreCompleto = response.paciente['nombre']+ ' ' + response.paciente['apellidoPat']+ ' ' +response.paciente['apellidoMat'] ;
          this.numeroConsulta = this.paciente.numeroConsulta;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  regresar()
  {
    this.router.navigate(['/consulta/listado']);
  }


  guardarConsulta(){
    this.consulta.idEmpleado = +this.idEmpleado;
    this.consulta.idPaciente = +this.idPaciente;

    if ( !this.consulta.comentarios || !this.consulta.recomendaciones || !this.consulta.estado ) {
      return;
    }
    console.log(this.consulta)
    Swal.fire({
      title: 'Aviso',
      text: "¿Estás seguro que deseas guardar la consulta?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, guardar!',
      }).then((result) => {
      if (result.value) {
        this.consultaservice.guardarConsulta(this.consulta, +this.idEmpleado, this.idPaciente )
        .subscribe(
          (response) => {
            console.log(response);
            if ( response.status && response.statusCode == 200 && response.message != "" ){
              this.enviarConsultaPaciente();
              Swal.fire(
                'Enhorabuena!',
                'Los datos de la consulta ha sido guardado.',
                'success'
                );
              this.router.navigate(['/consulta/listado']);
            }
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  enviarConsultaPaciente(){
    this.correo.asunto = "Adrenalin - Resultados de Consulta Médica";
    this.correo.mensaje = "Se le hace llegar mediante este correo el resultado de su consulta adjuntando las observaciones y recomendaciones hechas en la reunión.\n\n"+
    "OBSERVACIONES:\n" + this.consulta.comentarios + "\n" + "RECOMENDACIONES:\n" + this.consulta.recomendaciones;
    this.correoservice.enviarCorreo(+this.idEmpresa, this.idPaciente , this.correo.asunto, this.correo.mensaje)
    .subscribe(
      (response) => {
        console.log(response);
        if ( response.status && response.message != "" )	{
          console.log('Correo Enviado')       
         }
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
