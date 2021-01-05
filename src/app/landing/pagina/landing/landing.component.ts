import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import Swiper, { SwiperOptions } from 'swiper';
import { ContactUsComponent } from '../../dialogos/contact-us/contact-us.component';
import { Login2Component } from '../../dialogos/login2/login2.component';
import { LandingService } from '../../servicios/landing.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  correo: string = "";
  correoClient: string = "";
  mensaje: string = "";
  panelOpenState = false;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  mensajeFormControl = new FormControl('', [
    Validators.required
  ]);
  
  constructor(private landingservice: LandingService, private dialog:MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    var swiper = new Swiper('.swiper-container', {
      effect: 'flip',
      grabCursor: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    }); 
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
            'Usted ya envió una solicitud de contacto. Espere a que nuestros agentes se comuniquen con usted',
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

  login(){
    this.dialog.open(Login2Component, { disableClose: true, autoFocus:false, width: '800px',panelClass: 'custom-dialog-container' });
  }

  comprobarCorreo(){
    //this.dialog.open(ContactUsComponent, { disableClose: true, autoFocus:false, width: '800px',panelClass: 'custom-dialog-container' });
    this.landingservice.comprobarCorreo(this.correo)
		.subscribe(
			(response) => {
        console.log(response);
				if ( response.status && response.statusCode == 200){       
            if (response.existe == 0) {
              let dialogRef = this.dialog.open(ContactUsComponent,{ disableClose: true, autoFocus:false, width: '800px',panelClass: 'custom-dialog-container' });
              let instance = dialogRef.componentInstance;
              instance.correoClient=this.correo;
              this.correo = "";
              this.snackBar.open("Al parecer eres un nuevo usuario!","", {
                duration: 3000,
              });
            } else {
              let dialogRef = this.dialog.open(Login2Component,{ disableClose: true, autoFocus:false, width: '800px',panelClass: 'custom-dialog-container' });
              let instance = dialogRef.componentInstance;
              instance.correoClient=this.correo;
              this.correo = "";
            }
				}
			},
			(err) => {
        console.log(err);
			}
		);
  }

}
