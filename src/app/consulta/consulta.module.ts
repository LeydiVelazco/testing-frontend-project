import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CONSULTA_COMPONENTS, ConsultaRoutingModule } from './consulta-routing.module';
import { ConsultaService } from './servicios/consulta.service';
import { VerHistorialComponent } from './dialogos/ver-historial/ver-historial.component';

// se declara la constante componentes , shared module para el material , el servicio y el formsmodule para el formulario
@NgModule({
    declarations: [
        CONSULTA_COMPONENTS,
        VerHistorialComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ConsultaRoutingModule
    ],
    providers: [ 
        ConsultaService
    ],
    entryComponents:[
        VerHistorialComponent
    ]
  })
  // se hace un module propio del modulo que vamos a trabajar y se exportara en el app.module.ts de la raiz
  export class ConsultaModule {}