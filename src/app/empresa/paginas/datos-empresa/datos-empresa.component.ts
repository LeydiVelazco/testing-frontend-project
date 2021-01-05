import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from '../../servicios/empresa.service';
import { EmpresaModel } from '../../modelos/empresa-info.model';
import { AdminModel } from '../../modelos/modelo admin/admin-info.model';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-datos-empresa',
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.scss']
})
export class DatosEmpresaComponent implements OnInit {
  admin: boolean = true;
  empresa: boolean = false;
  emp: EmpresaModel = new EmpresaModel();
  ad: AdminModel = new AdminModel ();
  idMaestro: number ;
  name: String;
  actualizarButton: boolean = false;
  guardarButton: boolean = true;
  empresa_id: number = 0;
  citasAlDia: number ;

  //validaciones de los campos del formulario
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

  celularFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(9)
  ]);

  rucFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10)
  ]);

  acronimoFormControl = new FormControl('', [
    Validators.required
  ]);

  nomempresaFormControl = new FormControl('', [
    Validators.required
  ]);

  rubroFormControl = new FormControl('', [
    Validators.required
  ]);

  direccionFormControl = new FormControl('', [
    Validators.required
  ]);

  distritoFormControl = new FormControl('', [
    Validators.required
  ]);

  provinciaFormControl = new FormControl('', [
    Validators.required
  ]);

  departamentoFormControl = new FormControl('', [
    Validators.required
  ]);

  telefonoempresaFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(9)
  ]);

  emailempresaFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  citasAlDiaFormControl = new FormControl('', [
    Validators.required
  ]);


  constructor(private router:Router, private empresaservice: EmpresaService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.idMaestro = +localStorage.getItem("idMaestro");
    this.name = localStorage.getItem("name");
    this.empresa_id = +this.route.snapshot.paramMap.get('empresa_id');
    if ( this.empresa_id > 0) {
      this.admin = false;
      this.empresa = true;
      this.cargarDatosEmpresa(this.empresa_id );
      this.actualizarButton = true;
		  this.guardarButton = false;
    }
  }


  cargarDatosEmpresa( idEmpresa){
    this.empresaservice.cargarEmpresa(idEmpresa)
    .subscribe(
      (response) => {
        console.log(response);
        if ( response.status && response.statusCode == 200 && response.message != "" ){
          console.log('Empresa encontrada');
          this.emp = response.empresa;
          this.emp.email = response.empresa.emailEmpresa;
          this.citasAlDia = +this.emp.citasAlDia;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }


  guardarAdmin(){
    console.log(this.ad);

    if ( !this.ad.nombre || !this.ad.apellidoPat || !this.ad.apellidoMat || !this.ad.celular || !this.ad.dni  ) {
      return;
    }

    if ( this.dniFormControl.invalid || this.nombresFormControl.invalid || this.apellidoPatFormControl.invalid
      || this.apellidoMatFormControl.invalid  || this.celularFormControl.invalid ) {
      return;
    }
    let timerInterval;
    Swal.fire({
      title: 'Guardando...',
      text: "Espere un momento porfavor",
      icon: 'info',
      timer: 3000,
      allowOutsideClick: false,
      timerProgressBar: true,
      onBeforeOpen: () => {
      Swal.showLoading()
      },
      onClose: () => {
          clearInterval(timerInterval);
      }
      }).then((result) => {

          this.empresaservice.guardarAdmin(this.ad , this.idMaestro)
          .subscribe(
            (response) => {
              console.log(response);
              if ( response.status && response.statusCode == 200 && response.message != "" )	{
                Swal.fire(
                  'Enhorabuena!',
                  'Los datos del administrador han sido guardados.',
                  'success'
                  );
                this.admin = false;
                this.empresa = true;
              }
            },
            (err) => {
              Swal.fire(
                'Oops!',
                'Ha ocurrido un error.',
                'error'
              );
            }
          );
      });
  }

  back(){
    this.admin = true;
    this.empresa = false;
  }

  actualizarEmpresa(){
    
    // validacion de campos para que no sean vacios
    if( !this.emp.ruc || !this.emp.acronimo || !this.emp.nombreEmpresa || !this.emp.rubro || !this.emp.direccion || !this.emp.distrito ||
    !this.emp.provincia || !this.emp.departamento || !this.emp.telefono || !this.emp.email){
      return;
    }

    // validacion de campos para que no sean incorrectos mediante FormControl
    if( this.rucFormControl.invalid || this.acronimoFormControl.invalid || this.nomempresaFormControl.invalid || this.rubroFormControl.invalid ||
      this.direccionFormControl.invalid || this.distritoFormControl.invalid || this.provinciaFormControl.invalid || this.departamentoFormControl.invalid ||
      this.telefonoempresaFormControl.invalid ||this.emailempresaFormControl.invalid ){
      return;
    }
    this.emp.citasAlDia = this.citasAlDia.toString();
    console.log(this.emp);
    this.empresaservice.actualizarEmpresa(this.emp , this.empresa_id )
    .subscribe(
      (response) => {
        console.log(response);
        if ( response.status && response.statusCode == 200 && response.message != "" )	{
          // muestra el model success si el response es correcto
          Swal.fire(
            'Enhorabuena!',
            'Los datos de la empresa han sido actualizados.',
            'success'
            );
            localStorage.setItem("usuario", this.name.toString() );
            console.log(response.idEmpresa);
            setTimeout(() => {
              this.router.navigate(['/principal']);
            }, 2000);
        }
      },
      (err) => {
        Swal.fire(
          'Oops!',
          'Ha ocurrido un error.',
          'error'
        );
      }
    );
  
  }

  
  guardarEmpresa(){
    console.log(this.emp);
    // validacion de campos para que no sean vacios
    if( !this.emp.ruc || !this.emp.acronimo || !this.emp.nombreEmpresa || !this.emp.rubro || !this.emp.direccion || !this.emp.distrito ||
    !this.emp.provincia || !this.emp.departamento || !this.emp.telefono || !this.emp.email){
      return;
    }

    // validacion de campos para que no sean incorrectos mediante FormControl
    if( this.rucFormControl.invalid || this.acronimoFormControl.invalid || this.nomempresaFormControl.invalid || this.rubroFormControl.invalid ||
      this.direccionFormControl.invalid || this.distritoFormControl.invalid || this.provinciaFormControl.invalid || this.departamentoFormControl.invalid ||
      this.telefonoempresaFormControl.invalid ||this.emailempresaFormControl.invalid ){
      return;
    }
    this.emp.citasAlDia = this.citasAlDia.toString();
    let timerInterval;
    //modal para que muestre el mensaje de Guardando mientras se hace el servicio
    Swal.fire({
      title: 'Guardando...',
      text: "Espere un momento porfavor",
      icon: 'info',
      timer: 3000,
      allowOutsideClick: false,
      timerProgressBar: true,
      onBeforeOpen: () => {
      Swal.showLoading()
      },
      onClose: () => {
          clearInterval(timerInterval);
      }
      }).then((result) => {
          // llamado sel servicio guardarempresa desde empresa.service.ts y se le pasa 2 parametros
          this.empresaservice.guardarEmpresa(this.emp , this.idMaestro)
          .subscribe(
            (response) => {
              console.log(response);
              if ( response.status && response.statusCode == 200 && response.message != "" )	{
                // muestra el model success si el response es correcto
                Swal.fire(
                  'Enhorabuena!',
                  'Los datos de la empresa han sido guardados.',
                  'success'
                  );
                  localStorage.setItem("usuario", this.ad.nombre );
                  console.log(response.idEmpresa);
                  setTimeout(() => {
                    this.router.navigate(['/principal']);
                  }, 2000);
              }
            },
            (err) => {
              Swal.fire(
                'Oops!',
                'Ha ocurrido un error.',
                'error'
              );
            }
          );
      })
  }

  // funcion para validar solo el ingreso de números por teclado
  keypressNumbers(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
    }


  // funcion para validar solo el ingreso de letras por teclado
  keypressLetters(event: any) {
    const pattern = /[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
    }
}
