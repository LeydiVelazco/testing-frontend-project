import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EmpresaRoutingModule, EMPRESA_COMPONENTS } from './empresa-routing.module';
import { EmpresaService } from './servicios/empresa.service';
import { CommonModule } from '@angular/common';



// se declara la constante componentes , shared module para el material , el servicio y el formsmodule para el formulario
@NgModule({
    declarations: [
        EMPRESA_COMPONENTS
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        EmpresaRoutingModule
    ],
    providers: [
        EmpresaService
    ]
  })

  // se hace un module propio del modulo que vamos a trabajar y se exportara en el app.module.ts de la raiz
  export class EmpresaModule {}
