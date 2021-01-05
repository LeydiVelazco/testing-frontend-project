import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LandingService } from '../../servicios/landing.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  //@Input() email:string = "";
  @Input() correoClient: string = "";
  mensaje: string = "";

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  mensajeFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private landingservice: LandingService) { }

  ngOnInit(): void {
  }

  contactanos(){

    if( !this.correoClient || !this.mensaje ){
			return;
		}

		if( this.emailFormControl.invalid || this.mensajeFormControl.invalid ){
			return;
    }
    
    this.landingservice.contactanos(this.correoClient, this.mensaje)
		.subscribe(
			(response) => {
				console.log(response);
				if ( response.status == 200 && response.message != ""){
          Swal.fire(
            'Enhorabuena!',
            'El correo ha sido enviado. Nuestros agentes se pondrán en comunicacion contigo en la brevedad.',
            'success'
            );     
        }

        if ( response.status == false ){
          Swal.fire(
            'Información!',
            'Usted ya envió una solicitud de contacto.Espere a que nuestros agentes se comuniquen con usted',
            'info'
            );
          this.correoClient = "";     
        }
        
			},
			(err) => {
        console.log(err);
			}
    );
    this.correoClient = "";     
    this.mensaje = "";  
  } 

}
