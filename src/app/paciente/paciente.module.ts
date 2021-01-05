import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PACIENTE_COMPONENTS, PacienteRoutingModule } from './paciente-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PacienteService } from './servicios/paciente.service';


// se declara la constante componentes , shared module para el material , el servicio y el formsmodule para el formulario
@NgModule({
    declarations: [
        PACIENTE_COMPONENTS
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        PacienteRoutingModule
    ],
    providers: [
        PacienteService
    ]
  })
// se hace un module propio del modulo que vamos a trabajar y se exportara en el app.module.ts de la raiz
  export class PacienteModule {}
