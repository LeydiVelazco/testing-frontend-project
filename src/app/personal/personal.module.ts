import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PERSONAL_COMPONENTS, PersonalRoutingModule } from './personal-routing.module';
import { PersonalService } from './servicios/personal.service';

// se declara la constante componentes , shared module para el material , el servicio y el formsmodule para el formulario
@NgModule({
    declarations: [
        PERSONAL_COMPONENTS
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        PersonalRoutingModule
    ],
    providers: [ 
        PersonalService
    ]
  })
  // se hace un module propio del modulo que vamos a trabajar y se exportara en el app.module.ts de la raiz
  export class PersonalModule {}