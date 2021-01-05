import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalModel } from '../../modelos/personal-info.model';
import { DatePipe} from '@angular/common';
import { PersonalService } from '../../servicios/personal.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-agregar',
  templateUrl: './personal-agregar.component.html',
  styleUrls: ['./personal-agregar.component.scss']
})
export class PersonalAgregarComponent implements OnInit {

  personal: PersonalModel = new PersonalModel();
  nacimiento: string;
  idEmpresa: string = "";
  personal_id: number = 0;
  actualizarButton: boolean = false;
  guardarButton: boolean = true;

  dniFormControl = new FormControl('', [
  Validators.required,
  Validators.minLength(8)
  ]);

  apellidoPatFormControl = new FormControl('', [
  Validators.required,
  ]);

  apellidoMatFormControl = new FormControl('', [
  Validators.required,
  ]);

  nombresFormControl = new FormControl('', [
  Validators.required
  ]);

  fechaNacimientoFormControl = new FormControl('', [
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

  direccionFormControl = new FormControl('', [
  Validators.required
  ]);

  cargoFormControl = new FormControl('', [
  Validators.required
  ]);

  generoFormControl = new FormControl('', [
  Validators.required
  ]);

  constructor(private route:ActivatedRoute,private router:Router, private datePipe: DatePipe, private personalservice: PersonalService) { }

  ngOnInit(): void {
    this.idEmpresa = localStorage.getItem("idEmpresa");
    this.personal_id = +this.route.snapshot.paramMap.get('personal_id');
    if ( this.personal_id > 0) {
      this.cargarPersonal( this.idEmpresa, this.personal_id );
      this.actualizarButton = true;
		  this.guardarButton = false;
    }
  }


  cargarPersonal( idEmpresa, idPersonal){
    this.personalservice.obtenerPersonal(idEmpresa, idPersonal)
    .subscribe(
      (response) => {
        console.log(response);
        if ( response.status && response.statusCode == 200 && response.message != "" ){
          console.log('Personal encontrado');
          this.personal = response.personal;
          let fecha= response.personal.nacimiento.substring(0, 10);
          this.nacimiento=fecha;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  actualizarPersonal(){

    let selectedDate = this.datePipe.transform(this.nacimiento, 'yyyy/MM/dd');
    this.personal.nacimiento=selectedDate;

    // validacion de campos para que no sean vacios
    if ( !this.personal.nombre || !this.personal.apellidoPat || !this.personal.apellidoMat || 
      !this.personal.cargo || !this.personal.celular || !this.personal.direccion || !this.personal.dni ||
      !this.personal.email || !this.personal.genero || !this.personal.nacimiento ) {

      return;
    }
   // validacion de campos para que no sean incorrectos mediante FormControl
    if ( this.dniFormControl.invalid || this.nombresFormControl.invalid || this.apellidoPatFormControl.invalid 
      || this.apellidoMatFormControl.invalid || this.cargoFormControl.invalid || this.celularFormControl.invalid
      || this.direccionFormControl.invalid || this.dniFormControl.invalid || this.emailFormControl.invalid
      || this.generoFormControl.invalid || this.fechaNacimientoFormControl.invalid ) {
      return;
    }

    this.personalservice.actualizarPersonal(this.personal, this.personal_id, +this.idEmpresa)
    .subscribe(
      (response) => {
        console.log(response);
        if ( response.status && response.statusCode == 200 && response.message != "" )
          Swal.fire(
            'Enhorabuena!',
            'El personal ha sido actualizado.',
            'success'
            );
          this.router.navigate(['/personal/listado']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  guardarPersonal(){

    let selectedDate = this.datePipe.transform(this.nacimiento, 'yyyy/MM/dd');
    this.personal.nacimiento=selectedDate;

    // validacion de campos para que no sean vacios
    if ( !this.personal.nombre || !this.personal.apellidoPat || !this.personal.apellidoMat || 
      !this.personal.cargo || !this.personal.celular || !this.personal.direccion || !this.personal.dni ||
      !this.personal.email || !this.personal.genero || !this.personal.nacimiento ) {

      return;
    }
   // validacion de campos para que no sean incorrectos mediante FormControl
    if ( this.dniFormControl.invalid || this.nombresFormControl.invalid || this.apellidoPatFormControl.invalid 
      || this.apellidoMatFormControl.invalid || this.cargoFormControl.invalid || this.celularFormControl.invalid
      || this.direccionFormControl.invalid || this.dniFormControl.invalid || this.emailFormControl.invalid
      || this.generoFormControl.invalid || this.fechaNacimientoFormControl.invalid ) {
      return;
    }
  //modal para que muestre el mensaje para confirmación de guardado del personal mientras se hace el servicio
      Swal.fire({
      title: 'Aviso',
      text: "¿Estás seguro que deseas guardar el personal?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, guardar!' ,

      }).then((result) => {
      // llamado sel servicio guardarPersonal desde personal.service.ts y se le pasa 2 parametros
      if (result.value) {
        this.personalservice.guardarPersonal(this.personal, +this.idEmpresa)
        .subscribe(
          (response) => {
            console.log(response);
            if ( response.status && response.statusCode == 200 && response.message != "" )
              Swal.fire(
                'Enhorabuena!',
                'El personal ha sido guardado.',
                'success'
                );
              this.router.navigate(['/personal/listado']);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  regresar(){
    this.router.navigate(['/personal/listado']);
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
