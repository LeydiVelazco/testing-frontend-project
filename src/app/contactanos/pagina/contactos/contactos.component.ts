import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PacienteService } from 'src/app/paciente/servicios/paciente.service';
import Swal from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';
import { ContactanosModel } from '../../modelos/contactanos-info.model';
import { ContactanosService } from '../../servicios/contactos.service';
import { LinkModel } from '../../modelos/enviar-correo-link/enviar-link-info.model';

@Component({
  selector: 'app-contactos', 
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit {
  idEmpresa: string = "";
  correo: ContactanosModel = new ContactanosModel();
  contacto: LinkModel = new LinkModel();
  solicitudSeleccionado:ContactanosModel = null;
  asuntoFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(70)
    ]);

    
  mensajeFormControl = new FormControl('', [
    //Validators.required,
    Validators.maxLength(3000)
    ]);
  

  dataSourceTwo: MatTableDataSource<ContactanosModel>;
  displayedColumnsTwo: string[] = [
    'email',
		'mensaje',
    'fecha_contacto',
    'estado',
    'credenciales'
    ];

  @ViewChild('TableTwoPaginator', {static: true}) tableTwoPaginator: MatPaginator;
  @ViewChild('TableTwoSort', {static: true}) tableTwoSort: MatSort; 
 
  constructor(private pacienteservice:PacienteService, private contactanosservice:ContactanosService) {
    this.dataSourceTwo = new MatTableDataSource;    
   }

  ngOnInit(): void {
    this.idEmpresa = localStorage.getItem("idEmpresa");
    this.listarSolicitud();
    this.dataSourceTwo.paginator = this.tableTwoPaginator;
	  this.dataSourceTwo.sort = this.tableTwoSort;
  }

  seleccionarFilaSolicitud(solicitud:ContactanosModel):void{
    this.solicitudSeleccionado= solicitud;
    this.contacto.correoClient = solicitud.email;
    //console.log(this.contacto.correoClient)
  }

  enviarCredenciales(email:String){
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';
    let password: String = '';
    for (let i = 0; i < 11 ; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    console.log('Correo: '+ email + '// Contraseña: '+ password );

    Swal.fire({
      title: 'Aviso',
      text: "Estas seguro que desea enviar las credenciales al usuario de correo " + 
      this.solicitudSeleccionado.email + '?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, enviar!' ,
  
      }).then((result) => {
      if (result.value) {
        this.contactanosservice.enviarCredenciales(email , password )
        .subscribe(
          (response) => {
            console.log(response);
            if ( response.status && response.message != "" )	{
              // muestra el model success si el response es correcto
              Swal.fire(
                'Enhorabuena!',
                'Las credenciales han sido enviadas al usuario.',
                'success'
                );
              this.listarSolicitud();
              this.solicitudSeleccionado = null;
             }
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  listarSolicitud()
  {
    this.contactanosservice.listarSolicitudes()
		.subscribe(
			(response) => {
				console.log(response);
				if ( response.status &&  response.message != ""){
              //const solicitudes = response.listaContactos;
              let data = [];
              for (let index = 0; index < response.listaContactos.length; index++) {
                data.push({email:response.listaContactos[index].email, mensaje:response.listaContactos[index].mensaje, 
                  fecha_contacto: response.listaContactos[index].fecha_contacto.substring(0, 10)+ 
                  ' ' + response.listaContactos[index].fecha_contacto.substring(11, 19), estado: response.listaContactos[index].estado })              
              }            
              this.dataSourceTwo.data = data.reverse();
              console.log(this.dataSourceTwo.data)
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
      text: "Estas seguro que desea enviar una reunion con el usuario de correo " + 
      this.solicitudSeleccionado.email + '?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, enviar!' ,
  
      }).then((result) => {
      if (result.value) {
        this.contactanosservice.enviarReunion(this.contacto)
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
              this.contacto.correoClient="";
              this.contacto.linkReunion="";  
              this.solicitudSeleccionado = null;
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