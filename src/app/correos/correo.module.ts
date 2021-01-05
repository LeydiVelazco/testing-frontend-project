import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { CorreoRoutingModule, CORREO_COMPONENTS } from './correo-rounting.module';
import { CorreoService } from './servicios/correo.service';



// se declara la constante componentes , shared module para el material , el servicio y el formsmodule para el formulario
@NgModule({
    declarations: [
        CORREO_COMPONENTS
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        CorreoRoutingModule
    ],
    providers: [
        CorreoService
    ]
  })

  // se hace un module propio del modulo que vamos a trabajar y se exportara en el app.module.ts de la raiz
  export class CorreoModule {}
