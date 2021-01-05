import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PacienteModel } from '../../modelos/paciente-info.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe} from '@angular/common';
import { PacienteService } from '../../servicios/paciente.service';
import { FormControl, Validators } from '@angular/forms';
import { PlanService } from 'src/app/plan/servicios/plan.service';
import { PlanModel } from 'src/app/plan/modelos/plan-info.model';
//import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
//import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/format-datepicker';


@Component({
  selector: 'app-paciente-agregar',
  templateUrl: './paciente-agregar.component.html',
  styleUrls: ['./paciente-agregar.component.scss'],
  /*providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}]*/
})
export class PacienteAgregarComponent implements OnInit {
  paciente: PacienteModel = new PacienteModel();
  nacimiento: string;
  idEmpresa: string = "";
  planes:Array<PlanModel>;
  paciente_id: number = 0;
  actualizarButton: boolean = false;
  guardarButton: boolean = true;

  nombreFormControl = new FormControl('', [
    Validators.required
    ]);

  apellidoPatFormControl = new FormControl('', [
    Validators.required
    ]);

  apellidoMatFormControl = new FormControl('', [
    Validators.required
    ]);

  dniFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
    ]);

  direccionFormControl = new FormControl('', [
    Validators.required
    ]);

  ocupacionFormControl = new FormControl('', [
    Validators.required
    ]);

  grupoSangFormControl = new FormControl('', [
    Validators.required
    ]);

  generoFormControl = new FormControl('', [
    Validators.required
    ]);

  estCivFormControl = new FormControl('', [
    Validators.required
    ]);

  nacimientoFormControl = new FormControl('', [
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

  idPlanFormControl = new FormControl('', [
    Validators.required
    ]);

  constructor(private route:ActivatedRoute,private router: Router, private datePipe: DatePipe,private planservice: PlanService, private pacienteservice: PacienteService) { }

  ngOnInit(): void {
    this.idEmpresa = localStorage.getItem("idEmpresa");
    this.paciente_id = +this.route.snapshot.paramMap.get('paciente_id');
    if ( this.paciente_id > 0) {
      this.cargarPaciente( this.idEmpresa, this.paciente_id );
      this.actualizarButton = true;
		  this.guardarButton = false;
    }
    this.listarPlanes();
  }

  cargarPaciente( idEmpresa, idPaciente){
    this.pacienteservice.obtenerPaciente(idEmpresa, idPaciente)
    .subscribe(
      (response) => {
        console.log(response);
        if ( response.status && response.statusCode == 200 && response.message != "" ){
          console.log('Paciente encontrado');
          this.paciente = response.paciente;
          let fecha= response.paciente.nacimiento.substring(0, 10);
          this.nacimiento=fecha;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  listarPlanes():void {
    this.planservice.seleccionarPlanes()
      .subscribe(
        (response) => {
          //console.log(response);
          if ( response.status && response.message != ""){
            this.planes = response.cronogramas;
            //console.log(response);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  actualizarPaciente()
  {

    // validacion de campos para que no sean vacios
    if ( !this.paciente.nombre || !this.paciente.apellidoPat || !this.paciente.apellidoMat ||
      !this.paciente.dni || !this.paciente.direccion || !this.paciente.ocupacion || !this.paciente.grupoSanguineo ||
      !this.paciente.genero || !this.paciente.estadoCivil || !this.nacimiento || !this.paciente.celular || !this.paciente.email) {
      return;
    }
    // validacion de campos para que no sean incorrectos mediante FormControl
    if ( this.nombreFormControl.invalid || this.apellidoPatFormControl.invalid || this.apellidoMatFormControl.invalid ||
      this.dniFormControl.invalid || this.direccionFormControl.invalid || this.ocupacionFormControl.invalid ||
      this.grupoSangFormControl.invalid || this.generoFormControl.invalid || this.estCivFormControl.invalid ||
      this.nacimientoFormControl.invalid || this.celularFormControl.invalid || this.emailFormControl.invalid) {
      return;
    }
    //modal para que muestre el mensaje para confirmación de guardado del paciente mientras se hace el servicio
    let selectedDate = this.datePipe.transform(this.nacimiento, 'yyyy/MM/dd');
    this.paciente.nacimiento=selectedDate;
    console.log(this.paciente)
    this.pacienteservice.actualizarPaciente(this.paciente, this.paciente_id )
    .subscribe(
      (response) => {
        console.log(response);
        if ( response.status && response.statusCode == 200 && response.message != "" ){
          Swal.fire(
            'Enhorabuena!',
            'El paciente ha sido actualizado.',
            'success'
            );
          this.router.navigate(['/paciente/listado']);
        }
      },
      (err) => {
        console.log(err);
      }
    );   
  }

  guardarPaciente()
  {

    // validacion de campos para que no sean vacios
    if ( !this.paciente.nombre || !this.paciente.apellidoPat || !this.paciente.apellidoMat ||
      !this.paciente.dni || !this.paciente.direccion || !this.paciente.ocupacion || !this.paciente.grupoSanguineo ||
      !this.paciente.genero || !this.paciente.estadoCivil || !this.nacimiento || !this.paciente.celular || !this.paciente.email) {
      return;
    }
  // validacion de campos para que no sean incorrectos mediante FormControl
    if ( this.nombreFormControl.invalid || this.apellidoPatFormControl.invalid || this.apellidoMatFormControl.invalid ||
      this.dniFormControl.invalid || this.direccionFormControl.invalid || this.ocupacionFormControl.invalid ||
      this.grupoSangFormControl.invalid || this.generoFormControl.invalid || this.estCivFormControl.invalid ||
      this.nacimientoFormControl.invalid || this.celularFormControl.invalid || this.emailFormControl.invalid) {
      return;
    }
//modal para que muestre el mensaje para confirmación de guardado del paciente mientras se hace el servicio
    let selectedDate = this.datePipe.transform(this.nacimiento, 'yyyy/MM/dd');
    this.paciente.nacimiento=selectedDate;
    console.log(this.paciente)
      Swal.fire({
      title: 'Aviso',
      text: "¿Estás seguro que deseas guardar el paciente?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, guardar!',

      }).then((result) => {
        // llamado sel servicio guardarPersonal desde paciente.service.ts y se le pasa 2 parametros
      if (result.value) {
        this.pacienteservice.guardarPaciente(this.paciente, +this.idEmpresa, +this.paciente.idPlan)
        .subscribe(
          (response) => {
            console.log(response);
            if ( response.status && response.statusCode == 200 && response.message != "" ){
              Swal.fire(
                'Enhorabuena!',
                'El paciente ha sido guardado.',
                'success'
                );
              this.router.navigate(['/paciente/listado']);
            }
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  regresar()
  {
    this.router.navigate(['/paciente/listado']);
  }

  keypressNumbers(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
    }

  keypressLetters(event: any) {
    const pattern = /[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
}
