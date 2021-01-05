import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { LandingService } from './servicios/landing.service';
import { LandingRoutingModule, LANDING_COMPONENTS } from './landing-routing.module';
import { Login2Component } from './dialogos/login2/login2.component';
import { ContactUsComponent } from './dialogos/contact-us/contact-us.component';



// se declara la constante componentes , shared module para el material , el servicio y el formsmodule para el formulario
@NgModule({
    declarations: [
        LANDING_COMPONENTS,
        Login2Component,
        ContactUsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        LandingRoutingModule
    ],
    providers: [
        LandingService
    ]
  })

  // se hace un module propio del modulo que vamos a trabajar y se exportara en el app.module.ts de la raiz
  export class LandingModule {}
