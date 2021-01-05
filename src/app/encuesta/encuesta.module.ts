import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { EncuestaRoutingModule, ENCUESTA_COMPONENTS } from './encuesta-routing.module';
import { EncuestaService } from './servicios/encuesta.service';
import { EstadisticasComponent } from './pagina/estadisticas/estadisticas.component';



// se declara la constante componentes , shared module para el material , el servicio y el formsmodule para el formulario
@NgModule({
    declarations: [
        ENCUESTA_COMPONENTS,
        EstadisticasComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        EncuestaRoutingModule
    ],
    providers: [
        EncuestaService
    ]
  })

  // se hace un module propio del modulo que vamos a trabajar y se exportara en el app.module.ts de la raiz
  export class EncuestaModule {}
